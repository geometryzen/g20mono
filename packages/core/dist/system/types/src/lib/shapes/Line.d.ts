import { Anchor } from '../anchor';
import { Color } from '../effects/ColorProvider';
import { IBoard } from '../IBoard';
import { Path } from '../path';
import { PositionLike } from '../Shape';
export interface LineAttributes {
    id?: string;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}
export interface LineProperties {
    id?: string;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}
export declare class Line extends Path implements LineProperties {
    constructor(board: IBoard, point1: PositionLike, point2: PositionLike, attributes?: LineAttributes);
    get point1(): Anchor;
    set point1(point1: Anchor);
    get point2(): Anchor;
    set point2(point2: Anchor);
}
