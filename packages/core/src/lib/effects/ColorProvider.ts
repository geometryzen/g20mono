import { ViewDOM } from "../Shape";

/**
 * Abstraction of a Gradient or Texture.
 */
export interface ColorProvider {
    /**
     * Indicates to the ColorProvider that it is being used in one more fill or stroke property.
     * The ColorProvider is expected to add itself to the SVG defs element when being used.
     */
    incrementUse<T>(viewDOM: ViewDOM<T>, defs: T): void;
    /**
     * Indicates to the ColorProvider that it is being used in one less fill or stroke property.
     * The ColorProvider is expected to remove itself from the SVG defs element when no longer used.
     */
    decrementUse<T>(viewDOM: ViewDOM<T>, defs: T): void;
    /**
     * Provide the value that will be used in the `fill` or `stroke` attribute of the consuming element.
     * Usually url(#${this.id}) for gradients and textures but may be e.g. an rgb() or #RRGGBB value.
     */
    serialize(): string;
}

export type Color = string | ColorProvider;

export function is_color_provider(x: Color): x is ColorProvider {
    if (typeof x === "string") {
        return false;
    } else if (x === null) {
        return false;
    } else if (Array.isArray(x)) {
        return false;
    } else if (typeof x === "object") {
        const duck = x as ColorProvider;
        return typeof duck.serialize === "function" && typeof duck.incrementUse === "function" && typeof duck.decrementUse === "function";
    } else {
        return false;
    }
}

export function is_color(x: unknown): x is Color {
    if (is_color_provider(x as Color)) {
        return true;
    } else if (typeof x === "string") {
        return true;
    } else {
        return false;
    }
}
