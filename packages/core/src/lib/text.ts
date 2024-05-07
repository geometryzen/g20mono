import { effect, state } from 'g2o-reactive';
import { ColoredShapeBase, ColoredShapeOptions } from './ColoredShapeBase';
import { Color } from './effects/ColorProvider';
import { ElementBase } from './element';
import { Flag } from './Flag';
import { Board } from './IBoard';
import { SpinorLike, VectorLike } from './math/G20';
import { svg, transform_value_of_matrix } from './renderers/SVGView';
import { ShapeHost, SVGAttributes } from './Shape';
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

    override render(shapeHost: ShapeHost, parentElement: unknown, svgElement: unknown): void {

        this.update();

        // The styles that will be applied to an SVG
        const changed: SVGAttributes = {};

        if (this.zzz.flags[Flag.ClassName]) {
            changed['class'] = this.classList.join(' ');
        }

        if (this.zzz.elem) {
            shapeHost.setAttributes(this.zzz.elem, changed);
            shapeHost.setAttribute(this.zzz.elem, 'transform', transform_value_of_matrix(this.matrix));
        }
        else {
            changed.id = this.id;
            this.zzz.elem = shapeHost.createSVGElement('text', changed);
            shapeHost.appendChild(parentElement, this.zzz.elem);

            super.render(shapeHost, parentElement, svgElement);

            // anchor
            this.zzz.disposables.push(effect(() => {
                const anchor = this.anchor;
                const crazy = this.board.crazy;
                switch (anchor) {
                    case 'start': {
                        if (crazy) {
                            shapeHost.setAttribute(this.zzz.elem, 'text-anchor', 'end');
                        }
                        else {
                            shapeHost.removeAttribute(this.zzz.elem, 'text-anchor');
                        }
                        break;
                    }
                    case 'middle': {
                        shapeHost.setAttribute(this.zzz.elem, 'text-anchor', anchor);
                        break;
                    }
                    case 'end': {
                        if (crazy) {
                            shapeHost.removeAttribute(this.zzz.elem, 'text-anchor');
                        }
                        else {
                            shapeHost.setAttribute(this.zzz.elem, 'text-anchor', anchor);
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
                shapeHost.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // direction
            this.zzz.disposables.push(effect(() => {
                const direction = this.direction;
                if (direction === 'rtl') {
                    shapeHost.setAttributes(this.zzz.elem, { direction });
                }
                else {
                    shapeHost.removeAttributes(this.zzz.elem, { direction });
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
                            shapeHost.setAttribute(this.zzz.elem, 'dominant-baseline', 'hanging');
                        }
                        else {
                            shapeHost.removeAttribute(this.zzz.elem, 'dominant-baseline');
                        }
                        break;
                    }
                    case 'middle': {
                        shapeHost.setAttribute(this.zzz.elem, 'dominant-baseline', baseline);
                        break;
                    }
                    case 'hanging': {
                        if (goofy) {
                            shapeHost.setAttribute(this.zzz.elem, 'dominant-baseline', 'auto');
                        }
                        else {
                            shapeHost.setAttribute(this.zzz.elem, 'dominant-baseline', baseline);
                        }
                        break;
                    }
                    default: {
                        shapeHost.setAttribute(this.zzz.elem, 'dominant-baseline', baseline);
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
                    shapeHost.removeAttributes(this.zzz.elem, { dx: "" });
                }
                else {
                    if (typeof dx === 'number') {
                        if (crazy) {
                            shapeHost.setAttributes(this.zzz.elem, { dx: `${-dx}` });
                        }
                        else {
                            shapeHost.setAttributes(this.zzz.elem, { dx: `${dx}` });
                        }
                    }
                    else {
                        shapeHost.setAttributes(this.zzz.elem, { dx: `${dx}` });
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
                    shapeHost.removeAttributes(this.zzz.elem, { dy: "" });
                }
                else {
                    if (typeof dy === 'number') {
                        if (goofy) {
                            shapeHost.setAttributes(this.zzz.elem, { dy: `${dy}` });
                        }
                        else {
                            shapeHost.setAttributes(this.zzz.elem, { dy: `${-dy}` });
                        }
                    }
                    else {
                        shapeHost.setAttributes(this.zzz.elem, { dy: `${dy}` });
                    }
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // font-family
            this.zzz.disposables.push(effect(() => {
                shapeHost.setAttributes(this.zzz.elem, { 'font-family': this.fontFamily });
            }));

            // font-size
            this.zzz.disposables.push(effect(() => {
                shapeHost.setAttributes(this.zzz.elem, { 'font-size': `${this.fontSize}` });
            }));

            // font-style
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = { 'font-style': this.fontStyle };
                if (change['font-style'] === 'normal') {
                    shapeHost.removeAttributes(this.zzz.elem, change);
                }
                else {
                    shapeHost.setAttributes(this.zzz.elem, change);
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // font-weight
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = { 'font-weight': `${this.fontWeight}` };
                if (change['font-weight'] === 'normal') {
                    shapeHost.removeAttributes(this.zzz.elem, change);
                }
                else {
                    shapeHost.setAttributes(this.zzz.elem, change);
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // textContent
            this.zzz.disposables.push(effect(() => {
                shapeHost.setTextContent(this.zzz.elem, this.content);
            }));
        }

        if (this.zzz.flags[Flag.ClipFlag]) {
            const clip = svg.getClip(shapeHost, this, svgElement);
            const elem = this.zzz.elem;

            if (this.zzz.ismask) {
                shapeHost.removeAttribute(elem, 'id');
                shapeHost.setAttribute(clip, 'id', this.id);
                shapeHost.appendChild(clip, elem);
            }
            else {
                shapeHost.removeAttribute(clip, 'id');
                shapeHost.setAttribute(elem, 'id', this.id);
                if (this.parent instanceof ElementBase) {
                    shapeHost.appendChild(this.parent.zzz.elem, elem); // TODO: should be insertBefore
                }
            }
        }

        // Commented two-way functionality of clips / masks with groups and
        // polygons. Uncomment when this bug is fixed:
        // https://code.google.com/p/chromium/issues/detail?id=370951

        if (this.zzz.flags[Flag.ClipPath]) {
            if (this.mask) {
                this.mask.render(shapeHost, parentElement, svgElement);
                shapeHost.setAttribute(this.zzz.elem, 'clip-path', 'url(#' + this.mask.id + ')');
            }
            else {
                shapeHost.removeAttribute(this.zzz.elem, 'clip-path');
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


