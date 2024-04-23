import { Anchor } from './anchor';
import { Color } from './effects/ColorProvider';
import { ElementBase } from './element';
import { IBoard } from './IBoard';
import { IShape } from './IShape';
import { G20 } from './math/G20';
import { Matrix } from './matrix';
export type PositionLike = Anchor | G20 | Shape | [x: number, y: number];
export declare function position_from_like(like: PositionLike): G20 | null;
export interface Parent {
    update?(): void;
}
export interface ShapeAttributes {
    id: string;
    opacity: number;
    position: PositionLike;
    attitude: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
    compensate: boolean;
}
export interface ShapeProperties {
    id: string;
    opacity: number;
    /**
     * alias for the position property.
     */
    X: G20;
    position: G20;
    /**
     * alias for the attitude property.
     */
    R: G20;
    attitude: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
}
export declare abstract class Shape extends ElementBase<unknown> implements IShape<unknown>, ShapeProperties {
    #private;
    readonly board: IBoard;
    abstract automatic: boolean;
    abstract beginning: number;
    abstract cap: 'butt' | 'round' | 'square';
    abstract closed: boolean;
    abstract curved: boolean;
    abstract ending: number;
    abstract fill: Color;
    abstract join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    abstract length: number;
    abstract strokeWidth: number;
    abstract miter: number;
    abstract stroke: Color;
    abstract getBoundingBox(shallow?: boolean): {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    abstract hasBoundingBox(): boolean;
    abstract noFill(): this;
    abstract noStroke(): this;
    abstract subdivide(limit: number): this;
    abstract render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
    constructor(board: IBoard, attributes?: Partial<ShapeAttributes>);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    useAttitude(attitude: G20): void;
    usePosition(position: G20): void;
    get X(): G20;
    set X(pos: G20);
    get position(): G20;
    set position(position: G20);
    get R(): G20;
    set R(attitude: G20);
    get attitude(): G20;
    set attitude(attitude: G20);
    get scale(): number;
    set scale(scale: number);
    get scaleXY(): G20;
    set scaleXY(scale: G20);
    get skewX(): number;
    set skewX(skewX: number);
    get skewY(): number;
    set skewY(skewY: number);
    get clipPath(): Shape | null;
    set clipPath(clipPath: Shape | null);
    get matrix(): Matrix;
    set matrix(matrix: Matrix);
    get opacity(): number;
    set opacity(opacity: number);
    get visibility(): 'visible' | 'hidden' | 'collapse';
    set visibility(visible: 'visible' | 'hidden' | 'collapse');
    show(): this;
    hide(): this;
    collapse(): this;
    get worldMatrix(): Matrix;
    set worldMatrix(worldMatrix: Matrix);
}
