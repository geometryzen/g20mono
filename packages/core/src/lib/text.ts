import { effect, state } from 'g2o-reactive';
import { ColoredShape, ColoredShapeAttributes } from './ColoredShape';
import { Color } from './effects/ColorProvider';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { IBoard } from './IBoard';
import { get_dashes_offset, set_dashes_offset } from './path';
import { svg, SVGAttributes, transform_value_of_matrix } from './renderers/SVGView';
import { PositionLike } from './Shape';

const min = Math.min, max = Math.max;

export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';

export interface TextAttributes {
    anchor?: 'start' | 'middle' | 'end';
    baseline?: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    decoration?: TextDecoration[];
    direction?: 'ltr' | 'rtl';
    dx?: number | string;
    dy?: number | string;
    fill?: Color;
    fillOpacity?: number;
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    id?: string;
    opacity?: number;
    position?: PositionLike;
    fontSize?: number;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    value?: string;
    visibility?: 'visible' | 'hidden' | 'collapse';
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
    content: string;
    visibility: 'visible' | 'hidden' | 'collapse';
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
}

export class Text extends ColoredShape implements TextProperties {
    automatic: boolean;
    beginning: number;
    ending: number;
    length: number;

    readonly #content = state('');

    readonly #fontFamily = state('sans-serif');

    readonly #fontSize = state(13);

    readonly #anchor = state('start' as 'start' | 'middle' | 'end');

    readonly #baseline = state('auto' as 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top');

    readonly #fontStyle = state('normal' as 'normal' | 'italic' | 'oblique');

    readonly #fontWeight = state('normal' as 'normal' | 'bold' | 'bolder' | 'lighter' | number);

    readonly #decoration = state(['none' as TextDecoration]);

    /**
     * determine what direction the text should run.
     * Possibly values are `'ltr'` for left-to-right and `'rtl'` for right-to-left. Defaults to `'ltr'`.
     */
    readonly #direction = state('ltr' as 'ltr' | 'rtl');

    readonly #dx = state(0 as number | string);
    readonly #dy = state(0 as number | string);

    #dashes: number[] | null = null;

    constructor(board: IBoard, content: string, attributes: Partial<TextAttributes> = {}) {

        super(board, shape_attributes_from_text_attributes(attributes));

        this.content = content;

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
        else {
            this.fill = "#000";
        }
        if (attributes.strokeWidth) {
            this.strokeWidth = attributes.strokeWidth;
        }
        else {
            this.strokeWidth = 1;
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
        else {
            this.stroke = "#000";
        }
        if (attributes.fontStyle) {
            this.fontStyle = attributes.fontStyle;
        }
        if (attributes.value) {
            this.content = attributes.value;
        }
        if (typeof attributes.visibility === 'string') {
            this.visibility = attributes.visibility;
        }
        if (attributes.fontWeight) {
            this.fontWeight = attributes.fontWeight;
        }

        this.flagReset(true);
    }

    render(parentElement: HTMLElement | SVGElement, svgElement: SVGElement): void {

        this.update();

        // The styles that will be applied to an SVG
        const changed: SVGAttributes = {};

        if (this.zzz.flags[Flag.ClassName]) {
            changed['class'] = this.classList.join(' ');
        }
        if (this.dashes && this.dashes.length > 0) {
            changed['stroke-dasharray'] = this.dashes.join(' ');
            changed['stroke-dashoffset'] = `${get_dashes_offset(this.dashes) || 0}`;
        }

        if (this.zzz.elem) {
            svg.setAttributes(this.zzz.elem, changed);
            this.zzz.elem.setAttribute('transform', transform_value_of_matrix(this.matrix));
        }
        else {
            changed.id = this.id;
            this.zzz.elem = svg.createElement('text', changed);
            parentElement.appendChild(this.zzz.elem);
            super.render(parentElement, svgElement);

            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.transform = transform_value_of_matrix(this.matrix);
                svg.setAttributes(this.zzz.elem, change);
            }));

            // anchor
            this.zzz.disposables.push(effect(() => {
                const anchor = this.anchor;
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
            this.zzz.disposables.push(effect(() => {
                const decoration = this.decoration;
                const change: SVGAttributes = {};
                change['text-decoration'] = decoration.join(' ');
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // direction
            this.zzz.disposables.push(effect(() => {
                const direction = this.direction;
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
            this.zzz.disposables.push(effect(() => {
                const baseline = this.baseline;
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
            this.zzz.disposables.push(effect(() => {
                const dx = this.dx;
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
            this.zzz.disposables.push(effect(() => {
                const dy = this.dy;
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
            this.zzz.disposables.push(effect(() => {
                svg.setAttributes(this.zzz.elem, { 'font-family': this.fontFamily });
            }));

            // font-size
            this.zzz.disposables.push(effect(() => {
                svg.setAttributes(this.zzz.elem, { 'font-size': `${this.fontSize}` });
            }));

            // font-style
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = { 'font-style': this.fontStyle };
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
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = { 'font-weight': `${this.fontWeight}` };
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

            // textContent
            this.zzz.disposables.push(effect(() => {
                this.zzz.elem.textContent = this.content;
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
                this.clipPath.render(parentElement, svgElement);
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
        const width = text.content.length * text.fontSize * 0.6;
        const height = text.fontSize;
        return { width, height };
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
    get content(): string {
        return this.#content.get();
    }
    set content(value: string) {
        if (typeof value === 'string') {
            if (this.content !== value) {
                this.#content.set(value);
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
    get fontSize(): number {
        return this.#fontSize.get();
    }
    set fontSize(size: number) {
        if (typeof size === 'number') {
            this.#fontSize.set(size);
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
    get fontWeight() {
        return this.#fontWeight.get();
    }
    set fontWeight(fontWeight) {
        this.#fontWeight.set(fontWeight);
    }
}

function shape_attributes_from_text_attributes(attributes: Partial<TextAttributes>): Partial<ColoredShapeAttributes> {
    const retval: Partial<ColoredShapeAttributes> = {
        id: attributes.id,
        compensate: true,
        position: attributes.position,
    };
    return retval;
}
