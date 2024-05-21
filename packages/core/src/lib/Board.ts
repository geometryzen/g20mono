import { Anchor } from "./Anchor";
import { Defaults } from "./Defaults";
import { Group } from "./Group";
import { G20, VectorLike } from "./math/G20";
import { Path, PathOptions } from "./Path";
import { Disposable } from "./reactive/Disposable";
import { Shape } from "./Shape";
import { ArcSegment, ArcSegmentOptions } from "./shapes/ArcSegment";
import { Arrow, ArrowOptions } from "./shapes/Arrow";
import { Circle, CircleOptions } from "./shapes/Circle";
import { Ellipse, EllipseOptions } from "./shapes/Ellipse";
import { Line, LineOptions } from "./shapes/Line";
import { Point, PointOptions } from "./shapes/Point";
import { Polygon, PolygonOptions } from "./shapes/Polygon";
import { Rectangle, RectangleOptions } from "./shapes/Rectangle";
import { Text, TextOptions } from "./Text";

export interface Board extends Disposable {
    arc(options?: ArcSegmentOptions): ArcSegment;
    arrow(axis: VectorLike, options?: ArrowOptions): Arrow;
    circle(options?: CircleOptions): Circle;
    curve(closed: boolean, points: (Anchor | G20 | [x: number, y: number])[], options?: PathOptions): Path;
    ellipse(options?: EllipseOptions): Ellipse;
    line(point1: VectorLike, point2: VectorLike, options?: LineOptions): Line;
    path(closed: boolean, points: (Anchor | G20 | [x: number, y: number])[], options?: PathOptions): Path;
    point(position: VectorLike, options?: PointOptions): Point;
    polygon(points: VectorLike[], options?: PolygonOptions): Polygon;
    rectangle(options?: RectangleOptions): Rectangle;
    text(message: string, options?: TextOptions): Text;

    add(...shapes: Shape[]): this;
    remove(...shapes: Shape[]): this;

    getBoundingBox(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    update(): void;
    get crazy(): boolean;
    get defaults(): Defaults;
    get goofy(): boolean;
    get frameCount(): number;
    get scene(): Group;
    width: number;
    height: number;
    get sx(): number;
    get sy(): number;
}
