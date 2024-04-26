import { state, State } from "g2o-reactive";
import { Color, ColorProvider, is_color_provider, serialize_color } from "./effects/ColorProvider";
import { get_svg_element_defs, svg, SVGAttributes } from "./renderers/SVGView";

export class ColorManager {
    /**
     * Keep track of color providers that must be informed
     */
    readonly #news: ColorProvider[] = [];
    /**
     * Keep track of color providers that must be release.
     */
    readonly #olds: ColorProvider[] = [];
    readonly #color: State<Color>;
    #svg: SVGElement | null = null;
    #elem: HTMLElement | SVGElement;
    constructor(initialValue: Color, readonly which: 'fill' | 'stroke') {
        this.#color = state(initialValue);
    }
    get(): Color {
        return this.#color.get();
    }
    set(newColor: Color) {
        const oldColor = this.#color.get();
        if (newColor !== oldColor) {
            if (is_color_provider(oldColor)) {
                if (this.#svg) {
                    const defs: SVGDefsElement = get_svg_element_defs(this.#svg);
                    oldColor.release(defs);
                }
                else {
                    this.#olds.push(oldColor);
                }
            }
            if (is_color_provider(newColor)) {
                if (this.#svg) {
                    const defs: SVGDefsElement = get_svg_element_defs(this.#svg);
                    newColor.addRef(defs);
                }
                else {
                    this.#news.push(newColor);
                }
            }
            this.#color.set(newColor);
        }
    }
    use(svgElement: SVGElement, elem: HTMLElement | SVGElement): void {
        this.#svg = svgElement;
        this.#elem = elem;
        const defs: SVGDefsElement = get_svg_element_defs(svgElement);
        for (const newColor of this.#news) {
            newColor.addRef(defs);
        }
        this.#news.length = 0;
        for (const oldColor of this.#olds) {
            oldColor.release(defs);
        }
        this.#olds.length = 0;
    }
    update(): void {
        const color = this.#color.get();
        if (color) {
            const change: SVGAttributes = {};
            change[this.which] = serialize_color(color);
            svg.setAttributes(this.#elem, change);
        }
        else {
            const change: SVGAttributes = {};
            change[this.which] = serialize_color(color);
            svg.removeAttributes(this.#elem, change);
        }
    }
}