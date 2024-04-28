import { PointAttributes } from './Board';
import { Disposable } from './reactive/Disposable';
import { PositionLike, Shape } from './Shape';
import { Arrow, ArrowAttributes } from './shapes/Arrow';
import { Circle, CircleAttributes } from './shapes/Circle';
import { Ellipse, EllipseAttributes } from './shapes/Ellipse';
import { Line, LineAttributes } from './shapes/Line';
import { Polygon, PolygonAttributes } from './shapes/Polygon';
import { Rectangle, RectangleAttributes } from './shapes/Rectangle';
import { Text, TextAttributes } from './text';

export interface Board extends Disposable {
    arrow(axis: PositionLike, attributes?: ArrowAttributes): Arrow;
    circle(attributes?: CircleAttributes): Circle;
    ellipse(attributes?: EllipseAttributes): Ellipse;
    line(point1: PositionLike, point2: PositionLike, attributes?: LineAttributes): Line;
    point(position: PositionLike, attributes?: PointAttributes): Shape;
    polygon(points: PositionLike[], attributes?: PolygonAttributes): Polygon;
    rectangle(attributes?: RectangleAttributes): Rectangle;
    text(message: string, attributes?: TextAttributes): Text;

    add(...shapes: Shape[]): this;
    remove(...shapes: Shape[]): this;

    getBoundingBox(): { left: number, top: number, right: number, bottom: number };
    update(): void;
    get crazy(): boolean;
    get goofy(): boolean;
    get frameCount(): number;
    width: number;
    height: number;
    sx: number;
    sy: number;
}