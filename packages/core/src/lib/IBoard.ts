import { Anchor } from './anchor';
import { PointAttributes } from './Board';
import { Group } from './group';
import { Path, PathAttributes } from './Path';
import { Disposable } from './reactive/Disposable';
import { PositionLike, Shape } from './Shape';
import { ArcSegment } from './shapes/ArcSegment';
import { Arrow, ArrowAttributes } from './shapes/Arrow';
import { Circle, CircleAttributes } from './shapes/Circle';
import { Ellipse, EllipseAttributes } from './shapes/Ellipse';
import { Line, LineAttributes } from './shapes/Line';
import { Polygon, PolygonAttributes } from './shapes/Polygon';
import { Rectangle, RectangleAttributes } from './shapes/Rectangle';
import { Text, TextAttributes } from './text';

export interface Board extends Disposable {
    arc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, resolution?: number): ArcSegment; arrow(axis: PositionLike, attributes?: ArrowAttributes): Arrow;
    circle(attributes?: CircleAttributes): Circle;
    curve(closed: boolean, points: Anchor[], attributes?: PathAttributes): Path;
    ellipse(attributes?: EllipseAttributes): Ellipse;
    line(point1: PositionLike, point2: PositionLike, attributes?: LineAttributes): Line;
    path(closed: boolean, points: Anchor[], attributes?: PathAttributes): Path;
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
    get scene(): Group;
    width: number;
    height: number;
    get sx(): number;
    get sy(): number;
}