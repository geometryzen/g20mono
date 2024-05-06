
/**
 * Abstraction of a Gradient or Texture.
 */
export interface ColorProvider {
    /**
     * The identifier provides a reference for the consuming colored shape.
     */
    readonly id: string;
    /**
     * Indicates to the ColorProvider that it is being used in one more fill or stroke property.
     * The ColorProvider is expected to add itself to the SVG defs element when being used.
     */
    addRef(defs: SVGDefsElement): void;
    /**
     * Indicates to the ColorProvider that it is being used in one less fill or stroke property.
     * The ColorProvider is expected to remove itself from the SVG defs element when no longer used.
     */
    release(defs: SVGDefsElement): void;
    /**
     * Provide the value that will be used in the `fill` or `stroke` attribute of the consuming element.
     * Usually url(#${this.id}) for gradients and textures but may e.g. an rgb() or #RRGGBB value. 
     */
    // serialize(): string;
}

export type Color = string | ColorProvider;

export function is_color_provider(x: Color): x is ColorProvider {
    if (typeof x === 'string') {
        return false;
    }
    else if (x === null) {
        return false;
    }
    else if (Array.isArray(x)) {
        return false;
    }
    else if (typeof x === 'object') {
        return true;
    }
    else {
        return false;
    }
}

export function is_color(x: unknown): x is Color {
    if (is_color_provider(x as Color)) {
        return true;
    }
    else if (typeof x === 'string') {
        return true;
    }
    else {
        return false;
    }
}

/**
 * If the color is a color provider then the returned value is `url(#id)`, otherwise it's the color itself.
 */
export function serialize_color(color: Color): string {
    if (is_color_provider(color)) {
        // TODO: If the ColorProvider were responsible for providing the URL, then ordinary
        // colors as string could implement ColorProvider.
        return `url(#${color.id})`;
    }
    else {
        return color;
    }
}
