import { Observable } from '../reactive/Observable';
export interface ColorProvider {
    readonly id: string;
    readonly change$: Observable<unknown>;
    render(svgElement: SVGElement): this;
}
export type Color = string | ColorProvider;
export declare function is_color_provider(x: Color): x is ColorProvider;
export declare function serialize_color(x: Color): string;
