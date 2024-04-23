import { Anchor } from './anchor';
import { Collection } from './collection';
import { Color, is_color_provider, serialize_color } from './effects/ColorProvider';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { IBoard } from './IBoard';
import { decompose_2d_3x3_matrix } from './math/decompose_2d_3x3_matrix';
import { G20 } from './math/G20.js';
import { Disposable } from './reactive/Disposable';
import { variable } from './reactive/variable';
import { get_svg_element_defs, set_defs_dirty_flag, svg, SVGAttributes, transform_value_of_matrix } from './renderers/SVGView';
import { PositionLike, Shape } from './Shape';
import { getComponentOnCubicBezier, getCurveBoundingBox, getCurveFromPoints } from './utils/curves';
import { lerp, mod } from './utils/math';
import { Commands } from './utils/path-commands';
import { contains, getCurveLength, getIdByLength, getSubdivisions } from './utils/shape';

export function get_dashes_offset(dashes: number[]): number | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (dashes as any)['offset'];
}

export function set_dashes_offset(dashes: number[], offset: number): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (dashes as any)['offset'] = offset;
}

const min = Math.min;
const max = Math.max;

const vector = new G20();

export interface PathAttributes {
    attitude: G20;
    id: string,
    opacity: number;
    position: PositionLike;
    visibility: 'visible' | 'hidden' | 'collapse';
    /**
     * The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    fill: Color;
    fillOpacity: number;
    /**
     * The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    stroke: Color;
    strokeWidth: number;
    strokeOpacity: number;
}

export class Path extends Shape implements PathAttributes {

    #length = 0;

    readonly #lengths: number[] = [];

    readonly #fill = variable('none' as Color);
    #fill_change: Disposable | null = null;
    readonly #fillOpacity = variable(1.0);

    readonly #stroke = variable('#000000' as Color);
    #stroke_change: Disposable | null = null;
    readonly #strokeWidth = variable(1);
    readonly #strokeOpacity = variable(1.0);

    #vectorEffect: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position' = 'non-scaling-stroke';

    /**
     * stroke-linecap
     */
    readonly #cap = variable('round' as 'butt' | 'round' | 'square');

    /**
     * stroke-linejoin
     */
    readonly #join = variable('round' as 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round');

    /**
     * stroke-miterlimit
     */
    readonly #miter = variable(4);

    #closed = true;
    #curved = false;
    #automatic = true;
    #beginning = 0.0;
    #ending = 1.0;

    #dashes: number[] = null;

    /**
     * The hidden variable behind the `vertices` property.
     */
    #vertices: Collection<Anchor>;
    // TODO; These could be unified into e.g. vertices_disposables.
    #vertices_insert: Disposable | null = null;
    #vertices_remove: Disposable | null = null;
    /**
     * [Q] What exactly is this?
     * [A] It appears to be a working storage between the model vertices here and those that are used to compute the SVG path `d` attribute.
     */
    readonly #anchors: Anchor[] = [];

    readonly #anchor_change_map = new Map<Anchor, Disposable>();

