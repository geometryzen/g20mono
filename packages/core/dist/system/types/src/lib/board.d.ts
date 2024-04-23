import { Anchor } from './anchor';
import { Group } from './group';
import { IBoard } from './IBoard';
import { G20 } from './math/G20';
import { Path } from './path';
import { ViewFactory } from './renderers/ViewFactory';
import { PositionLike, Shape } from './Shape';
import { ArcSegment } from './shapes/ArcSegment';
import { Arrow, ArrowAttributes } from './shapes/Arrow';
import { Circle, CircleAttributes } from './shapes/Circle';
import { Ellipse, EllipseAttributes } from './shapes/Ellipse';
import { Line, LineAttributes } from './shapes/Line';
import { Polygon, PolygonAttributes } from './shapes/Polygon';
import { Rectangle, RectangleAttributes } from './shapes/Rectangle';
import { Text, TextAttributes } from './text';
export interface BoardAttributes {
    boundingBox?: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    resizeTo?: Element;
    scene?: Group;
    size?: {
        width: number;
        height: number;
    };
    viewFactory?: ViewFactory;
}
export interface PointAttributes {
    id: string;
    visibility: 'visible' | 'hidden' | 'collapse';
}
export declare class Board implements IBoard {
    #private;
    /**
     * The width of the instance's dom element.
     */
    width: number;
    /**
     * The height of the instance's dom element.
     */
    height: number;
    readonly size$: import("..").Observable<{
        width: number;
        height: number;
    }>;
    /**
     *
     */
    ratio: number | undefined;
    readonly frameCount$: import("..").Observable<number>;
    readonly goofy: boolean;
    constructor(elementOrId: string | HTMLElement, options?: BoardAttributes);
    dispose(): void;
    get scaleXY(): G20;
    get scene(): Group;
    appendTo(container: Element): this;
    getBoundingBox(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    /**
     * A number representing how much time has elapsed since the last frame in milliseconds.
     */
    getElapsedTime(fractionalDigits?: number): number | null;
    /**
     * Update positions and calculations in one pass before rendering.
     */
    update(): void;
    add(...shapes: Shape[]): this;
    remove(...shapes: Shape[]): this;
    circle(options?: CircleAttributes): Circle;
    ellipse(options?: Partial<EllipseAttributes>): Ellipse;
    line(point1: PositionLike, point2: PositionLike, attributes?: LineAttributes): Line;
    path(closed: boolean, ...points: Anchor[]): Path;
    point(position: PositionLike, attributes?: Partial<PointAttributes>): Shape;
    polygon(points?: PositionLike[], attributes?: Partial<PolygonAttributes>): Polygon;
    rectangle(attributes: RectangleAttributes): Rectangle;
    text(message: string, attributes?: Partial<TextAttributes>): Text;
    arrow(axis: PositionLike, attributes?: ArrowAttributes): Arrow;
    curve(closed: boolean, ...anchors: Anchor[]): Path;
    arc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, resolution?: number): ArcSegment;
    group(...shapes: Shape[]): Group;
}
