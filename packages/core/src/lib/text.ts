import { effect, state } from 'g2o-reactive';
import { Board } from './Board';
import { ColoredShapeBase, ColoredShapeOptions } from './ColoredShapeBase';
import { Color } from './effects/ColorProvider';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { SpinorLike, VectorLike } from './math/G20';
import { svg, transform_value_of_matrix } from './renderers/SVGViewDOM';
import { SVGAttributes, ViewDOM } from './Shape';
import { default_color } from './utils/default_color';
import { default_open_path_stroke_width } from './utils/default_stroke_width';

const min = Math.min, max = Math.max;

export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';

export interface TextOptions extends ColoredShapeOptions {
    anchor?: 'start' | 'middle' | 'end';
    baseline?: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    decoration?: TextDecoration[];
    direction?: 'ltr' | 'rtl';
    dx?: number | string;
    dy?: number | string;
    fillColor?: Color;
    fillOpacity?: number;
    fontFamily?: string;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    id?: string;
    opacity?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    fontSize?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    sx?: number;
    sy?: number;
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
    fillColor: Color;
    fillOpacity: number;
    id: string;
    opacity: number;
    fontSize: number;
    strokeColor: Color;
    strokeOpacity: number;
    strokeWidth: number;
    fontStyle: 'normal' | 'italic' | 'oblique';
    content: string;
    visibility: 'visible' | 'hidden' | 'collapse';
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
}

export class Text extends ColoredShapeBase implements TextProperties {
    beginning: number;
    ending: number;
    length: number;

    readonly #content = state('');

    readonly #fontFamily = state('sans-serif');

    readonly #fontSize = state(18);

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

    constructor(owner: Board, content: string, options: Partial<TextOptions> = {}) {

        super(owner, shape_options_from_text_options(options, owner));

        this.content = content;

        if (options.anchor) {
            this.anchor = options.anchor;
        }
        if (options.baseline) {
            this.baseline = options.baseline;
        }
        if (options.decoration) {
            this.decoration = options.decoration;
        }
        if (options.direction) {
            this.direction = options.direction;
        }
        if (typeof options.dx === 'number' || typeof options.dx === 'string') {
            this.dx = options.dx;
        }
        if (typeof options.dy === 'number' || typeof options.dy === 'string') {
            this.dy = options.dy;
        }
        if (options.fontFamily) {
            this.fontFamily = options.fontFamily;
        }
        if (options.opacity) {
            this.opacity = options.opacity;
        }
        if (options.fontSize) {
            this.fontSize = options.fontSize;
        }
        if (options.fontStyle) {
            this.fontStyle = options.fontStyle;
        }
        if (options.value) {
            this.content = options.value;
        }
        if (typeof options.visibility === 'string') {
            this.visibility = options.visibility;
        }
        if (options.fontWeight) {
            this.fontWeight = options.fontWeight;
        }

        this.flagReset(true);
    }

