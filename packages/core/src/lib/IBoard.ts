import { Anchor } from './anchor';
import { PointOptions } from './Board';
import { Group } from './group';
import { G20, VectorLike } from './math/G20';
import { Path, PathOptions } from './Path';
import { Disposable } from './reactive/Disposable';
import { ShapeBase } from './ShapeBase';
import { ArcSegment } from './shapes/ArcSegment';
import { Arrow, ArrowOptions } from './shapes/Arrow';
import { Circle, CircleOptions } from './shapes/Circle';
import { Ellipse, EllipseOptions } from './shapes/Ellipse';
import { Line, LineOptions } from './shapes/Line';
import { Polygon, PolygonOptions } from './shapes/Polygon';
import { Rectangle, RectangleOptions } from './shapes/Rectangle';
import { Text, TextOptions } from './text';

export interface Board extends Disposable {
    arc(innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, resolution?: number): ArcSegment;
    arrow(axis: VectorLike, options?: ArrowOptions): Arrow;
    circle(options?: CircleOptions): Circle;
    curve(closed: boolean, points: (Anchor | G20 | [x: number, y: number])[], options?: PathOptions): Path;
    ellipse(options?: EllipseOptions): Ellipse;
    line(point1: VectorLike, point2: VectorLike, options?: LineOptions): Line;
    path(closed: boolean, points: (Anchor | G20 | [x: number, y: number])[], options?: PathOptions): Path;
    point(position: VectorLike, options?: PointOptions): ShapeBase;
    polygon(points: VectorLike[], options?: PolygonOptions): Polygon;
    rectangle(options?: RectangleOptions): Rectangle;
    text(message: string, options?: TextOptions): Text;

    add(...shapes: ShapeBase[]): this;
    remove(...shapes: ShapeBase[]): this;

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