import { effect, state } from 'g2o-reactive';
import { Anchor } from './anchor';
import { Collection } from './collection';
import { ColoredShape, ColoredShapeAttributes } from './ColoredShape';
import { Color } from './effects/ColorProvider';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { Board } from './IBoard';
import { G20 } from './math/G20.js';
import { Disposable } from './reactive/Disposable';
import { variable } from './reactive/variable';
import { svg, SVGAttributes } from './renderers/SVGView';
import { PositionLike } from './Shape';
import { getComponentOnCubicBezier, getCurveBoundingBox, getCurveFromPoints } from './utils/curves';
import { lerp, mod } from './utils/math';
import { Commands } from './utils/path-commands';
import { contains, getCurveLength, getIdByLength, getSubdivisions } from './utils/shape';

const min = Math.min;
const max = Math.max;

const vector = new G20();

export interface PathAttributes extends ColoredShapeAttributes {
    attitude?: G20;
    id?: string,
    dashes?: number[],
    opacity?: number;
    position?: PositionLike;
    vectorEffect?: null | 'non-scaling-stroke';
    visibility?: 'visible' | 'hidden' | 'collapse';
    /**
     * The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    fill?: Color;
    fillOpacity?: number;
    /**
     * The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
}

export class Path extends ColoredShape {

    #length = 0;

    readonly #lengths: number[] = [];

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
    readonly #miterLimit = variable(4);

    readonly #closed = state(true);
    #curved = false;
    #automatic = true;
    #beginning = 0.0;
    #ending = 1.0;

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
    constructor(owner: Board, vertices: Anchor[] = [], closed?: boolean, curved?: boolean, manual?: boolean, attributes: PathAttributes = {}) {

        super(owner, colored_shape_attribs_from_path_attribs(attributes));

        this.flagReset(true);
        this.zzz.flags[Flag.ClipPath] = false;
        this.zzz.flags[Flag.ClipFlag] = false;

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
        this.miterLimit = 4;         // Default of Adobe Illustrator

        this.vertices = new Collection(vertices);

        this.automatic = !manual;
    }

    override render(parentElement: HTMLElement | SVGElement, svgElement: SVGElement): void {

        // Collect any attribute that needs to be changed here
        const changed: SVGAttributes = {};

        if (this.zzz.flags[Flag.ClassName]) {
            if (Array.isArray(this.classList) && this.classList.length > 0) {
                changed['class'] = this.classList.join(' ');
            }
        }

        if (this.zzz.elem) {
            // When completely reactive, this will not be needed
            svg.setAttributes(this.zzz.elem, changed);
            // Why is this needed?
            // this.zzz.elem.setAttribute('transform', transform_value_of_matrix(this.matrix));
        }
        else {
            changed.id = this.id;
            this.zzz.elem = svg.createElement('path', changed);
            parentElement.appendChild(this.zzz.elem);
            super.render(parentElement, svgElement);

            // stroke-linecap
            this.zzz.disposables.push(effect(() => {
                if (this.cap && this.cap !== "butt") {
                    this.zzz.elem.setAttribute('stroke-linecap', this.cap);
                }
                else {
                    this.zzz.elem.removeAttribute('stroke-linecap');
                }
            }));

            // stroke-linejoin
            this.zzz.disposables.push(effect(() => {
                if (this.join && this.join !== "miter") {
                    this.zzz.elem.setAttribute('stroke-linejoin', this.join);
                }
                else {
                    this.zzz.elem.removeAttribute('stroke-linejoin');
                }
            }));

            // stroke-miterlimit
            this.zzz.disposables.push(effect(() => {
                if (this.miterLimit !== 4) {
                    this.zzz.elem.setAttribute('stroke-miterlimit', `${this.miterLimit}`);
                }
                else {
                    this.zzz.elem.removeAttribute('stroke-miterlimit');
                }
            }));

            this.zzz.disposables.push(this.zzz.vertices$.subscribe(() => {
                const change: SVGAttributes = {};
                change.d = svg.path_from_anchors(this.board, this.position, this.attitude, this.zzz.vertices, this.closed);
                svg.setAttributes(this.zzz.elem, change);
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
                if (typeof this.id === 'string') {
                    elem.setAttribute('id', this.id);
                }
                else {
                    elem.removeAttribute('id');
                }
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
                this.clipPath.render(parentElement, svgElement);
                this.zzz.elem.setAttribute('clip-path', 'url(#' + this.clipPath.id + ')');
            }
            else {
                this.zzz.elem.removeAttribute('clip-path');
            }
        }

        this.flagReset();
    }

    center(): this {
        const bbox = this.getBoundingBox(true);
        const cx = (bbox.left + bbox.right) / 2 - this.position.x;
        const cy = (bbox.top + bbox.bottom) / 2 - this.position.y;
        const vertices = this.vertices;
        const N = vertices.length;
        for (let i = 0; i < N; i++) {
            const v = vertices.getAt(i);
            v.x -= cx;
            v.y -= cy;
        }
        if (this.clipPath) {
            this.clipPath.position.x -= cx;
            this.clipPath.position.y -= cy;
        }
        this.update();
        return this;
    }

    corner() {

        const rect = this.getBoundingBox(true);
        const hw = (rect.right - rect.left) / 2;
        const hh = (rect.bottom - rect.top) / 2;
        const cx = (rect.left + rect.right) / 2;
        const cy = (rect.top + rect.bottom) / 2;

        for (let i = 0; i < this.vertices.length; i++) {
            const v = this.vertices.getAt(i);
            v.x -= cx;
            v.y -= cy;
            v.x += hw;
            v.y += hh;
        }

        /*
        if (this.mask) {
          this.mask.translation.x -= cx;
          this.mask.translation.x += hw;
          this.mask.translation.y -= cy;
          this.mask.translation.y += hh;
        }
        */
        this.update();
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
            border *= max(this.scaleXY.x, this.scaleXY.y);
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
     * Based on closed / curved and sorting of vertices, plot where all points should be and where the respective handles should be too.
     */
    plot(): this {
        if (this.curved) {
            getCurveFromPoints(this.#vertices, this.closed);
            return this;
        }
        const vertices = this.#vertices;
        const N = vertices.length;
        for (let i = 0; i < N; i++) {
            vertices.getAt(i).command = (i === 0) ? Commands.move : Commands.line;
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

    #updateVertices(): this {
        if (this.automatic) {
            this.plot();
        }

        this.#updateLength(undefined, true);

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

        return this;
    }

    override update(): this {
        this.#updateVertices();
        super.update();
        return this;
    }

    override flagReset(dirtyFlag = false): this {

        this.zzz.flags[Flag.ClipFlag] = dirtyFlag;
        this.zzz.flags[Flag.ClipPath] = dirtyFlag;

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
    }
    get closed(): boolean {
        return this.#closed.get();
    }
    set closed(closed: boolean) {
        if (typeof closed === 'boolean') {
            this.#closed.set(closed);
        }
    }
    get curved(): boolean {
        return this.#curved;
    }
    set curved(curved: boolean) {
        this.#curved = !!curved;
    }
    get ending(): number {
        return this.#ending;
    }
    set ending(ending: number) {
        this.#ending = ending;
    }
    get join(): 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round' {
        return this.#join.get();
    }
    set join(join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round') {
        this.#join.set(join);
    }
    get length(): number {
        return this.#length;
    }
    get lengths(): number[] {
        return this.#lengths;
    }
    get miterLimit(): number {
        return this.#miterLimit.get();
    }
    set miterLimit(miterlimit: number) {
        this.#miterLimit.set(miterlimit);
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
                    this.#updateVertices();
                    // this.update();
                });
                // TODO: Check that we are not already mapped?
                this.#anchor_change_map.set(anchor, subscription);
            }
        });

        this.#vertices_remove = this.vertices.remove$.subscribe((removes: Anchor[]) => {
            let i = removes.length;
            while (i--) {
                const anchor = removes[i];
                const subscription = this.#anchor_change_map.get(anchor);
                subscription.dispose();
                this.#anchor_change_map.delete(anchor);
            }
        });

        this.vertices.forEach((anchor: Anchor) => {
            const subscription = anchor.change$.subscribe(() => {
                this.#updateVertices();
                // this.update();
            });
            this.#anchor_change_map.set(anchor, subscription);
        });
    }
}


function colored_shape_attribs_from_path_attribs(attributes: PathAttributes): ColoredShapeAttributes {
    const retval: ColoredShapeAttributes = {
        id: attributes.id,
        dashes: attributes.dashes,
        position: attributes.position,
        attitude: attributes.attitude,
        fill: attributes.fill,
        fillOpacity: attributes.fillOpacity,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth,
        opacity: attributes.opacity,
        plumb: attributes.plumb,
        vectorEffect: attributes.vectorEffect,
        visibility: attributes.visibility
    };
    return retval;
}
