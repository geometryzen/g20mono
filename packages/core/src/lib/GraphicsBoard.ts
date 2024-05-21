import { computed, effect, Readable, signal, State } from "@g20/reactive";
import { Anchor } from "./Anchor";
import { Board } from "./Board";
import { Defaults } from "./Defaults";
import { ElementDOM } from "./ElementDOM";
import { Group } from "./Group";
import { G20, VectorLike } from "./math/G20";
import { Path, PathOptions } from "./Path";
import { Disposable, disposableFromFunction, dispose } from "./reactive/Disposable";
import { sizeEquals } from "./renderers/Size";
import { View } from "./renderers/View";
import { ViewFactory } from "./renderers/ViewFactory";
import { Shape, ViewDOM } from "./Shape";
import { ArcSegment, ArcSegmentOptions } from "./shapes/ArcSegment";
import { Arrow, ArrowOptions } from "./shapes/Arrow";
import { Circle, CircleOptions } from "./shapes/Circle";
import { Ellipse, EllipseOptions } from "./shapes/Ellipse";
import { Line, LineOptions } from "./shapes/Line";
import { Point, PointOptions } from "./shapes/Point";
import { Polygon, PolygonOptions } from "./shapes/Polygon";
import { Rectangle, RectangleOptions } from "./shapes/Rectangle";
import { Text, TextOptions } from "./Text";
import { default_color } from "./utils/default_color";
import { default_number } from "./utils/default_number";
import { default_closed_path_stroke_width, default_open_path_stroke_width } from "./utils/default_stroke_width";
import { dateTime } from "./utils/performance";

export type BoundingBox = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};

export interface GraphicsBoardOptions {
    boundingBox?: { left: number; top: number; right: number; bottom: number };
}

export class GraphicsBoard<E, T> implements Board {
    readonly defaults: Defaults = new Defaults();
    readonly #disposables: Disposable[] = [];

    readonly #view: View<T>;
    readonly #viewDOM: ViewDOM<T>;
    readonly #elementDOM: ElementDOM<E, T>;

    /**
     * A wrapper group that is used to transform the scene from user coordinates to pixels.
     */
    readonly #viewBox: Group;
    /**
     *
     */
    readonly #scene: Group;

    readonly #size = signal({ width: 0, height: 0 }, { equals: sizeEquals });
    readonly #ratio = signal(1);

    /**
     * A helper to handle sizing.
     */
    readonly #fitter: Fitter<E, T>;

    readonly #frameCount = signal(0);

    // Used to compute the elapsed time between frames.
    #curr_now: number | null = null;
    #prev_now: number | null = null;

