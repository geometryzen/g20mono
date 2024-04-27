import { PointAttributes } from './Board';
import { G20 } from './math/G20';
import { Disposable } from './reactive/Disposable';
import { PositionLike, Shape } from './Shape';
import { Arrow, ArrowAttributes } from './shapes/Arrow';
import { Polygon, PolygonAttributes } from './shapes/Polygon';
import { RectangleAttributes, RectangleProperties } from './shapes/Rectangle';
import { Text, TextAttributes } from './text';

export interface IBoard extends Disposable {
    arrow(axis: PositionLike, attributes?: ArrowAttributes): Arrow;
    point(position: PositionLike, attributes?: PointAttributes): Shape;
    polygon(points: PositionLike[], attributes?: PolygonAttributes): Polygon;
    rectangle(attributes?: RectangleAttributes): RectangleProperties;
    text(message: string, attributes?: TextAttributes): Text;

    getBoundingBox(): { left: number, top: number, right: number, bottom: number };
    /**
     * When the coordinate system (CSS or SVG) is such that a counter-clockwise rotation of 90 degrees moves the y-axis
     * into alignment with the x-axis, the coordinate system is said to be "goofy". In mathematics, a counter-clockwise
     * rotation of 90 degrees moves the x-axis into alignment with the y-axis. 
     */
    get goofy(): boolean;
    get crazy(): boolean;
    width: number;
    height: number;
    scaleXY: G20;
}