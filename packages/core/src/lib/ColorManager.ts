import { state, State } from "g2o-reactive";
import { Color, ColorProvider, is_color_provider, serialize_color } from "./effects/ColorProvider";
import { get_svg_element_defs } from "./renderers/SVGView";

/**
 * Helps to keep fillColor and strokeColor code DRY as well as defining the protocol
 * fo interacting with ColorProvider(s).
 */
export class ColorManager {
    /**
     * Keep track of color providers that have pending addRef.
     */
    readonly #news: ColorProvider[] = [];
    /**
     * Keep track of color providers that have pending release.
     */
    readonly #olds: ColorProvider[] = [];
    readonly #color: State<Color>;
    #svg: SVGElement | null = null;
    /**
     * The SVG element with the 'fill' or 'stroke' property.
     */
    #hostElement: HTMLElement | SVGElement;
    /**
     * 
     * @param initialValue 
     * @param qualifiedName 
     */
    constructor(initialValue: Color, readonly qualifiedName: 'fill' | 'stroke') {
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
                    oldColor.release(get_svg_element_defs(this.#svg));
                }
                else {
                    this.#olds.push(oldColor);
                }
            }
            if (is_color_provider(newColor)) {
                if (this.#svg) {
                    newColor.addRef(get_svg_element_defs(this.#svg));
                }
                else {
                    this.#news.push(newColor);
                }
            }
            this.#color.set(newColor);
        }
    }
    use(svgElement: SVGElement, hostElement: HTMLElement | SVGElement): void {
        this.#svg = svgElement;
        this.#hostElement = hostElement;
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
        if (color/* && color != defaultValue(this.qualifiedName)*/) {
            this.#hostElement.setAttribute(this.qualifiedName, serialize_color(color));
        }
        else {
            this.#hostElement.removeAttribute(this.qualifiedName);
        }
    }
}
