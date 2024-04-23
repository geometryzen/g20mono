import { Color } from './effects/ColorProvider';
import { IBoard } from './IBoard';
import { Observable } from './reactive/Observable';
import { PositionLike, Shape } from './Shape';
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
export declare class Text extends Shape implements TextProperties {
    #private;
    automatic: boolean;
    beginning: number;
    cap: 'butt' | 'round' | 'square';
    closed: boolean;
    curved: boolean;
    ending: number;
    join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    length: number;
    miter: number;
    readonly fontFamily$: Observable<string>;
    readonly fontSize$: Observable<number>;
    constructor(board: IBoard, value: string, attributes?: Partial<TextAttributes>);
    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
    static Measure(text: Text): {
        width: number;
        height: number;
    };
    /**
     * Convenience method to set fill to `none`.
     */
    noFill(): this;
    /**
     * Convenience method to set stroke to `none`.
     */
    noStroke(): this;
    getBoundingBox(shallow?: boolean): {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    hasBoundingBox(): boolean;
    subdivide(limit: number): this;
    flagReset(dirtyFlag?: boolean): this;
    get anchor(): 'start' | 'middle' | 'end';
    set anchor(anchor: 'start' | 'middle' | 'end');
    get baseline(): 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    set baseline(baseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top');
    get dashes(): number[];
    set dashes(v: number[]);
    get decoration(): TextDecoration[];
    set decoration(v: TextDecoration[]);
    get direction(): 'ltr' | 'rtl';
    set direction(direction: 'ltr' | 'rtl');
    get dx(): number | string;
    set dx(dx: number | string);
    get dy(): number | string;
    set dy(dy: number | string);
    get fontFamily(): string;
    set fontFamily(family: string);
    get fill(): Color;
    set fill(fill: Color);
    get strokeWidth(): number;
    set strokeWidth(strokeWidth: number);
    get fontSize(): number;
    set fontSize(size: number);
    get stroke(): Color;
    set stroke(stroke: Color);
    get fontStyle(): 'normal' | 'italic' | 'oblique';
    set fontStyle(fontStyle: 'normal' | 'italic' | 'oblique');
    get value(): string;
    set value(value: string);
    get fontWeight(): number | "normal" | "bold" | "bolder" | "lighter";
    set fontWeight(fontWeight: number | "normal" | "bold" | "bolder" | "lighter");
}
