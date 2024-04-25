import { state, State } from "g2o-reactive";
import { Color, is_color_provider, serialize_color } from "./effects/ColorProvider";
import { svg, SVGAttributes } from "./renderers/SVGView";

export class ColorManager {
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
                oldColor.release();
            }
            if (is_color_provider(newColor)) {
                newColor.use(this.#svg);
                newColor.addRef();
            }
            this.#color.set(newColor);
        }
    }
    use(svgElement: SVGElement, elem: HTMLElement | SVGElement): void {
        this.#svg = svgElement;
        this.#elem = elem;
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