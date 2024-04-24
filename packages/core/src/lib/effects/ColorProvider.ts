import { Observable } from '../reactive/Observable';

export interface ColorProvider {
    readonly id: string;
    readonly change$: Observable<unknown>;
    render(svgElement: SVGElement): this;
}

export type Color = string | ColorProvider;

export function is_color_provider(x: Color): x is ColorProvider {
    if (typeof x === 'string') {
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
        return `url(#${color.id})`;
    }
    else {
        return color;
    }
}
