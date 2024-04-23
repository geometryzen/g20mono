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

export function serialize_color(x: Color): string {
    if (is_color_provider(x)) {
        return `url(#${x.id})`;
    }
    else {
        return x;
    }
}