    override render<T>(viewDOM: ViewDOM<T>, parentElement: T, svgElement: T): void {

        this.update();

        // The styles that will be applied to an SVG
        const changed: SVGAttributes = {};

        if (this.zzz.flags[Flag.ClassName]) {
            changed['class'] = this.classList.join(' ');
        }

        if (this.zzz.elem) {
            viewDOM.setAttributes(this.zzz.elem as T, changed);
            viewDOM.setAttribute(this.zzz.elem as T, 'transform', transform_value_of_matrix(this.matrix));
        }
        else {
            changed.id = this.id;
            const text = viewDOM.createSVGElement('text', changed);
            this.zzz.elem = text;
            viewDOM.appendChild(parentElement, text);

            super.render(viewDOM, parentElement, svgElement);

            // anchor
            this.zzz.disposables.push(effect(() => {
                const anchor = this.anchor;
                const crazy = this.board.crazy;
                switch (anchor) {
                    case 'start': {
                        if (crazy) {
                            viewDOM.setAttribute(text, 'text-anchor', 'end');
                        }
                        else {
                            viewDOM.removeAttribute(text, 'text-anchor');
                        }
                        break;
                    }
                    case 'middle': {
                        viewDOM.setAttribute(text, 'text-anchor', anchor);
                        break;
                    }
                    case 'end': {
                        if (crazy) {
                            viewDOM.removeAttribute(text, 'text-anchor');
                        }
                        else {
                            viewDOM.setAttribute(text, 'text-anchor', anchor);
                        }
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
                viewDOM.setAttributes(text, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // direction
            this.zzz.disposables.push(effect(() => {
                const direction = this.direction;
                if (direction === 'rtl') {
                    viewDOM.setAttributes(text, { direction });
                }
                else {
                    viewDOM.removeAttributes(text, { direction });
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // dominant-baseline
            this.zzz.disposables.push(effect(() => {
                const baseline = this.baseline;
                const goofy = this.board.goofy;
                switch (baseline) {
                    case 'auto': {
                        if (goofy) {
                            viewDOM.setAttribute(text, 'dominant-baseline', 'hanging');
                        }
                        else {
                            viewDOM.removeAttribute(text, 'dominant-baseline');
                        }
                        break;
                    }
                    case 'middle': {
                        viewDOM.setAttribute(text, 'dominant-baseline', baseline);
                        break;
                    }
                    case 'hanging': {
                        if (goofy) {
                            viewDOM.setAttribute(text, 'dominant-baseline', 'auto');
                        }
                        else {
                            viewDOM.setAttribute(text, 'dominant-baseline', baseline);
                        }
                        break;
                    }
                    default: {
                        viewDOM.setAttribute(text, 'dominant-baseline', baseline);
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
                const crazy = this.board.crazy;
                if (typeof dx === 'number' && dx === 0) {
                    viewDOM.removeAttributes(text, { dx: "" });
                }
                else {
                    if (typeof dx === 'number') {
                        if (crazy) {
                            viewDOM.setAttributes(text, { dx: `${-dx}` });
                        }
                        else {
                            viewDOM.setAttributes(text, { dx: `${dx}` });
                        }
                    }
                    else {
                        viewDOM.setAttributes(text, { dx: `${dx}` });
                    }
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // dy
            this.zzz.disposables.push(effect(() => {
                const dy = this.dy;
                const goofy = this.board.goofy;
                if (typeof dy === 'number' && dy === 0) {
                    viewDOM.removeAttributes(text, { dy: "" });
                }
                else {
                    if (typeof dy === 'number') {
                        if (goofy) {
                            viewDOM.setAttributes(text, { dy: `${dy}` });
                        }
                        else {
                            viewDOM.setAttributes(text, { dy: `${-dy}` });
                        }
                    }
                    else {
                        viewDOM.setAttributes(text, { dy: `${dy}` });
                    }
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // font-family
            this.zzz.disposables.push(effect(() => {
                viewDOM.setAttributes(text, { 'font-family': this.fontFamily });
            }));

            // font-size
            this.zzz.disposables.push(effect(() => {
                viewDOM.setAttributes(text, { 'font-size': `${this.fontSize}` });
            }));

            // font-style
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = { 'font-style': this.fontStyle };
                if (change['font-style'] === 'normal') {
                    viewDOM.removeAttributes(text, change);
                }
                else {
                    viewDOM.setAttributes(text, change);
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // font-weight
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = { 'font-weight': `${this.fontWeight}` };
                if (change['font-weight'] === 'normal') {
                    viewDOM.removeAttributes(text, change);
                }
                else {
                    viewDOM.setAttributes(text, change);
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // textContent
            this.zzz.disposables.push(effect(() => {
                viewDOM.setTextContent(text, this.content);
            }));
        }

        if (this.zzz.flags[Flag.ClipFlag]) {
            const clip = svg.getClip(viewDOM, this, svgElement);
            const elem = this.zzz.elem as T;

            if (this.zzz.ismask) {
                viewDOM.removeAttribute(elem, 'id');
                viewDOM.setAttribute(clip, 'id', this.id);
                viewDOM.appendChild(clip, elem);
            }
            else {
                viewDOM.removeAttribute(clip, 'id');
                viewDOM.setAttribute(elem, 'id', this.id);
                if (this.parent instanceof ElementBase) {
                    viewDOM.appendChild(this.parent.zzz.elem as T, elem); // TODO: should be insertBefore
                }
            }
        }

        // Commented two-way functionality of clips / masks with groups and
        // polygons. Uncomment when this bug is fixed:
        // https://code.google.com/p/chromium/issues/detail?id=370951

        if (this.zzz.flags[Flag.ClipPath]) {
            if (this.mask) {
                this.mask.render(viewDOM, parentElement, svgElement);
                viewDOM.setAttribute(this.zzz.elem as T, 'clip-path', 'url(#' + this.mask.id + ')');
            }
            else {
                viewDOM.removeAttribute(this.zzz.elem as T, 'clip-path');
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

function shape_options_from_text_options(options: Partial<TextOptions>, owner: Board): Partial<ColoredShapeOptions> {

    const retval: Partial<ColoredShapeOptions> = {
        id: options.id,
        dashes: options.dashes,
        plumb: true,//options.plumb,
        position: options.position,
        attitude: options.attitude,
        fillColor: default_color(options.fillColor, 'gray'),
        fillOpacity: options.fillOpacity,
        opacity: options.opacity,
        strokeColor: default_color(options.strokeColor, 'gray'),
        strokeOpacity: options.strokeOpacity,
        strokeWidth: default_open_path_stroke_width(options.strokeWidth, owner),
        sx: typeof options.sx === 'number' ? options.sx : 1 / owner.sx,
        sy: typeof options.sy === 'number' ? options.sy : 1 / owner.sy,
        vectorEffect: options.vectorEffect,
        visibility: options.visibility
    };
    return retval;
}


