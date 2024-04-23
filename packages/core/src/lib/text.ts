import { Color, is_color_provider, serialize_color } from './effects/ColorProvider';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { IBoard } from './IBoard';
import { get_dashes_offset, set_dashes_offset } from './path';
import { Disposable } from './reactive/Disposable';
import { Observable } from './reactive/Observable';
import { variable } from './reactive/variable';
import { get_svg_element_defs, set_defs_dirty_flag, svg, SVGAttributes, transform_value_of_matrix } from './renderers/SVGView';
import { PositionLike, Shape, ShapeAttributes } from './Shape';

const min = Math.min, max = Math.max;

export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';

export interface TextAttributes {
    anchor: 'start' | 'middle' | 'end';
    baseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    decoration: TextDecoration[];
    direction: 'ltr' | 'rtl';
    dx: number | string;
    dy: number | string;
    fontFamily: string;
    fill: Color;
    id: string;
    strokeWidth: number;
    opacity: number;
    position: PositionLike;
    fontSize: number;
    stroke: Color;
    fontStyle: 'normal' | 'italic' | 'oblique';
    value: string;
    visibility: 'visible' | 'hidden' | 'collapse';
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
}

export interface TextProperties {
    anchor: 'start' | 'middle' | 'end';
    baseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    decoration: TextDecoration[];
    direction: 'ltr' | 'rtl';
    dx: number | string;
    dy: number | string;
    fontFamily: string;
    fill: Color;
    id: string;
    strokeWidth: number;
    opacity: number;
    fontSize: number;
    stroke: Color;
    fontStyle: 'normal' | 'italic' | 'oblique';
    value: string;
    visibility: 'visible' | 'hidden' | 'collapse';
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
}

export class Text extends Shape implements TextProperties {
    automatic: boolean;
    beginning: number;
    cap: 'butt' | 'round' | 'square';
    closed: boolean;
    curved: boolean;
    ending: number;
    join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    length: number;
    miter: number;

    readonly #textContent = variable('');

    readonly #fontFamily = variable('sans-serif');
    readonly fontFamily$: Observable<string> = this.#fontFamily.asObservable();

    readonly #fontSize = variable(13);
    readonly fontSize$: Observable<number> = this.#fontSize.asObservable();

    readonly #anchor = variable('start' as 'start' | 'middle' | 'end');

    readonly #baseline = variable('auto' as 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top');

    readonly #fontStyle = variable('normal' as 'normal' | 'italic' | 'oblique');

    readonly #fontWeight = variable('normal' as 'normal' | 'bold' | 'bolder' | 'lighter' | number);

    readonly #decoration = variable(['none' as TextDecoration]);

    /**
     * determine what direction the text should run.
     * Possibly values are `'ltr'` for left-to-right and `'rtl'` for right-to-left. Defaults to `'ltr'`.
     */
    readonly #direction = variable('ltr' as 'ltr' | 'rtl');

    readonly #dx = variable(0 as number | string);
    readonly #dy = variable(0 as number | string);

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    readonly #fill = variable('#000000' as Color);
    #fill_change: Disposable | null = null;

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    readonly #stroke = variable('none' as Color);
    #stroke_change: Disposable | null = null;

    readonly #strokeWidth = variable(1);

    #dashes: number[] | null = null;