    readonly #boundingBox: State<BoundingBox> = signal({
        left: -1,
        top: 1,
        right: 1,
        bottom: -1,
    });
    /**
     * 'goofy' is actually regular SVG coordinates where the y coordinate increases downwards.
     */
    readonly #goofy: Readable<boolean> = computed(() => {
        const bbox = this.getBoundingBox();
        return bbox.bottom > bbox.top;
    });
    readonly #crazy: Readable<boolean> = computed(() => {
        const bbox = this.getBoundingBox();
        return bbox.left > bbox.right;
    });

    constructor(elementOrId: string | E, elementDOM: ElementDOM<E, T>, viewDOM: ViewDOM<T>, viewFactory: ViewFactory<T>, options: GraphicsBoardOptions = {}) {
        this.#elementDOM = elementDOM;
        this.#viewDOM = viewDOM;

        const container = get_container(elementOrId, elementDOM);
        const container_id = get_container_id(elementOrId, elementDOM);

        this.#viewBox = new Group(this, [], { id: `${container_id}-viewbox` });
        this.#disposables.push(this.#viewBox);

        if (typeof options.boundingBox === "object") {
            const left = default_number(options.boundingBox.left, -1);
            const top = default_number(options.boundingBox.top, 1);
            const right = default_number(options.boundingBox.right, 1);
            const bottom = default_number(options.boundingBox.bottom, -1);
            this.#boundingBox.set({ left, top, right, bottom });
        }

        this.#scene = new Group(this, [], { id: `${container_id}-scene` });
        this.#viewBox.add(this.#scene);

        if (viewFactory) {
            this.#view = viewFactory.createView(this.#viewBox, container_id);
            if (typeof this.#view.domElement === "undefined" || this.#view.domElement === null) {
                throw new Error("view.domElement must be defined");
            }
        } else {
            throw new Error("viewFactory must be defined");
        }

        const config: BoardConfig<E> = config_from_options(container);

        this.#fitter = new Fitter(this, elementDOM, this.#view, this.#viewDOM);

        if (container) {
            this.#fitter.set_target(container);
            this.#fitter.subscribe();
            this.#fitter.resize();
        }

        if (container) {
            this.appendTo(container);
        }

        if (config.size) {
            this.#view.setSize(config.size, this.ratio);
        }

        // Why do we need to create this subscription to the view?
        this.#disposables.push(
            effect(() => {
                const width = this.#view.width;
                const height = this.#view.height;
                this.width = width;
                this.height = height;
                this.#update_view_box();
                this.#size.set({ width, height });
            })
        );
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
        const LR = right - left;
        const TB = bottom - top;
        // By computing the absolute values it is manifest that we are not introducing inversions.
        const sx = Δx / Math.abs(LR);
        const sy = Δy / Math.abs(TB);
        const x = (-left * Δx) / LR;
        const y = (-top * Δy) / TB;
        this.#viewBox.X.set(x, y);
        this.#viewBox.sx = sx;
        this.#viewBox.sy = sy;
        if (this.goofy) {
            if (this.crazy) {
                // crazy and goofy Coordinate System.
                this.#viewBox.R.rotorFromAngle(-Math.PI / 2);
            } else {
                // SVG Coordinate System.
            }
        } else {
            if (this.crazy) {
                // crazy but not goofy Coordinate System.
                this.#viewBox.R.rotorFromAngle(Math.PI);
            } else {
                // Cartesian Coordinate System.
                this.#viewBox.R.rotorFromAngle(+Math.PI / 2);
            }
        }
    }

    get goofy(): boolean {
        return this.#goofy.get();
    }
    /*
    set goofy(goofy: boolean) {
        if (typeof goofy === 'boolean') {
            if (goofy) {
                if (!this.goofy) {
                    const bbox = this.getBoundingBox();
                    const left = bbox.left;
                    const top = bbox.top;
                    const right = bbox.right;
                    const bottom = bbox.bottom;
                    this.#boundingBox.set({ left, top: bottom, right, bottom: top });
                }
            }
            else {
                if (this.goofy) {
                    const bbox = this.getBoundingBox();
                    const left = bbox.left;
                    const top = bbox.top;
                    const right = bbox.right;
                    const bottom = bbox.bottom;
                    this.#boundingBox.set({ left, top: bottom, right, bottom: top });
                }
            }
        }
    }
    */
    get crazy(): boolean {
        return this.#crazy.get();
    }
    /*
    set crazy(crazy: boolean) {
        if (typeof crazy === 'boolean') {
            if (crazy) {

            }
            else {

            }
        }
    }
    */

    get frameCount(): number {
        return this.#frameCount.get();
    }

    get sx(): number {
        return this.#viewBox.sx;
    }
    set sx(sx: number) {
        this.#viewBox.sx = sx;
    }

    get sy(): number {
        return this.#viewBox.sy;
    }
    set sy(sy: number) {
        this.#viewBox.sy = sy;
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

    appendTo(container: E): this {
        if (container) {
            if (this.#view.domElement) {
                this.#elementDOM.appendChild(container, this.#view.domElement);
            } else {
                throw new Error("view.domElement must be defined");
            }
            if (!this.#fitter.is_target_body()) {
                this.#fitter.set_target(container);
            }
            this.update();
        }
        return this;
    }

    getBoundingBox(): Readonly<{
        left: number;
        top: number;
        right: number;
        bottom: number;
    }> {
        return this.#boundingBox.get();
    }

    /**
     * A number representing how much time has elapsed since the last frame in milliseconds.
     */
    getElapsedTime(fractionalDigits = 3): number | null {
        if (typeof this.#prev_now === "number") {
            return parseFloat((this.#curr_now - this.#prev_now).toFixed(fractionalDigits));
        } else {
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

    circle(options: CircleOptions = {}): Circle {
        const circle = new Circle(this, options);
        this.add(circle);
        return circle;
    }

    ellipse(options: EllipseOptions = {}): Ellipse {
        const ellipse = new Ellipse(this, options);
        this.add(ellipse);
        return ellipse;
    }

    line(point1: VectorLike, point2: VectorLike, options: LineOptions = {}): Line {
        const line = new Line(this, point1, point2, options);
        this.add(line);
        return line;
    }

    point(position: VectorLike, options: PointOptions = {}): Point {
        const point = new Point(this, position, options);
        this.add(point);
        return point;
    }

    polygon(points: VectorLike[] = [], options: PolygonOptions = {}): Polygon {
        const polygon = new Polygon(this, points, options);
        this.add(polygon);
        return polygon;
    }

    rectangle(options: RectangleOptions = {}): Rectangle {
        const shape = new Rectangle(this, options);
        this.add(shape);
        return shape;
    }

    text(message: string, options: TextOptions = {}): Text {
        const text = new Text(this, message, options);
        this.add(text);
        return text;
    }

    arrow(axis: VectorLike, options: ArrowOptions = {}): Arrow {
        const arrow = new Arrow(this, axis, options);
        this.add(arrow);
        return arrow;
    }

    curve(closed: boolean, points: (Anchor | G20 | [x: number, y: number])[], options: PathOptions = {}): Path {
        const curved = true;
        options.fillColor = default_color(options.fillColor, closed ? "none" : "gray");
        options.strokeColor = default_color(options.strokeColor, "gray");
        options.strokeWidth = closed ? default_closed_path_stroke_width(options.strokeWidth, this) : default_open_path_stroke_width(options.strokeWidth, this);
        const curve = new Path(this, points_to_anchors(points), closed, curved, false, options);
        this.add(curve);
        return curve;
    }

    path(closed: boolean, points: (Anchor | G20 | [x: number, y: number])[], options: PathOptions = {}): Path {
        options.fillColor = default_color(options.fillColor, closed ? "none" : "none");
        options.strokeColor = default_color(options.strokeColor, "gray");
        options.strokeWidth = closed ? default_closed_path_stroke_width(options.strokeWidth, this) : default_open_path_stroke_width(options.strokeWidth, this);
        const path = new Path(this, points_to_anchors(points), closed, false, false, options);
        this.add(path);
        return path;
    }

    arc(options: ArcSegmentOptions = {}): ArcSegment {
        const arcSegment = new ArcSegment(this, options);
        this.add(arcSegment);
        return arcSegment;
    }

    group(...shapes: Shape[]): Group {
        const group = new Group(this, shapes);
        this.add(group);
        return group;
    }
}

class Fitter<E, T> {
    readonly #board: GraphicsBoard<E, T>;
    readonly #elementDOM: ElementDOM<E, T>;
    readonly #view: View<T>;
    readonly #viewDOM: ViewDOM<T>;
    readonly #domElement: T;
    #target: E | null = null;
    #target_resize: Disposable | null = null;
    constructor(board: GraphicsBoard<E, T>, elementDOM: ElementDOM<E, T>, view: View<T>, viewDOM: ViewDOM<T>) {
        this.#board = board;
        if (elementDOM) {
            this.#elementDOM = elementDOM;
        } else {
            throw new Error("elementDOM must be defined");
        }
        this.#view = view;
        this.#viewDOM = viewDOM;
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
        this.#elementDOM.addEventListener(this.#target, "resize", callback);
        const cleanup = () => {
            this.#elementDOM.removeEventListener(this.#target, "resize", callback);
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
    set_target(target: E): this {
        this.#target = target;
        if (this.is_target_body()) {
            // TODO: The controller should take care of this...
            document.body.style["overflow"] = "hidden";
            document.body.style.margin = "0";
            document.body.style.padding = "0";
            document.body.style.top = "0";
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.bottom = "0";
            document.body.style.position = "fixed";

            // TODO: The controller should take care of this...
            this.#viewDOM.setStyle(this.#domElement, "display", "block");
            this.#viewDOM.setStyle(this.#domElement, "top", "0");
            /*
            this.#domElement.style.left = '0';
            this.#domElement.style.right = '0';
            this.#domElement.style.bottom = '0';
            this.#domElement.style.position = 'fixed';
            */
        }
        return this;
    }
    is_target_body(): boolean {
        return this.#elementDOM.isDocumentBody(this.#target);
    }
    resize(): void {
        const board = this.#board;
        const size = this.#elementDOM.getBoundingClientRect(this.#target);

        board.width = size.width;
        board.height = size.height;

        this.#view.setSize(size, board.ratio);
    }
}

interface BoardConfig<E> {
    resizeTo?: E;
    size?: { width: number; height: number };
}

function config_from_options<E>(container: E): BoardConfig<E> {
    const config: BoardConfig<E> = {
        resizeTo: compute_config_resize_to(container),
        size: compute_config_size(container),
    };
    return config;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function compute_config_resize_to<E>(container: E): E | null {
    /*
    if (options.resizeTo) {
        return options.resizeTo;
    }
    */
    return container;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function compute_config_size<E>(container: E): { width: number; height: number } | null {
    if (container) {
        return null;
    } else {
        return { width: 640, height: 480 };
    }
}

function get_container<E, T>(elementOrId: string | E, elementDOM: ElementDOM<E, T>): E {
    if (typeof elementOrId === "string") {
        return elementDOM.getElementById(elementOrId);
    } else {
        return elementOrId;
    }
}

function get_container_id<E, T>(elementOrId: string | E, elementDOM: ElementDOM<E, T>): string | null {
    if (typeof elementOrId === "string") {
        return elementOrId;
    } else {
        if (elementDOM) {
            return elementDOM.getAttribute(elementOrId, "id");
        } else {
            return null;
        }
    }
}

function points_to_anchors(points: (Anchor | G20 | [x: number, y: number])[]): Anchor[] {
    const anchors: Anchor[] = [];
    const N = points.length;
    for (let i = 0; i < N; i++) {
        const point = points[i];
        if (point instanceof Anchor) {
            anchors.push(point);
        } else if (point instanceof G20) {
            anchors.push(new Anchor(point, i === 0 ? "M" : "L"));
        } else if (Array.isArray(point)) {
            anchors.push(new Anchor(point, i === 0 ? "M" : "L"));
        } else {
            throw new Error();
        }
    }
    return anchors;
}
