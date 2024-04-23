import { Color } from "../effects/ColorProvider";
import { IBoard } from "../IBoard";
import { Path } from "../path";
import { PositionLike } from "../Shape";
export interface PolygonAttributes {
    id: string;
    opacity: number;
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}
export declare class Polygon extends Path implements PolygonAttributes {
    constructor(board: IBoard, points?: PositionLike[], attributes?: Partial<PolygonAttributes>);
}
