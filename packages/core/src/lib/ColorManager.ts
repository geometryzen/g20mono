import { signal, State } from "@g20/reactive";
import { Color, ColorProvider, is_color_provider } from "./effects/ColorProvider";
import { ViewDOM } from "./ViewDOM";

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
    #svg: unknown | null = null;
    #viewDOM: ViewDOM<unknown> | null = null;
    /**
     * The SVG element with the 'fill' or 'stroke' property.
     */
    #hostElement: unknown;
    /**
     *
     * @param initialValue
     * @param name
     */
    constructor(
        initialValue: Color,
        readonly name: "fill" | "stroke"
    ) {
        this.#color = signal(initialValue);
    }
    get(): Color {
        return this.#color.get();
    }
    set(newColor: Color) {
        const oldColor = this.#color.get();
        if (newColor !== oldColor) {
            if (is_color_provider(oldColor)) {
                if (this.#svg) {
                    oldColor.decrementUse(this.#viewDOM, this.#viewDOM.getElementDefs(this.#svg));
                } else {
                    this.#olds.push(oldColor);
                }
            }
            if (is_color_provider(newColor)) {
                if (this.#svg) {
                    newColor.incrementUse(this.#viewDOM, this.#viewDOM.getElementDefs(this.#svg));
                } else {
                    this.#news.push(newColor);
                }
            }
            this.#color.set(newColor);
        }
    }
    use<T>(viewDOM: ViewDOM<T>, svgElement: unknown, hostElement: unknown): void {
        this.#viewDOM = viewDOM;
        this.#svg = svgElement;
        this.#hostElement = hostElement;
        const defs = this.#viewDOM.getElementDefs(svgElement);
        for (const newColor of this.#news) {
            newColor.incrementUse(this.#viewDOM, defs);
        }
        this.#news.length = 0;
        for (const oldColor of this.#olds) {
            oldColor.decrementUse(this.#viewDOM, defs);
        }
        this.#olds.length = 0;
    }
    update(): void {
        const color = this.#color.get();
        if (typeof color === "string") {
            this.#viewDOM.setAttribute(this.#hostElement, this.name, color);
        } else if (is_color_provider(color)) {
            this.#viewDOM.setAttribute(this.#hostElement, this.name, color.serialize());
        } else {
            this.#viewDOM.removeAttribute(this.#hostElement, this.name);
        }
    }
}