    /**
     * @param vertices A list of {@link Anchor}s that represent the order and coordinates to construct the rendered shape.
     * @param closed Describes whether the path is closed or open.
     * @param curved Describes whether the path automatically calculates bezier handles for each vertex.
     * @param manual Describes whether the developer controls how vertices are plotted.
     */
    constructor(board: IBoard, vertices: Anchor[] = [], closed?: boolean, curved?: boolean, manual?: boolean, attributes: Partial<PathAttributes> = {}) {

        super(board, attributes);

        this.zzz.fill$ = this.#fill.asObservable();
        this.zzz.fillOpacity$ = this.#fillOpacity.asObservable();
        this.zzz.stroke$ = this.#stroke.asObservable();
        this.zzz.strokeOpacity$ = this.#strokeOpacity.asObservable();
        this.zzz.strokeWidth$ = this.#strokeWidth.asObservable();

        this.flagReset(true);
        this.zzz.flags[Flag.ClipPath] = false;
        this.zzz.flags[Flag.ClipFlag] = false;

        this.zzz.vertices = [];
        this.zzz.vertices_subject = variable(0);
        this.zzz.vertices$ = this.zzz.vertices_subject.asObservable();

        /**
         * Determines whether a final line is drawn between the final point in the `vertices` array and the first point.
         */
        this.closed = !!closed;

        /**
         * When the path is `automatic = true` this boolean determines whether the lines between the points are curved or not.
         */
        this.curved = !!curved;

        /**
         * Number between zero and one to state the beginning of where the path is rendered.
         * A percentage value that represents at what percentage into the path should the renderer start drawing.
         */
        this.beginning = 0;

        /**
         * Number between zero and one to state the ending of where the path is rendered.
         */
        this.ending = 1;

        // Style properties

        if (attributes.fill) {
            this.fill = attributes.fill;
        }
        else {
            this.fill = '#fff';
        }

        if (typeof attributes.fillOpacity === 'number') {
            this.fillOpacity = attributes.fillOpacity;
        }
        else {
            this.fillOpacity = 1.0;
        }

        if (attributes.stroke) {
            this.stroke = attributes.stroke;
        }
        else {
            this.stroke = '#000';
        }

        if (typeof attributes.strokeWidth === 'number') {
            this.strokeWidth = attributes.strokeWidth;
        }
        else {
            this.strokeWidth = 1;
        }

        if (typeof attributes.strokeOpacity === 'number') {
            this.strokeOpacity = attributes.strokeOpacity;
        }
        else {
            this.strokeOpacity = 1.0;
        }


        /**
         * A class to be applied to the element to be compatible with CSS styling.
         */
        this.className = '';

        /**
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty}
         */
        this.cap = 'butt';      // Default of Adobe Illustrator

        /**
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeLinejoinProperty}
         */
        this.join = 'miter';    // Default of Adobe Illustrator

        /**
         * @see {@link https://www.w3.org/TR/SVG11/painting.html#StrokeMiterlimitProperty}
         */
        this.miter = 4;         // Default of Adobe Illustrator

        this.vertices = new Collection(vertices);

        this.automatic = !manual;

        /**
         * Array of numbers. Odd indices represent dash length. Even indices represent dash space.
         * A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
         */
        this.dashes = [];

        set_dashes_offset(this.dashes, 0);
    }

    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void {

        this.update();

        // Collect any attribute that needs to be changed here
        const changed: SVGAttributes = {};

        const flagMatrix = this.matrix.manual || this.zzz.flags[Flag.Matrix];

        if (flagMatrix) {
            changed.transform = transform_value_of_matrix(this.matrix);
        }

        if (this.fill && is_color_provider(this.fill)) {
            this.zzz.hasFillEffect = true;
            this.fill.render(svgElement);
        }

        if (this.zzz.flags[Flag.Fill]) {
            if (this.fill) {
                changed.fill = serialize_color(this.fill);
            }
            if (this.zzz.hasFillEffect && typeof this.fill === 'string') {
                set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                delete this.zzz.hasFillEffect;
            }
        }

        if (this.stroke && is_color_provider(this.stroke)) {
            this.zzz.hasStrokeEffect = true;
            this.stroke.render(svgElement);
        }

        if (this.zzz.flags[Flag.Stroke]) {
            if (this.stroke) {
                changed.stroke = serialize_color(this.stroke);
            }
            if (this.zzz.hasStrokeEffect && typeof this.stroke === 'string') {
                set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                delete this.zzz.hasStrokeEffect;
            }
        }

        if (this.zzz.flags[Flag.Linewidth]) {
            changed['stroke-width'] = `${this.strokeWidth}`;
        }

        if (this.zzz.flags[Flag.ClassName]) {
            changed['class'] = this.classList.join(' ');
        }

        if (this.zzz.flags[Flag.VectorEffect]) {
            changed['vector-effect'] = this.vectorEffect;
        }

        if (this.zzz.flags[Flag.Cap]) {
            changed['stroke-linecap'] = this.cap;
        }

        if (this.zzz.flags[Flag.Join]) {
            changed['stroke-linejoin'] = this.join;
        }

        if (this.zzz.flags[Flag.Miter]) {
            changed['stroke-miterlimit'] = `${this.miter}`;
        }

        if (this.dashes && this.dashes.length > 0) {
            changed['stroke-dasharray'] = this.dashes.join(' ');
            changed['stroke-dashoffset'] = `${get_dashes_offset(this.dashes) || 0}`;
        }

        if (this.zzz.elem) {
            // When completely reactive, this will not be needed
            svg.setAttributes(this.zzz.elem, changed);
        }
        else {
            changed.id = this.id;
            this.zzz.elem = svg.createElement('path', changed);
            domElement.appendChild(this.zzz.elem);

            // The matrix is in the Shape.
            this.zzz.disposables.push(this.matrix.change$.subscribe((matrix) => {
                const change: SVGAttributes = {};
                change.transform = transform_value_of_matrix(matrix);
                svg.setAttributes(this.zzz.elem, change);
            }));

            this.zzz.disposables.push(this.zzz.vertices$.subscribe(() => {
                const change: SVGAttributes = {};
                change.d = svg.path_from_anchors(this.board, this.position, this.attitude, this.zzz.vertices, this.closed);
                svg.setAttributes(this.zzz.elem, change);
            }));

            // fill
            this.zzz.disposables.push(this.zzz.fill$.subscribe((fill) => {
                const change: SVGAttributes = {};
                change.fill = serialize_color(fill);
                svg.setAttributes(this.zzz.elem, change);

                if (this.zzz.hasFillEffect && typeof fill === 'string') {
                    set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                    delete this.zzz.hasFillEffect;
                }

                return function () {
                    // No cleanup to be done.
                };
            }));

            // fillOpacity
            this.zzz.disposables.push(this.zzz.fillOpacity$.subscribe((fillOpacity) => {
                const change: SVGAttributes = {};
                change['fill-opacity'] = `${fillOpacity}`;
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // opacity
            this.zzz.disposables.push(this.zzz.opacity$.subscribe((opacity) => {
                const change: SVGAttributes = { opacity: `${opacity}` };
                if (opacity === 1) {
                    svg.removeAttributes(this.zzz.elem, change);
                }
                else {
                    svg.setAttributes(this.zzz.elem, change);
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // stroke
            this.zzz.disposables.push(this.zzz.stroke$.subscribe((stroke) => {
                const change: SVGAttributes = {};
                change.stroke = serialize_color(stroke);
                svg.setAttributes(this.zzz.elem, change);

                if (this.zzz.hasStrokeEffect && typeof stroke === 'string') {
                    set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                    delete this.zzz.hasStrokeEffect;
                }

                return function () {
                    // No cleanup to be done.
                };
            }));

            // strokeOpacity
            this.zzz.disposables.push(this.zzz.strokeOpacity$.subscribe((strokeOpacity) => {
                const change: SVGAttributes = {};
                change['stroke-opacity'] = `${strokeOpacity}`;
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // strokeWidth
            this.zzz.disposables.push(this.zzz.strokeWidth$.subscribe((strokeWidth) => {
                const change: SVGAttributes = {};
                change['stroke-width'] = `${strokeWidth}`;
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // visibility
            this.zzz.disposables.push(this.zzz.visibility$.subscribe((visibility) => {
                switch (visibility) {
                    case 'visible': {
                        const change: SVGAttributes = { visibility };
                        svg.removeAttributes(this.zzz.elem, change);
                        break;
                    }
                    default: {
                        const change: SVGAttributes = { visibility };
                        svg.setAttributes(this.zzz.elem, change);
                        break;
                    }
                }
                return function () {
                    // No cleanup to be done.
                };
            }));
        }

        if (this.zzz.flags[Flag.ClipFlag]) {
            const clip = svg.getClip(this, svgElement);
            const elem = this.zzz.elem;

            if (this.zzz.clip) {
                elem.removeAttribute('id');
                clip.setAttribute('id', this.id);
                clip.appendChild(elem);
            }
            else {
                clip.removeAttribute('id');
                elem.setAttribute('id', this.id);
                if (this.parent && this.parent instanceof ElementBase) {
                    this.parent.zzz.elem.appendChild(elem); // TODO: should be insertBefore
                }
            }
        }

        // Commented two-way functionality of clips / masks with groups and
        // polygons. Uncomment when this bug is fixed:
        // https://code.google.com/p/chromium/issues/detail?id=370951

        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask
        if (this.zzz.flags[Flag.ClipPath]) {
            if (this.clipPath) {
                this.clipPath.render(domElement, svgElement);
                this.zzz.elem.setAttribute('clip-path', 'url(#' + this.clipPath.id + ')');
            }
            else {
                this.zzz.elem.removeAttribute('clip-path');
            }
        }

        this.flagReset();
    }

    /**
     * A convenience method for setting the `fill` attribute to "none".
     */
    noFill(): this {
        this.fill = 'none';
        return this;
    }

    /**
     * A convenience method for setting the `stroke` attribute to "none".
     */
    noStroke(): this {
        this.stroke = 'none';
        return this;
    }

    corner(): this {
        const bbox = this.getBoundingBox(true);
        const hw = (bbox.right - bbox.left) / 2;
        const hh = (bbox.bottom - bbox.top) / 2;
        const cx = (bbox.left + bbox.right) / 2;
        const cy = (bbox.top + bbox.bottom) / 2;

        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices.getAt(i);
            v.x -= cx;
            v.y -= cy;
            v.x += hw;
            v.y += hh;
        }

        if (this.clipPath) {
            this.clipPath.position.x -= cx;
            this.clipPath.position.x += hw;
            this.clipPath.position.y -= cy;
            this.clipPath.position.y += hh;
        }
        return this;
    }

    center(): this {
        const bbox = this.getBoundingBox(true);

        const cx = (bbox.left + bbox.right) / 2 - this.position.x;
        const cy = (bbox.top + bbox.bottom) / 2 - this.position.y;

        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices.getAt(i);
            v.x -= cx;
            v.y -= cy;
        }

        if (this.clipPath) {
            this.clipPath.position.x -= cx;
            this.clipPath.position.y -= cy;
        }

        return this;

    }

    getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number } {

        let left = Infinity;
        let right = -Infinity;
        let top = Infinity;
        let bottom = -Infinity;

        this.update();

        const M = shallow ? this.matrix : this.worldMatrix;

        let border = (this.strokeWidth || 0) / 2;
        const l = this.zzz.vertices.length;

        if (this.strokeWidth > 0 || (this.stroke && typeof this.stroke === 'string' && !(/(transparent|none)/i.test(this.stroke)))) {
            if (this.matrix.manual) {
                const { scaleX, scaleY } = decompose_2d_3x3_matrix(M);
                border = max(scaleX, scaleY) * (this.strokeWidth || 0) / 2;
            }
            else {
                border *= max(this.scaleXY.x, this.scaleXY.y);
            }
        }

        if (l <= 0) {
            return {};
        }

        for (let i = 0; i < l; i++) {

            const v1 = this.zzz.vertices[i];
            // If i = 0, then this "wraps around" to the last vertex. Otherwise, it's the previous vertex.
            // This is important for handling cyclic paths.
            const v0 = this.zzz.vertices[(i + l - 1) % l];

            const [v0x, v0y] = M.multiply_vector(v0.x, v0.y);
            const [v1x, v1y] = M.multiply_vector(v1.x, v1.y);

            if (v0.controls && v1.controls) {

                let rx = v0.controls.b.x;
                let ry = v0.controls.b.y;

                if (v0.relative) {
                    rx += v0.x;
                    ry += v0.y;
                }

                const [c0x, c0y] = M.multiply_vector(rx, ry);

                let lx = v1.controls.a.x;
                let ly = v1.controls.a.y;

                if (v1.relative) {
                    lx += v1.x;
                    ly += v1.y;
                }

                const [c1x, c1y] = M.multiply_vector(lx, ly);

                const bb = getCurveBoundingBox(
                    v0x, v0y,
                    c0x, c0y,
                    c1x, c1y,
                    v1x, v1y
                );

                top = min(bb.min.y - border, top);
                left = min(bb.min.x - border, left);
                right = max(bb.max.x + border, right);
                bottom = max(bb.max.y + border, bottom);
            }
            else {
                if (i <= 1) {
                    top = min(v0y - border, top);
                    left = min(v0x - border, left);
                    right = max(v0x + border, right);
                    bottom = max(v0y + border, bottom);
                }
                top = min(v1y - border, top);
                left = min(v1x - border, left);
                right = max(v1x + border, right);
                bottom = max(v1y + border, bottom);
            }
        }

        return { top, left, right, bottom, };
    }

    hasBoundingBox(): boolean {
        return true;
    }

    /**
     * TODO: Bad name. This function is called for its side effects which are to modify the Anchor.
     * Originally the function appears to promote a Vector and return an Anchor, but this is not used
     * and the call always involves an Anchor.
     * There is a return value but it is not being used.
     * @param t Percentage value describing where on the {@link Path} to estimate and assign coordinate values.
     * @param anchor - Object to apply calculated x, y to. If none available returns new `Object`.
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Path}'s curve.
     */
    getPointAt(t: number, anchor: Anchor): Anchor {
        /**
         * This line proves that the anchor argument is not re-assigned. 
         */
        const ank = anchor;

        /**
         * target is initialized to the distance along the total `length` determined by `t`.
         */
        let target = this.length * min(max(t, 0), 1);
        /**
         * The number of vertices.
         */
        const Nvs = this.vertices.length;
        const last = Nvs - 1;

        let a: Anchor | null = null;
        let b: Anchor | null = null;

        /**
         * The number of length segments.
         */
        const Nseg = this.#lengths.length;
        /**
         * Keeps track of the cumulative distance travelled over the segments.
         */
        let sum = 0;
        for (let i = 0; i < Nseg; i++) {
            // When the target point lies inside the current segment...
            if (sum + this.#lengths[i] >= target) {
                // Determine the anchors that enclose the target...
                let ia: number;
                let ib: number;
                if (this.closed) {
                    ia = mod(i, Nvs);
                    ib = mod(i - 1, Nvs);
                    if (i === 0) {
                        ia = ib;
                        ib = i;
                    }
                }
                else {
                    ia = i;
                    ib = min(max(i - 1, 0), last);
                }
                a = this.vertices.getAt(ia);
                b = this.vertices.getAt(ib);

                // We'll be breaking out of the loop and target will not be used anymore,
                // so we could introduce a new variable here. The goal seems to be to re-use t for some lerping
                // later on, so this new t value must somehow be better?
                target -= sum;
                if (this.#lengths[i] !== 0) {
                    t = target / this.#lengths[i];
                }
                else {
                    t = 0;
                }
                break;
            }
            sum += this.#lengths[i];
        }

        if (a === null || b === null) {
            return null;
        }

        if (!a) {
            return b;
        }
        else if (!b) {
            return a;
        }

        const bb = b.controls && b.controls.b;
        const aa = a.controls && a.controls.a;

        const x1 = b.x;
        const y1 = b.y;
        let x2 = (bb || b).x;
        let y2 = (bb || b).y;
        let x3 = (aa || a).x;
        let y3 = (aa || a).y;
        const x4 = a.x;
        const y4 = a.y;

        if (bb && b.relative) {
            x2 += b.x;
            y2 += b.y;
        }

        if (aa && a.relative) {
            x3 += a.x;
            y3 += a.y;
        }

        const x = getComponentOnCubicBezier(t, x1, x2, x3, x4);
        const y = getComponentOnCubicBezier(t, y1, y2, y3, y4);

        // Higher order points for control calculation.
        const t1x = lerp(x1, x2, t);
        const t1y = lerp(y1, y2, t);
        const t2x = lerp(x2, x3, t);
        const t2y = lerp(y2, y3, t);
        const t3x = lerp(x3, x4, t);
        const t3y = lerp(y3, y4, t);

        // Calculate the returned points control points.
        const brx = lerp(t1x, t2x, t);
        const bry = lerp(t1y, t2y, t);
        const alx = lerp(t2x, t3x, t);
        const aly = lerp(t2y, t3y, t);

        ank.x = x;
        ank.y = y;

        ank.controls.a.x = brx;
        ank.controls.a.y = bry;
        ank.controls.b.x = alx;
        ank.controls.b.y = aly;

        if (!(typeof ank.relative === 'boolean') || ank.relative) {
            ank.controls.a.x -= x;
            ank.controls.a.y -= y;
            ank.controls.b.x -= x;
            ank.controls.b.y -= y;
        }

        ank.t = t;

        return ank;
    }

    /**
     * Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     */
    plot(): this {
        if (this.curved) {
            getCurveFromPoints(this.#vertices, this.closed);
            return this;
        }
        for (let i = 0; i < this.#vertices.length; i++) {
            this.#vertices.getAt(i).command = (i === 0) ? Commands.move : Commands.line;
        }
        return this;
    }

    /**
     * Insert an anchor at the midpoint between every vertex.
     * @param limit - How many times to recurse subdivisions.
     */
    subdivide(limit: number): this {
        // TODO: DRYness (function below)
        this.update();

        const last = this.vertices.length - 1;
        const closed = this.closed || this.vertices.getAt(last).command === Commands.close;
        let b = this.vertices.getAt(last);
        let points: Anchor[] = [], verts;

        this.vertices.forEach((a, i) => {

            if (i <= 0 && !closed) {
                b = a;
                return;
            }

            if (a.command === Commands.move) {
                points.push(new Anchor(G20.vector(b.x, b.y)));
                if (i > 0) {
                    points[points.length - 1].command = Commands.line;
                }
                b = a;
                return;
            }

            verts = getSubdivisions(a, b, limit);
            points = points.concat(verts);

            // Assign commands to all the verts
            verts.forEach(function (v, i) {
                if (i <= 0 && b.command === Commands.move) {
                    v.command = Commands.move;
                }
                else {
                    v.command = Commands.line;
                }
            });

            if (i >= last) {

                // TODO: Add check if the two vectors in question are the same values.
                if (this.closed && this.automatic) {

                    b = a;

                    verts = getSubdivisions(a, b, limit);
                    points = points.concat(verts);

                    // Assign commands to all the verts
                    verts.forEach(function (v, i) {
                        if (i <= 0 && b.command === Commands.move) {
                            v.command = Commands.move;
                        }
                        else {
                            v.command = Commands.line;
                        }
                    });

                }
                else if (closed) {
                    points.push(new Anchor(G20.vector(a.x, a.y)));
                }

                points[points.length - 1].command = closed
                    ? Commands.close : Commands.line;

            }

            b = a;
        });

        this.automatic = false;
        this.curved = false;
        this.vertices = new Collection(points);

        return this;
    }

    #updateLength(limit?: number, silent = false): this {
        // TODO: DRYness (function above)
        if (!silent) {
            this.update();
        }

        const length = this.vertices.length;
        const last = length - 1;
        const closed = false;//this.closed || this.vertices[last]._command === Commands.close;

        let b = this.vertices.getAt(last);
        let sum = 0;

        this.vertices.forEach((a: Anchor, i: number) => {

            if ((i <= 0 && !closed) || a.command === Commands.move) {
                b = a;
                this.#lengths[i] = 0;
                return;
            }

            this.#lengths[i] = getCurveLength(a, b, limit);
            sum += this.#lengths[i];

            if (i >= last && closed) {

                b = this.vertices.getAt((i + 1) % length);

                this.#lengths[i + 1] = getCurveLength(a, b, limit);
                sum += this.#lengths[i + 1];

            }

            b = a;
        });

        this.#length = sum;
        this.zzz.flags[Flag.Length] = false;

        return this;
    }

    override update(): this {
        if (this.zzz.flags[Flag.Vertices]) {

            if (this.automatic) {
                this.plot();
            }

            if (this.zzz.flags[Flag.Length]) {
                this.#updateLength(undefined, true);
            }

            const closed = this.closed;

            const beginning = min(this.beginning, this.ending);
            const ending = max(this.beginning, this.ending);

            const lBound = Math.ceil(getIdByLength(this, beginning * this.length));
            const uBound = Math.floor(getIdByLength(this, ending * this.length));

            {
                /**
                 * Assigned in the for loop, used after the for loop.
                 */
                let left: Anchor;
                /**
                 * Assigned in the for loop, used after the for loop.
                 */
                let next: Anchor;

                /**
                 * The source for the updates are the vertices maintained by derived classes that specialize Path.
                 */
                const vertices = this.vertices;
                this.zzz.vertices.length = 0;
                {
                    let right: Anchor;
                    let prev: Anchor;
                    const L = vertices.length;
                    for (let i = 0; i < L; i++) {

                        if (this.#anchors.length <= i) {
                            // Expected to be `relative` anchor points.
                            this.#anchors.push(new Anchor(G20.vector(0, 0)));
                        }

                        if (i > uBound && !right) {

                            const v = this.#anchors[i].copy(vertices.getAt(i));
                            this.getPointAt(ending, v);
                            v.command = this.#anchors[i].command;
                            this.zzz.vertices.push(v);

                            right = v;
                            prev = vertices.getAt(i - 1);

                            // Project control over the percentage `t`
                            // of the in-between point
                            if (prev && prev.controls) {

                                if (v.relative) {
                                    v.controls.b.clear();
                                }
                                else {
                                    v.controls.b.copyVector(v.origin);
                                }

                                if (prev.relative) {
                                    this.#anchors[i - 1].controls.b
                                        .copyVector(prev.controls.b)
                                        .lerp(G20.zero, 1 - v.t);
                                }
                                else {
                                    this.#anchors[i - 1].controls.b
                                        .copyVector(prev.controls.b)
                                        .lerp(prev.origin, 1 - v.t);
                                }
                            }
                        }
                        else if (i >= lBound && i <= uBound) {

                            const v = this.#anchors[i].copy(vertices.getAt(i));
                            this.zzz.vertices.push(v);

                            if (i === uBound && contains(this, ending)) {
                                right = v;
                                if (!closed && right.controls) {
                                    if (right.relative) {
                                        right.controls.b.clear();
                                    }
                                    else {
                                        right.controls.b.copyVector(right.origin);
                                    }
                                }
                            }
                            else if (i === lBound && contains(this, beginning)) {
                                left = v;
                                left.command = Commands.move;
                                if (!closed && left.controls) {
                                    if (left.relative) {
                                        left.controls.a.clear();
                                    }
                                    else {
                                        left.controls.a.copyVector(left.origin);
                                    }
                                }
                            }
                        }
                    }
                }

                // Prepend the trimmed point if necessary.
                if (lBound > 0 && !left) {

                    const i = lBound - 1;

                    const v = this.#anchors[i].copy(vertices.getAt(i));
                    this.getPointAt(beginning, v);
                    v.command = Commands.move;
                    this.zzz.vertices.unshift(v);

                    next = vertices.getAt(i + 1);

                    // Project control over the percentage `t`
                    // of the in-between point
                    if (next && next.controls) {

                        v.controls.a.clear();

                        if (next.relative) {
                            this.#anchors[i + 1].controls.a
                                .copyVector(next.controls.a)
                                .lerp(G20.zero, v.t);
                        }
                        else {
                            vector.copyVector(next.origin);
                            this.#anchors[i + 1].controls.a
                                .copyVector(next.controls.a)
                                .lerp(next.origin, v.t);
                        }
                    }
                }
            }
            this.zzz.vertices_subject.set(this.zzz.vertices_subject.get() + 1);
        }
        super.update();
        return this;
    }

    override flagReset(dirtyFlag = false): this {

        this.zzz.flags[Flag.Cap] = dirtyFlag;
        this.zzz.flags[Flag.ClipFlag] = dirtyFlag;
        this.zzz.flags[Flag.Fill] = dirtyFlag;
        this.zzz.flags[Flag.Join] = dirtyFlag;
        this.zzz.flags[Flag.Length] = dirtyFlag;
        this.zzz.flags[Flag.Linewidth] = dirtyFlag;
        this.zzz.flags[Flag.ClipPath] = dirtyFlag;
        this.zzz.flags[Flag.Miter] = dirtyFlag;
        this.zzz.flags[Flag.Stroke] = dirtyFlag;
        this.zzz.flags[Flag.VectorEffect] = dirtyFlag;
        this.zzz.flags[Flag.Vertices] = dirtyFlag;

        super.flagReset(dirtyFlag);

        return this;

    }
    get automatic(): boolean {
        return this.#automatic;
    }
    set automatic(automatic: boolean) {
        if (automatic === this.automatic) {
            return;
        }
        this.#automatic = !!automatic;
        this.vertices.forEach(function (v: Anchor) {
            if (automatic) {
                v.ignore();
            }
            else {
                v.listen();
            }
        });
    }
    get beginning(): number {
        return this.#beginning;
    }
    set beginning(beginning: number) {
        this.#beginning = beginning;
        this.zzz.flags[Flag.Vertices] = true;
    }
    /**
     * Defines the shape to be used at the end of open subpaths when they are stroked.
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
     */
    get cap(): 'butt' | 'round' | 'square' {
        return this.#cap.get();
    }
    set cap(cap: 'butt' | 'round' | 'square') {
        this.#cap.set(cap);
        this.zzz.flags[Flag.Cap] = true;
    }
    get closed(): boolean {
        return this.#closed;
    }
    set closed(closed: boolean) {
        this.#closed = !!closed;
        this.zzz.flags[Flag.Vertices] = true;
    }
    get curved(): boolean {
        return this.#curved;
    }
    set curved(curved: boolean) {
        this.#curved = !!curved;
        this.zzz.flags[Flag.Vertices] = true;
    }
    get dashes(): number[] {
        return this.#dashes;
    }
    set dashes(dashes: number[]) {
        if (typeof get_dashes_offset(dashes) !== 'number') {
            set_dashes_offset(dashes, (this.dashes && get_dashes_offset(this.dashes)) || 0);
        }
        this.#dashes = dashes;
    }
    get ending(): number {
        return this.#ending;
    }
    set ending(ending: number) {
        this.#ending = ending;
        this.zzz.flags[Flag.Vertices] = true;
    }
    get fill(): Color {
        return this.#fill.get();
    }
    set fill(fill: Color) {
        if (this.#fill_change) {
            this.#fill_change.dispose();
            this.#fill_change = null;
        }

        this.#fill.set(fill);
        this.zzz.flags[Flag.Fill] = true;

        if (is_color_provider(fill)) {
            this.#fill_change = fill.change$.subscribe(() => {
                this.zzz.flags[Flag.Fill] = true;
            });
        }
    }
    get fillOpacity(): number {
        return this.#fillOpacity.get();
    }
    set fillOpacity(fillOpacity: number) {
        this.#fillOpacity.set(fillOpacity);
    }
    get join(): 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round' {
        return this.#join.get();
    }
    set join(join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round') {
        this.#join.set(join);
        this.zzz.flags[Flag.Join] = true;
    }
    get length(): number {
        if (this.zzz.flags[Flag.Length]) {
            this.#updateLength();
        }
        return this.#length;
    }
    get lengths(): number[] {
        return this.#lengths;
    }
    get strokeWidth(): number {
        return this.#strokeWidth.get();
    }
    set strokeWidth(stroeWidth: number) {
        if (typeof stroeWidth === 'number') {
            if (this.strokeWidth !== stroeWidth) {
                this.#strokeWidth.set(stroeWidth);
                this.zzz.flags[Flag.Linewidth] = true;
            }
        }
    }
    get miter(): number {
        return this.#miter.get();
    }
    set miter(miter: number) {
        this.#miter.set(miter);
        this.zzz.flags[Flag.Miter] = true;
    }
    get stroke(): Color {
        return this.#stroke.get();
    }
    set stroke(stroke: Color) {
        if (this.#stroke_change) {
            this.#stroke_change.dispose();
            this.#stroke_change = null;
        }

        this.#stroke.set(stroke);
        this.zzz.flags[Flag.Stroke] = true;

        if (is_color_provider(stroke)) {
            this.#stroke_change = stroke.change$.subscribe(() => {
                this.zzz.flags[Flag.Stroke] = true;
            });
        }
    }
    get strokeOpacity(): number {
        return this.#strokeOpacity.get();
    }
    set strokeOpacity(strokeOpacity: number) {
        this.#strokeOpacity.set(strokeOpacity);
    }
    get vertices(): Collection<Anchor> {
        return this.#vertices;
    }
    set vertices(vertices: Collection<Anchor>) {
        // Remove previous listeners
        if (this.#vertices_insert) {
            this.#vertices_insert.dispose();
            this.#vertices_insert = null;
        }
        if (this.#vertices_remove) {
            this.#vertices_remove.dispose();
            this.#vertices_remove = null;
        }

        // Create new Collection with copy of vertices
        if (vertices instanceof Collection) {
            this.#vertices = vertices;
        }
        else {
            this.#vertices = new Collection(vertices || []);
        }


        // Listen for Collection changes and bind / unbind
        this.#vertices_insert = this.vertices.insert$.subscribe((inserts: Anchor[]) => {
            let i = inserts.length;
            while (i--) {
                const anchor = inserts[i];
                const subscription = anchor.change$.subscribe(() => {
                    this.zzz.flags[Flag.Vertices] = true;
                });
                // TODO: Check that we are not already mapped?
                this.#anchor_change_map.set(anchor, subscription);
            }
            this.zzz.flags[Flag.Vertices] = true;
        });

        this.#vertices_remove = this.vertices.remove$.subscribe((removes: Anchor[]) => {
            let i = removes.length;
            while (i--) {
                const anchor = removes[i];
                const subscription = this.#anchor_change_map.get(anchor);
                subscription.dispose();
                this.#anchor_change_map.delete(anchor);
            }
            this.zzz.flags[Flag.Vertices] = true;
        });

        this.vertices.forEach((anchor: Anchor) => {
            const subscription = anchor.change$.subscribe(() => {
                this.zzz.flags[Flag.Vertices] = true;
            });
            this.#anchor_change_map.set(anchor, subscription);
        });
    }
    get vectorEffect(): 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position' {
        return this.#vectorEffect;
    }
    set vectorEffect(vectorEffect: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position') {
        this.#vectorEffect = vectorEffect;
        this.zzz.flags[Flag.VectorEffect] = true;
    }
}
