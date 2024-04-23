import { IBoard } from '../IBoard.js';
import { G20 } from '../math/G20.js';
import { Path } from '../path.js';
import { PositionLike } from '../Shape.js';
export interface EllipseAttributes {
    id: string;
    position: PositionLike;
    attitude: G20;
    rx: number;
    ry: number;
    resolution: number;
    visibility: 'visible' | 'hidden' | 'collapse';
}
export declare class Ellipse extends Path {
    _flagWidth: boolean;
    _flagHeight: boolean;
    _width: number;
    _height: number;
    constructor(board: IBoard, options?: Partial<EllipseAttributes>);
    static Properties: string[];
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get height(): number;
    set height(v: number);
    get width(): number;
    set width(v: number);
}
