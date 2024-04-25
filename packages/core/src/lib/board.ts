import { effect, state } from 'g2o-reactive';
import { Anchor } from './anchor';
import { Constants } from './constants';
import { Color } from './effects/ColorProvider';
import { Group } from './group';
import { IBoard } from './IBoard';
import { G20 } from './math/G20';
import { Path } from './path';
import { Disposable, disposableFromFunction, dispose } from './reactive/Disposable';
import { sizeEquals } from './renderers/Size';
import { SVGViewFactory } from './renderers/SVGViewFactory';
import { View } from './renderers/View';
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
import { dateTime } from './utils/performance';

export interface BoardAttributes {
    boundingBox?: { left: number, top: number, right: number, bottom: number };
    resizeTo?: Element;
    scene?: Group;
    size?: { width: number; height: number };
    viewFactory?: ViewFactory;
}

export interface PointAttributes {
    id?: string;
    fill?: Color;
    fillOpacity?: number;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export class Board implements IBoard {

    readonly #disposables: Disposable[] = [];

    readonly #view: View;

    /**
     * A wrapper group that is used to transform the scene from user coordinates to pixels.
     */
    readonly #viewBox: Group;
    /**
     * 
     */
    readonly #scene: Group;

    readonly #size = state({ width: 0, height: 0 }, { equals: sizeEquals });
    readonly #ratio = state(1);

    /**
     * A helper to handle sizing.
     */
    readonly #fitter: Fitter;

    readonly #frameCount = state(0);

    // Used to compute the elapsed time between frames.
    #curr_now: number | null = null;
    #prev_now: number | null = null;

    readonly #boundingBox: { left: number, top: number, right: number, bottom: number } = { left: -5, top: 5, right: 5, bottom: -5 };
    readonly goofy: boolean;

    constructor(elementOrId: string | HTMLElement, options: BoardAttributes = {}) {

        const container = get_container(elementOrId);
        const container_id = get_container_id(elementOrId);

        this.#viewBox = new Group(this, [], { id: `${container_id}-viewbox` });

        if (typeof options.boundingBox === 'object') {
            const left = options.boundingBox.left;
            const top = options.boundingBox.top;
            const right = options.boundingBox.right;
            const bottom = options.boundingBox.bottom;
            this.#boundingBox.left = left;
            this.#boundingBox.top = top;
            this.#boundingBox.right = right;
            this.#boundingBox.bottom = bottom;
            this.goofy = bottom > top;
        }
        else {
            this.goofy = false;
        }

        if (options.scene instanceof Group) {
            this.#scene = options.scene;
        }
        else {
            this.#scene = new Group(this, [], { id: `${container_id}-scene` });
        }
        this.#viewBox.add(this.#scene);

        if (typeof options.viewFactory === 'object') {
            this.#view = options.viewFactory.createView(this.#viewBox, container_id);
        }
        else {
            this.#view = new SVGViewFactory().createView(this.#viewBox, container_id);
        }

        const config: BoardConfig = config_from_options(container, options);

        this.#fitter = new Fitter(this, this.#view);


        if (container instanceof HTMLElement) {
            this.#fitter.set_target(container as HTMLElement);
            this.#fitter.subscribe();
            this.#fitter.resize();
        }

        if (container instanceof HTMLElement) {
            this.appendTo(container);
        }

        if (config.size) {
            this.#view.setSize(config.size, this.ratio);
        }

        // Why do we need to create this subscription to the view?
        this.#disposables.push(effect(() => {
            const width = this.#view.width;
            const height = this.#view.height;
            this.width = width;
            this.height = height;
            this.#update_view_box();
            this.#size.set({ width, height });
        }));
    }

    dispose(): void {
        dispose(this.#disposables);
        this.#fitter.unsubscribe();
    }

    /**
     * Here we are actually doing a job that is equvalent to the role of the SVG viewBox except that we are also
     * introducing a 90 degree rotation if the coordinate system is right-handed (a.k.a regular or not goofy).
     */
    #update_view_box(): void {
        const { left, top, right, bottom } = this.getBoundingBox();
        const Δx = this.width;
        const Δy = this.height;
        const RL = right - left;
        const TB = top - bottom;
        const sx = Δx / RL;
        const sy = Δy / TB;
        const x = -left * Δx / RL;
        const y = -bottom * Δy / TB;
        this.#viewBox.position.set(x, y);
        if (!this.goofy) {
            this.#viewBox.attitude.rotorFromAngle(Math.PI / 2);
        }
        this.#viewBox.scaleXY.set(sx, sy);
    }

    get frameCount(): number {
        return this.#frameCount.get();
    }

    get scaleXY(): G20 {
        return this.#viewBox.scaleXY.clone();
    }

    get scene(): Group {
        return this.#scene;
    }

    get width(): number {
        return this.#size.get().width;
    }
    set width(width: number) {
        const size = this.#size.get();
        size.width = width;
        this.#size.set(size);
    }
    get height(): number {
        return this.#size.get().height;
    }
    set height(height: number) {
        const size = this.#size.get();
        size.height = height;
        this.#size.set(size);
    }
    get ratio(): number {
        return this.#ratio.get();
    }
    set ratio(ratio: number) {
        this.#ratio.set(ratio);
    }

    appendTo(container: Element) {
        if (container && typeof container.nodeType === 'number') {
            if (container.nodeType === Node.ELEMENT_NODE) {
                const domElement = this.#view.domElement;
                if (domElement instanceof SVGElement || domElement instanceof HTMLCanvasElement) {
                    container.appendChild(this.#view.domElement);
                }
                else {
                    throw new Error("domElement must be an SVGElement or HTMLCanvasElement");
                }

                if (!this.#fitter.is_target_body()) {
                    this.#fitter.set_target(container);
                }

                this.update();
            }
        }

        return this;
    }

    getBoundingBox(): { left: number, top: number, right: number, bottom: number } {
        return this.#boundingBox;
    }

    /**
     * A number representing how much time has elapsed since the last frame in milliseconds.
     */
    getElapsedTime(fractionalDigits = 3): number | null {
        if (typeof this.#prev_now === 'number') {
            return parseFloat((this.#curr_now - this.#prev_now).toFixed(fractionalDigits));
        }
        else {
            return null;
        }
    }

    /**
     * Update positions and calculations in one pass before rendering.
     */
    update(): void {
        this.#prev_now = this.#curr_now;
        this.#curr_now = dateTime.now();

        if (this.#fitter.has_target() && !this.#fitter.is_bound()) {
            this.#fitter.subscribe();
            this.#fitter.resize();
        }

        const width = this.width;
        const height = this.height;
        const renderer = this.#view;

        if (width !== renderer.width || height !== renderer.height) {
            renderer.setSize({ width, height }, this.ratio);
        }

        this.#view.render();

        this.#frameCount.set(this.#frameCount.get() + 1);
    }

    add(...shapes: Shape[]): this {
        this.#scene.add(...shapes);
        this.update();
        return this;
    }

    remove(...shapes: Shape[]): this {
        this.#scene.remove(...shapes);
        this.update();
        return this;
    }

    circle(options: CircleAttributes = {}): Circle {
        const circle = new Circle(this, options);
        this.add(circle);
        return circle;
    }

    ellipse(attributes: EllipseAttributes = {}): Ellipse {
        const ellipse = new Ellipse(this, attributes);
        this.add(ellipse);
        return ellipse;
    }

    line(point1: PositionLike, point2: PositionLike, attributes: LineAttributes = {}): Line {
        const line = new Line(this, point1, point2, attributes);
        this.add(line);
        return line;
    }

    path(closed: boolean, ...points: Anchor[]): Path {
        const path = new Path(this, points, closed);
        const bbox = path.getBoundingBox();
        if (typeof bbox.top === 'number' && typeof bbox.left === 'number' &&
            typeof bbox.right === 'number' && typeof bbox.bottom === 'number') {
            path.center().position.set((bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2);
        }
        this.add(path);
        return path;
    }

    point(position: PositionLike, attributes: PointAttributes = {}): Shape {
        const { left, top, right, bottom } = this.getBoundingBox();
        const sx = this.width / (top - left);
        const sy = this.height / (bottom - right);
        const rx = 4 / sx;
        const ry = 4 / sy;
        const ellipse_attribs = ellipse_attribs_from_point_attribs(attributes);
        ellipse_attribs.position = position;
        ellipse_attribs.rx = rx;
        ellipse_attribs.ry = ry;
        const ellipse = new Ellipse(this, ellipse_attribs);
        this.add(ellipse);
        return ellipse;
    }

    polygon(points: PositionLike[] = [], attributes: Partial<PolygonAttributes> = {}): Polygon {
        const polygon = new Polygon(this, points, attributes);
        this.add(polygon);
        return polygon;
    }

    rectangle(attributes: RectangleAttributes={}): Rectangle {
        const rect = new Rectangle(this, attributes);
        this.add(rect);
        return rect;
    }

    text(message: string, attributes: TextAttributes={}): Text {
        const text = new Text(this, message, attributes);
        this.add(text);
        return text;
    }

    arrow(axis: PositionLike, attributes: ArrowAttributes = {}): Arrow {
        const arrow = new Arrow(this, axis, attributes);
        this.add(arrow);
        return arrow;
    }

    curve(closed: boolean, ...anchors: Anchor[]): Path {
        const curved = true;
        const curve = new Path(this, anchors, closed, curved);
        const bbox = curve.getBoundingBox();
        curve.center().position.set((bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2);
        this.add(curve);
        return curve;
    }

    arc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, resolution: number = Constants.Resolution): ArcSegment {
        const arcSegment = new ArcSegment(this, x, y, innerRadius, outerRadius, startAngle, endAngle, resolution);
        this.add(arcSegment);
        return arcSegment;
    }

    group(...shapes: Shape[]): Group {
        const group = new Group(this, shapes);
        this.add(group);
        return group;
    }
}

class Fitter {
    readonly #board: Board;
    readonly #view: View;
    readonly #domElement: HTMLElement | SVGElement;
    #target: Element | null = null;
    #target_resize: Disposable | null = null;
    constructor(board: Board, view: View) {
        this.#board = board;
        this.#view = view;
        this.#domElement = view.domElement;
    }
    dispose(): void {
        this.unsubscribe();
    }
    is_bound(): boolean {
        return !!this.#target_resize;
    }
    /**
     * Idempotent subscribe to 'resize' events of the target.
     */
    subscribe(): void {
        this.unsubscribe();
        const callback = () => {
            this.resize();

        };
        this.#target.addEventListener('resize', callback);
        const cleanup = () => {
            this.#target.removeEventListener('resize', callback);
        };
        this.#target_resize = disposableFromFunction(cleanup);
    }
    /**
     * Idempotent unsubscribe from 'resize' events of the target.
     */
    unsubscribe(): void {
        if (this.#target_resize) {
            this.#target_resize.dispose();
            this.#target_resize = null;
        }
    }
    has_target(): boolean {
        return !!this.#target;
    }
    set_target(target: Element): this {
        this.#target = target;
        if (this.is_target_body()) {
            // TODO: The controller should take care of this...
            document.body.style.overflow = 'hidden';
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.top = '0';
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.bottom = '0';
            document.body.style.position = 'fixed';

            // TODO: The controller should take care of this...
            this.#domElement.style.display = 'block';
            this.#domElement.style.top = '0';
            this.#domElement.style.left = '0';
            this.#domElement.style.right = '0';
            this.#domElement.style.bottom = '0';
            this.#domElement.style.position = 'fixed';
        }
        return this;
    }
    is_target_body(): boolean {
        return this.#target === document.body;
    }
    resize(): void {
        const board = this.#board;
        const size = this.#target.getBoundingClientRect();

        board.width = size.width;
        board.height = size.height;

        this.#view.setSize(size, board.ratio);
    }
}

interface BoardConfig {
    resizeTo?: Element;
    size?: { width: number; height: number };
}

function config_from_options(container: HTMLElement, options: BoardAttributes): BoardConfig {
    const config: BoardConfig = {
        resizeTo: compute_config_resize_to(container, options),
        size: compute_config_size(container, options)
    };
    return config;
}

function compute_config_resize_to(container: HTMLElement, options: BoardAttributes): Element | null {
    if (options.resizeTo) {
        return options.resizeTo;
    }
    return container;
}

function compute_config_size(container: HTMLElement, options: BoardAttributes): { width: number; height: number } | null {
    if (typeof options.size === 'object') {
        return options.size;
    }
    else {
        if (container) {
            return null;
        }
        else {
            return { width: 640, height: 480 };
        }
    }
}

function get_container(elementOrId: string | HTMLElement): HTMLElement {
    if (typeof elementOrId === 'string') {
        return document.getElementById(elementOrId);
    }
    else {
        return elementOrId;
    }
}

function get_container_id(elementOrId: string | HTMLElement): string {
    if (typeof elementOrId === 'string') {
        return elementOrId;
    }
    else {
        return elementOrId.id;
    }
}

function ellipse_attribs_from_point_attribs(attributes: PointAttributes): EllipseAttributes {
    const retval: EllipseAttributes = {
        id: attributes.id,
        fill: attributes.fill,
        fillOpacity: attributes.fillOpacity,
        // attitude: attributes.attitude,
        // position: attributes.position,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth,
        visibility: attributes.visibility
    };
    return retval;
}