    constructor(board: IBoard, value: string, attributes: Partial<TextAttributes> = {}) {

        super(board, shape_attributes_from_text_attributes(attributes));

        this.zzz.anchor$ = this.#anchor.asObservable();
        this.zzz.baseline$ = this.#baseline.asObservable();
        this.zzz.decoration$ = this.#decoration.asObservable();
        this.zzz.direction$ = this.#direction.asObservable();
        this.zzz.dx$ = this.#dx.asObservable();
        this.zzz.dy$ = this.#dy.asObservable();
        this.zzz.fill$ = this.#fill.asObservable();
        this.zzz.fontStyle$ = this.#fontStyle.asObservable();
        this.zzz.fontWeight$ = this.#fontWeight.asObservable();
        this.zzz.stroke$ = this.#stroke.asObservable();
        this.zzz.strokeWidth$ = this.#strokeWidth.asObservable();
        this.zzz.textContent$ = this.#textContent.asObservable();

        this.zzz.flags[Flag.Stroke] = true;

        this.value = value;

        /**
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
         */
        this.dashes = [];

        set_dashes_offset(this.dashes, 0);

        if (attributes.anchor) {
            this.anchor = attributes.anchor;
        }
        if (attributes.baseline) {
            this.baseline = attributes.baseline;
        }
        if (attributes.decoration) {
            this.decoration = attributes.decoration;
        }
        if (attributes.direction) {
            this.direction = attributes.direction;
        }
        if (typeof attributes.dx === 'number' || typeof attributes.dx === 'string') {
            this.dx = attributes.dx;
        }
        if (typeof attributes.dy === 'number' || typeof attributes.dy === 'string') {
            this.dy = attributes.dy;
        }
        if (attributes.fontFamily) {
            this.fontFamily = attributes.fontFamily;
        }
        if (attributes.fill) {
            this.fill = attributes.fill;
        }
        if (attributes.strokeWidth) {
            this.strokeWidth = attributes.strokeWidth;
        }
        if (attributes.opacity) {
            this.opacity = attributes.opacity;
        }
        if (attributes.fontSize) {
            this.fontSize = attributes.fontSize;
        }
        if (attributes.stroke) {
            this.stroke = attributes.stroke;
        }
        if (attributes.fontStyle) {
            this.fontStyle = attributes.fontStyle;
        }
        if (attributes.value) {
            this.value = attributes.value;
        }
        if (typeof attributes.visibility === 'string') {
            this.visibility = attributes.visibility;
        }
        if (attributes.fontWeight) {
            this.fontWeight = attributes.fontWeight;
        }

        this.flagReset(true);
    }

    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void {

        this.update();

        // The styles that will be applied to an SVG
        const changed: SVGAttributes = {};

        const flagMatrix = this.matrix.manual || this.zzz.flags[Flag.Matrix];

        if (flagMatrix) {
            changed.transform = transform_value_of_matrix(this.matrix);
        }

        if (this.zzz.flags[Flag.Size]) {
            changed['font-size'] = `${this.fontSize}`;
        }
        {
            const fill = this.fill;
            if (fill) {
                if (is_color_provider(fill)) {
                    this.zzz.hasFillEffect = true;
                    fill.render(svgElement);
                }
                else {
                    changed.fill = serialize_color(fill);
                    if (this.zzz.hasFillEffect) {
                        set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                        delete this.zzz.hasFillEffect;
                    }
                }
            }
        }
        {
            const stroke = this.stroke;
            if (stroke) {
                if (is_color_provider(stroke)) {
                    this.zzz.hasStrokeEffect = true;
                    stroke.render(svgElement);
                }
                else {
                    changed.stroke = serialize_color(stroke);
                    if (this.zzz.hasStrokeEffect) {
                        set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                        delete this.zzz.hasFillEffect;
                    }
                }
            }
        }
        if (this.zzz.flags[Flag.ClassName]) {
            changed['class'] = this.classList.join(' ');
        }
        if (this.dashes && this.dashes.length > 0) {
            changed['stroke-dasharray'] = this.dashes.join(' ');
            changed['stroke-dashoffset'] = `${get_dashes_offset(this.dashes) || 0}`;
        }

        if (this.zzz.elem) {
            svg.setAttributes(this.zzz.elem, changed);
        }
        else {
            changed.id = this.id;
            this.zzz.elem = svg.createElement('text', changed);
            domElement.appendChild(this.zzz.elem);

            this.zzz.disposables.push(this.matrix.change$.subscribe((matrix) => {
                const change: SVGAttributes = {};
                change.transform = transform_value_of_matrix(matrix);
                svg.setAttributes(this.zzz.elem, change);
            }));

            // anchor
            this.zzz.disposables.push(this.zzz.anchor$.subscribe((anchor) => {
                switch (anchor) {
                    case 'start': {
                        svg.removeAttributes(this.zzz.elem, { 'text-anchor': anchor });
                        break;
                    }
                    case 'middle':
                    case 'end': {
                        svg.setAttributes(this.zzz.elem, { 'text-anchor': anchor });
                        break;
                    }
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // decoration
            this.zzz.disposables.push(this.zzz.decoration$.subscribe((decoration) => {
                const change: SVGAttributes = {};
                change['text-decoration'] = decoration.join(' ');
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // direction
            this.zzz.disposables.push(this.zzz.direction$.subscribe((direction) => {
                if (direction === 'rtl') {
                    svg.setAttributes(this.zzz.elem, { direction });
                }
                else {
                    svg.removeAttributes(this.zzz.elem, { direction });
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // dominant-baseline
            this.zzz.disposables.push(this.zzz.baseline$.subscribe((baseline) => {
                switch (baseline) {
                    case 'auto': {
                        svg.removeAttributes(this.zzz.elem, { 'dominant-baseline': baseline });
                        break;
                    }
                    default: {
                        svg.setAttributes(this.zzz.elem, { 'dominant-baseline': baseline });
                        break;
                    }
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // dx
            this.zzz.disposables.push(this.zzz.dx$.subscribe((dx) => {
                if (typeof dx === 'number' && dx === 0) {
                    svg.removeAttributes(this.zzz.elem, { dx: "" });
                }
                else {
                    svg.setAttributes(this.zzz.elem, { dx: `${dx}` });
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // dy
            this.zzz.disposables.push(this.zzz.dy$.subscribe((dy) => {
                if (typeof dy === 'number' && dy === 0) {
                    svg.removeAttributes(this.zzz.elem, { dy: "" });
                }
                else {
                    svg.setAttributes(this.zzz.elem, { dy: `${dy}` });
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // font-family
            this.zzz.disposables.push(this.fontFamily$.subscribe((family) => {
                svg.setAttributes(this.zzz.elem, { 'font-family': family });
            }));

            // font-size
            this.zzz.disposables.push(this.fontSize$.subscribe((size) => {
                svg.setAttributes(this.zzz.elem, { 'font-size': `${size}` });
            }));

            // font-style
            this.zzz.disposables.push(this.zzz.fontStyle$.subscribe((fontStyle) => {
                const change: SVGAttributes = { 'font-style': fontStyle };
                if (change['font-style'] === 'normal') {
                    svg.removeAttributes(this.zzz.elem, change);
                }
                else {
                    svg.setAttributes(this.zzz.elem, change);
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // font-weight
            this.zzz.disposables.push(this.zzz.fontWeight$.subscribe((fontWeight) => {
                const change: SVGAttributes = { 'font-weight': `${fontWeight}` };
                if (change['font-weight'] === 'normal') {
                    svg.removeAttributes(this.zzz.elem, change);
                }
                else {
                    svg.setAttributes(this.zzz.elem, change);
                }
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

            // stroke-width
            this.zzz.disposables.push(this.zzz.strokeWidth$.subscribe((strokeWidth) => {
                const change: SVGAttributes = {};
                change['stroke-width'] = `${strokeWidth}`;
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // textContent
            this.zzz.disposables.push(this.zzz.textContent$.subscribe((textContent) => {
                this.zzz.elem.textContent = textContent;
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
                if (this.parent instanceof ElementBase) {
                    this.parent.zzz.elem.appendChild(elem); // TODO: should be insertBefore
                }
            }
        }

        // Commented two-way functionality of clips / masks with groups and
        // polygons. Uncomment when this bug is fixed:
        // https://code.google.com/p/chromium/issues/detail?id=370951

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

    static Measure(text: Text): { width: number; height: number } {
        // 0.6 is approximate aspect ratio of a typeface's character width to height.
        const width = text.value.length * text.fontSize * 0.6;
        const height = text.fontSize;
        return { width, height };
    }

    /**
     * Convenience method to set fill to `none`.
     */
    noFill() {
        this.fill = 'none';
        return this;
    }

    /**
     * Convenience method to set stroke to `none`.
     */
    noStroke() {
        this.stroke = 'none';
        return this;
    }

    getBoundingBox(shallow = false): { top: number; left: number; right: number; bottom: number; } {

        let left: number;
        let right: number;
        let top: number;
        let bottom: number;

        this.update();

        const matrix = shallow ? this.matrix : this.worldMatrix;

        const { width, height } = Text.Measure(this);
        const border = (this.strokeWidth || 0) / 2;

        switch (this.anchor) {
            case 'start': {
                left = - border;
                right = width + border;
                break;
            }
            case 'middle': {
                left = - (width / 2 + border);
                right = width / 2 + border;
                break;
            }
            case 'end': {
                left = - (width + border);
                right = border;
                break;
            }
        }

        switch (this.baseline) {
            case 'middle':
                top = - (height / 2 + border);
                bottom = height / 2 + border;
                break;
            default:
                top = - (height + border);
                bottom = border;
        }

        const [ax, ay] = matrix.multiply_vector(left, top);
        const [bx, by] = matrix.multiply_vector(left, bottom);
        const [cx, cy] = matrix.multiply_vector(right, top);
        const [dx, dy] = matrix.multiply_vector(right, bottom);

        top = min(ay, by, cy, dy);
        left = min(ax, bx, cx, dx);
        right = max(ax, bx, cx, dx);
        bottom = max(ay, by, cy, dy);

        return { top, left, right, bottom };
    }

    hasBoundingBox(): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    subdivide(limit: number): this {
        throw new Error('Method not implemented.');
    }

    override flagReset(dirtyFlag = false) {
        super.flagReset(dirtyFlag);
        this.zzz.flags[Flag.Size] = dirtyFlag;
        this.zzz.flags[Flag.Fill] = dirtyFlag;
        this.zzz.flags[Flag.Stroke] = dirtyFlag;
        this.zzz.flags[Flag.ClipFlag] = dirtyFlag;
        this.zzz.flags[Flag.ClassName] = dirtyFlag;
        return this;
    }
    get anchor(): 'start' | 'middle' | 'end' {
        return this.#anchor.get();
    }
    set anchor(anchor: 'start' | 'middle' | 'end') {
        if (typeof anchor === 'string') {
            switch (anchor) {
                case 'start':
                case 'middle':
                case 'end': {
                    this.#anchor.set(anchor);
                    break;
                }
            }
        }
    }
    get baseline(): 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top' {
        return this.#baseline.get();
    }
    set baseline(baseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top') {
        if (typeof baseline === 'string') {
            switch (baseline) {
                case 'alphabetic':
                case 'auto':
                case 'central':
                case 'hanging':
                case 'ideographic':
                case 'mathematical':
                case 'middle':
                case 'text-bottom':
                case 'text-top': {
                    this.#baseline.set(baseline);
                }
            }
        }
    }
    get dashes() {
        return this.#dashes;
    }
    set dashes(v) {
        if (typeof get_dashes_offset(v) !== 'number') {
            set_dashes_offset(v, (this.dashes && get_dashes_offset(this.#dashes)) || 0);
        }
        this.#dashes = v;
    }
    get decoration(): TextDecoration[] {
        return this.#decoration.get();
    }
    set decoration(v: TextDecoration[]) {
        this.#decoration.set(v);
    }
    get direction(): 'ltr' | 'rtl' {
        return this.#direction.get();
    }
    set direction(direction: 'ltr' | 'rtl') {
        if (typeof direction === 'string') {
            if (direction === 'ltr' || direction === 'rtl') {
                if (this.direction !== direction) {
                    this.#direction.set(direction);
                }
            }
        }
    }
    get dx(): number | string {
        return this.#dx.get();
    }
    set dx(dx: number | string) {
        if (typeof dx === 'number' || typeof dx === 'string') {
            if (this.dx !== dx) {
                this.#dx.set(dx);
            }
        }
    }
    get dy(): number | string {
        return this.#dy.get();
    }
    set dy(dy: number | string) {
        if (typeof dy === 'number' || typeof dy === 'string') {
            if (this.dy !== dy) {
                this.#dy.set(dy);
            }
        }
    }
    get fontFamily(): string {
        return this.#fontFamily.get();
    }
    set fontFamily(family: string) {
        if (typeof family === 'string') {
            if (this.fontFamily !== family) {
                this.#fontFamily.set(family);
            }
        }
    }
    get fill(): Color {
        return this.#fill.get();
    }
    set fill(fill) {
        if (this.#fill_change) {
            this.#fill_change.dispose();
            this.#fill_change = null;
        }
        this.#fill.set(fill);
        this.zzz.flags[Flag.Fill] = true;
        if (is_color_provider(this.fill)) {
            this.#fill_change = this.fill.change$.subscribe(() => {
                this.zzz.flags[Flag.Fill] = true;
            });
        }
    }
    get strokeWidth(): number {
        return this.#strokeWidth.get();
    }
    set strokeWidth(strokeWidth: number) {
        if (typeof strokeWidth === 'number') {
            if (this.strokeWidth !== strokeWidth) {
                this.#strokeWidth.set(strokeWidth);
            }
        }
    }
    get fontSize(): number {
        return this.#fontSize.get();
    }
    set fontSize(size: number) {
        if (typeof size === 'number') {
            if (this.fontSize !== size) {
                this.#fontSize.set(size);
                this.zzz.flags[Flag.Size] = true;
            }
        }
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
        if (is_color_provider(this.stroke)) {
            this.#stroke_change = this.stroke.change$.subscribe(() => {
                this.zzz.flags[Flag.Stroke] = true;
            });
        }
    }
    get fontStyle(): 'normal' | 'italic' | 'oblique' {
        return this.#fontStyle.get();
    }
    set fontStyle(fontStyle: 'normal' | 'italic' | 'oblique') {
        if (typeof fontStyle === 'string') {
            this.#fontStyle.set(fontStyle);
        }
    }
    get value(): string {
        return this.#textContent.get();
    }
    set value(value: string) {
        if (typeof value === 'string') {
            if (this.value !== value) {
                this.#textContent.set(value);
            }
        }
    }
    get fontWeight() {
        return this.#fontWeight.get();
    }
    set fontWeight(fontWeight) {
        this.#fontWeight.set(fontWeight);
    }
}

function shape_attributes_from_text_attributes(attributes: Partial<TextAttributes>): Partial<ShapeAttributes> {
    const retval: Partial<ShapeAttributes> = {
        id: attributes.id,
        compensate: true,
        position: attributes.position
    };
    return retval;
}
