
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
        throw new Error();
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
