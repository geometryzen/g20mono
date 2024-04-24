import { effect, state } from "g2o-reactive";
import { Color, is_color_provider, serialize_color } from "./effects/ColorProvider";
import { Flag } from "./Flag";
import { IBoard } from "./IBoard";
import { G20 } from "./math/G20";
import { Disposable } from './reactive/Disposable';
import { get_svg_element_defs, set_defs_dirty_flag, svg, SVGAttributes } from "./renderers/SVGView";
import { PositionLike, Shape, ShapeAttributes } from "./Shape";

export interface ColoredShapeAttributes extends ShapeAttributes {
    attitude?: G20;
    position?: PositionLike,
    id?: string;
    fill?: Color;
    fillOpacity?: number;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export abstract class ColoredShape extends Shape {
    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    readonly #fill = state('#000000' as Color);
    #fill_change: Disposable | null = null;
    readonly #fillOpacity = state(1.0);

    /**
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    readonly #stroke = state('none' as Color);
    #stroke_change: Disposable | null = null;
    readonly #strokeWidth = state(1);
    readonly #strokeOpacity = state(1.0);

    constructor(board: IBoard, attributes: ColoredShapeAttributes = {}) {
        super(board, shape_attribs_from_colored_attribs(attributes));
    }

    /*
    automatic: boolean;
    beginning: number;
    cap: "butt" | "round" | "square";
    closed: boolean;
    curved: boolean;
    ending: number;
    fill: Color;
    join: "round" | "arcs" | "bevel" | "miter" | "miter-clip";
    length: number;
    strokeWidth: number;
    miter: number;
    stroke: Color;
    */
    get fill(): Color {
        return this.#fill.get();
    }
    set fill(fill: Color) {
        if (this.#fill_change) {
            this.#fill_change.dispose();
            this.#fill_change = null;
        }

        this.#fill.set(fill);
        this.zzz.flags[Flag.Fill] = true;

        if (is_color_provider(fill)) {
            this.#fill_change = fill.change$.subscribe(() => {
                this.zzz.flags[Flag.Fill] = true;
            });
        }
    }
    get fillOpacity(): number {
        return this.#fillOpacity.get();
    }
    set fillOpacity(fillOpacity: number) {
        this.#fillOpacity.set(fillOpacity);
    }
    get stroke(): Color {
        return this.#stroke.get();
    }
    set stroke(stroke: Color) {
        if (this.#stroke_change) {
            this.#stroke_change.dispose();
            this.#stroke_change = null;
        }
        this.#stroke.set(stroke);
        this.zzz.flags[Flag.Stroke] = true;
        if (is_color_provider(this.stroke)) {
            this.#stroke_change = this.stroke.change$.subscribe(() => {
                this.zzz.flags[Flag.Stroke] = true;
            });
        }
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
        if (typeof strokeWidth === 'number') {
            this.#strokeWidth.set(strokeWidth);
        }
    }
    /**
     * A convenience method for setting the `fill` attribute to "none".
     */
    noFill(): this {
        this.fill = 'none';
        return this;
    }

    /**
     * A convenience method for setting the `stroke` attribute to "none".
     */
    noStroke(): this {
        this.stroke = 'none';
        return this;
    }
    override render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void {
        // The derived class determines the element.
        if (this.zzz.elem) {

            // fill
            this.zzz.disposables.push(effect(() => {
                const fill = this.fill;
                const change: SVGAttributes = {};
                change.fill = serialize_color(fill);
                svg.setAttributes(this.zzz.elem, change);

                if (this.zzz.hasFillEffect && typeof fill === 'string') {
                    set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                    delete this.zzz.hasFillEffect;
                }

                return function () {
                    // No cleanup to be done.
                };
            }));

            // fill-opacity
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change['fill-opacity'] = `${this.fillOpacity}`;
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // stroke
            this.zzz.disposables.push(effect(() => {
                const stroke = this.stroke;
                if (stroke) {
                    if (is_color_provider(stroke)) {
                        this.zzz.hasStrokeEffect = true;
                        stroke.render(svgElement);
                    }
                    const change: SVGAttributes = {};
                    change.stroke = serialize_color(stroke);
                    svg.setAttributes(this.zzz.elem, change);

                    if (this.zzz.hasStrokeEffect && typeof stroke === 'string') {
                        set_defs_dirty_flag(get_svg_element_defs(svgElement), true);
                        delete this.zzz.hasStrokeEffect;
                    }
                }
                else {
                    const change: SVGAttributes = {};
                    change.stroke = serialize_color(stroke);
                    svg.removeAttributes(this.zzz.elem, change);
                }

                return function () {
                    // No cleanup to be done.
                };
            }));

            // stroke-opacity
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change['stroke-opacity'] = `${this.strokeOpacity}`;
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            // stroke-width
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change['stroke-width'] = `${this.strokeWidth}`;
                svg.setAttributes(this.zzz.elem, change);
                return function () {
                    // No cleanup to be done.
                };
            }));

            super.render(domElement, svgElement);
        }
        else {
            throw new Error();
        }
    }
}


function shape_attribs_from_colored_attribs(attributes: ColoredShapeAttributes): Partial<ShapeAttributes> {
    const retval: Partial<ShapeAttributes> = {
        id: attributes.id,
        compensate: attributes.compensate,
        attitude: attributes.attitude,
        position: attributes.position,
        visibility: attributes.visibility
    };
    return retval;
}
