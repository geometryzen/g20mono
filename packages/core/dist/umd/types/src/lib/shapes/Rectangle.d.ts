import { Color } from '../effects/ColorProvider';
import { IBoard } from '../IBoard';
import { G20 } from '../math/G20';
import { Path } from '../path';
import { Disposable } from '../reactive/Disposable';
import { PositionLike } from '../Shape';
export interface RectangleAPI<X> {
    id: string;
    opacity: number;
    position: X;
    attitude: G20;
    width: number;
    height: number;
    visibility: 'visible' | 'hidden' | 'collapse';
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}
export interface RectangleAttributes extends Partial<RectangleAPI<PositionLike>> {
    id?: string;
    opacity?: number;
    position?: PositionLike;
    attitude?: G20;
    width?: number;
    height?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}
export interface RectangleProperties extends RectangleAPI<G20> {
    id: string;
    opacity: number;
    position: G20;
    attitude: G20;
    width: number;
    height: number;
    visibility: 'visible' | 'hidden' | 'collapse';
}
export declare class Rectangle extends Path implements RectangleProperties, Disposable {
    #private;
    constructor(board: IBoard, attributes?: RectangleAttributes);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get height(): number;
    set height(height: number);
    get origin(): G20;
    set origin(origin: G20);
    get width(): number;
    set width(width: number);
}
