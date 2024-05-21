import { effect, State, signal } from "@g20/reactive";
import { Board } from "./Board";
import { ColorManager } from "./ColorManager";
import { Color } from "./effects/ColorProvider";
import { Flag } from "./Flag";
import { SpinorLike, VectorLike } from "./math/G20";
import { ViewDOM } from "./Shape";
import { ShapeBase, ShapeOptions } from "./ShapeBase";

export interface ColoredShapeOptions extends ShapeOptions {
    position?: VectorLike;
    attitude?: SpinorLike;
    id?: string;
    dashes?: number[];
    fillColor?: Color;
    fillOpacity?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    sx?: number;
    sy?: number;
    vectorEffect?: null | "non-scaling-stroke" | "none";
    visibility?: "visible" | "hidden" | "collapse";
}

export abstract class ColoredShapeBase extends ShapeBase {
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    readonly #fillColor = new ColorManager(null, "fill");
    readonly #fillOpacity = signal(1.0);

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    readonly #strokeColor = new ColorManager(null, "stroke");
    readonly #strokeWidth = signal(1);
    readonly #strokeOpacity = signal(1.0);

    readonly #dashes: State<number[]> = signal([]);

    readonly #vectorEffect: State<null | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position" | "none"> = signal(null);

    constructor(board: Board, options: ColoredShapeOptions = {}) {
        super(board, shape_attribs_from_colored_attribs(options));

        if (Array.isArray(options.dashes)) {
            this.dashes = options.dashes;
        }

        if (options.fillColor) {
            this.fillColor = options.fillColor;
        }

        if (typeof options.fillOpacity === "number") {
            this.fillOpacity = options.fillOpacity;
        } else {
            this.fillOpacity = 1.0;
        }

        if (options.strokeColor) {
            this.strokeColor = options.strokeColor;
        }

        if (typeof options.strokeWidth === "number") {
            this.strokeWidth = options.strokeWidth;
        } else {
            this.strokeWidth = 1;
        }

        if (typeof options.strokeOpacity === "number") {
            this.strokeOpacity = options.strokeOpacity;
        } else {
            this.strokeOpacity = 1.0;
        }

        if (typeof options.vectorEffect === "string") {
            this.vectorEffect = options.vectorEffect;
        }
    }
    /**
     * Array of numbers. Odd indices represent dash length. Even indices represent dash space.
     * A list of numbers that represent the repeated dash length and dash space applied to the stroke of the text.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray} for more information on the SVG stroke-dasharray attribute.
     */
    get dashes(): number[] {
        return this.#dashes.get();
    }
    set dashes(dashes: number[]) {
        if (Array.isArray(dashes)) {
            this.#dashes.set(dashes);
        }
    }
    get fillColor(): Color {
        return this.#fillColor.get();
    }
    set fillColor(fill: Color) {
        this.#fillColor.set(fill);
        this.zzz.flags[Flag.Fill] = true;
    }
    get fillOpacity(): number {
        return this.#fillOpacity.get();
    }
    set fillOpacity(fillOpacity: number) {
        this.#fillOpacity.set(fillOpacity);
    }
    get strokeColor(): Color {
        return this.#strokeColor.get();
    }
    set strokeColor(stroke: Color) {
        this.#strokeColor.set(stroke);
        this.zzz.flags[Flag.Stroke] = true;
    }
    get strokeOpacity(): number {
        return this.#strokeOpacity.get();
    }
    set strokeOpacity(strokeOpacity: number) {
        this.#strokeOpacity.set(strokeOpacity);
    }
    get strokeWidth(): number {
        return this.#strokeWidth.get();
    }
    set strokeWidth(strokeWidth: number) {
        if (typeof strokeWidth === "number") {
            if (isNaN(strokeWidth)) {
                // Do nothing.
            } else {
                this.#strokeWidth.set(strokeWidth);
            }
        }
    }
    get vectorEffect(): null | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position" | "none" {
        return this.#vectorEffect.get();
    }
    set vectorEffect(vectorEffect: null | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position" | "none") {
        this.#vectorEffect.set(vectorEffect);
    }
    /**
     * A convenience method for setting the `fill` attribute to "none".
     */
    noFill(): this {
        this.fillColor = "none";
        return this;
    }

    /**
     * A convenience method for setting the `stroke` attribute to "none".
     */
    noStroke(): this {
        this.strokeColor = "none";
        return this;
    }
    override render<T>(viewDOM: ViewDOM<T>, parentElement: unknown, svgElement: unknown): void {
        // The derived class determines the element.
        if (this.zzz.viewee) {
            this.#fillColor.use(viewDOM, svgElement, this.zzz.viewee);
            this.#strokeColor.use(viewDOM, svgElement, this.zzz.viewee);

            // dashes
            this.zzz.disposables.push(
                effect(() => {
                    const dashes = this.dashes;
                    if (Array.isArray(dashes) && dashes.length > 0) {
                        viewDOM.setAttribute(this.zzz.viewee as T, "stroke-dasharray", this.dashes.join(" "));
                    } else {
                        viewDOM.removeAttribute(this.zzz.viewee as T, "stroke-dasharray");
                    }
                    return function () {
                        // No cleanup to be done.
                    };
                })
            );

            // fill
            this.zzz.disposables.push(
                effect(() => {
                    this.#fillColor.update();
                    return function () {
                        // No cleanup to be done.
                    };
                })
            );

            // fill-opacity
            this.zzz.disposables.push(
                effect(() => {
                    const fillOpacity = this.fillOpacity;
                    if (fillOpacity !== 1) {
                        viewDOM.setAttribute(this.zzz.viewee as T, "fill-opacity", `${fillOpacity}`);
                    } else {
                        viewDOM.removeAttribute(this.zzz.viewee as T, "fill-opacity");
                    }
                    return function () {
                        // No cleanup to be done.
                    };
                })
            );

            // stroke
            this.zzz.disposables.push(
                effect(() => {
                    this.#strokeColor.update();
                    return function () {
                        // No cleanup to be done.
                    };
                })
            );

            // stroke-opacity
            this.zzz.disposables.push(
                effect(() => {
                    const strokeOpacity = this.strokeOpacity;
                    if (strokeOpacity !== 1) {
                        viewDOM.setAttribute(this.zzz.viewee as T, "stroke-opacity", `${strokeOpacity}`);
                    } else {
                        viewDOM.removeAttribute(this.zzz.viewee as T, "stroke-opacity");
                    }
                    return function () {
                        // No cleanup to be done.
                    };
                })
            );

            // stroke-width
            this.zzz.disposables.push(
                effect(() => {
                    const strokeWidth = this.strokeWidth;
                    if (strokeWidth !== 1) {
                        viewDOM.setAttribute(this.zzz.viewee as T, "stroke-width", `${strokeWidth}`);
                    } else {
                        viewDOM.removeAttribute(this.zzz.viewee as T, "stroke-width");
                    }
                    return function () {
                        // No cleanup to be done.
                    };
                })
            );

            // vector-effect
            this.zzz.disposables.push(
                effect(() => {
                    const vectorEffect = this.vectorEffect;
                    if (typeof vectorEffect === "string") {
                        viewDOM.setAttribute(this.zzz.viewee as T, "vector-effect", `${vectorEffect}`);
                    } else {
                        viewDOM.removeAttribute(this.zzz.viewee as T, "vector-effect");
                    }
                    return function () {
                        // No cleanup to be done.
                    };
                })
            );

            super.render(viewDOM, parentElement, svgElement);
        } else {
            throw new Error();
        }
    }
}

function shape_attribs_from_colored_attribs(options: ColoredShapeOptions): Partial<ShapeOptions> {
    const retval: Partial<ShapeOptions> = {
        id: options.id,
        plumb: options.plumb,
        attitude: options.attitude,
        position: options.position,
        sx: options.sx,
        sy: options.sy,
        visibility: options.visibility,
    };
    return retval;
}
