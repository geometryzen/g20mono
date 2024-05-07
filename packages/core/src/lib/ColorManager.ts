import { state, State } from "g2o-reactive";
import { Color, ColorProvider, is_color_provider } from "./effects/ColorProvider";
import { ShapeHost } from "./Shape";

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
    #shapeHost: ShapeHost | null = null;
    /**
     * The SVG element with the 'fill' or 'stroke' property.
     */
    #hostElement: unknown;
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
                    oldColor.decrementUse(this.#shapeHost, this.#shapeHost.getElementDefs(this.#svg));
                }
                else {
                    this.#olds.push(oldColor);
                }
            }
            if (is_color_provider(newColor)) {
                if (this.#svg) {
                    newColor.incrementUse(this.#shapeHost, this.#shapeHost.getElementDefs(this.#svg));
                }
                else {
                    this.#news.push(newColor);
                }
            }
            this.#color.set(newColor);
        }
    }
    use(shapeHost: ShapeHost, svgElement: unknown, hostElement: unknown): void {
        this.#shapeHost = shapeHost;
        this.#svg = svgElement;
        this.#hostElement = hostElement;
        const defs = this.#shapeHost.getElementDefs(svgElement);
        for (const newColor of this.#news) {
            newColor.incrementUse(this.#shapeHost, defs);
        }
        this.#news.length = 0;
        for (const oldColor of this.#olds) {
            oldColor.decrementUse(this.#shapeHost, defs);
        }
        this.#olds.length = 0;
    }
    update(): void {
        const color = this.#color.get();
        if (typeof color === 'string') {
            this.#shapeHost.setAttribute(this.#hostElement, this.qualifiedName, color);
        }
        else if (is_color_provider(color)) {
            this.#shapeHost.setAttribute(this.#hostElement, this.qualifiedName, color.serialize());
        }
        else {
            this.#shapeHost.removeAttribute(this.#hostElement, this.qualifiedName);
        }
    }
}
