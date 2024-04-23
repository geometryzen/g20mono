import { IBoard } from "../IBoard";
import { G20 } from "../math/G20";
import { Path } from "../path";
import { PositionLike } from "../Shape";
export interface ArrowAttributes {
    id?: string;
    headLength?: number;
    position?: PositionLike;
    strokeOpacity?: number;
    strokeWidth?: number;
}
export interface ArrowProperties {
    X: G20;
    position: G20;
    R: G20;
    attitude: G20;
    axis: G20;
    headLength: number;
    strokeOpacity: number;
    strokeWidth: number;
}
export declare class Arrow extends Path implements ArrowProperties {
    #private;
    constructor(board: IBoard, axis: PositionLike, attributes?: ArrowAttributes);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get axis(): G20;
    set axis(axis: G20);
    get headLength(): number;
    set headLength(headLength: number);
    get origin(): G20;
    set origin(origin: G20);
}
