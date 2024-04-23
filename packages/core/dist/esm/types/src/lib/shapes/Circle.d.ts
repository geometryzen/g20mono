import { Color } from '../effects/ColorProvider';
import { IBoard } from '../IBoard';
import { G20 } from '../math/G20';
import { Path } from '../path';
import { PositionLike } from '../Shape';
export interface CircleAPI<X> {
    position: X;
    attitude: G20;
    radius: number;
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}
export interface CircleAttributes extends Partial<CircleAPI<PositionLike>> {
    position?: PositionLike;
    attitude?: G20;
    radius?: number;
    resolution?: number;
}
export interface CircleProperties extends CircleAPI<G20> {
    position: G20;
    attitude: G20;
    radius: number;
}
export declare class Circle extends Path implements CircleProperties {
    #private;
    constructor(board: IBoard, options?: CircleAttributes);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get radius(): number;
    set radius(radius: number);
}
