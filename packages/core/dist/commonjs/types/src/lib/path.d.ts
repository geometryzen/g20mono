import { Anchor } from './anchor';
import { Collection } from './collection';
import { Color } from './effects/ColorProvider';
import { IBoard } from './IBoard';
import { G20 } from './math/G20.js';
import { PositionLike, Shape } from './Shape';
export declare function get_dashes_offset(dashes: number[]): number | undefined;
export declare function set_dashes_offset(dashes: number[], offset: number): void;
export interface PathAttributes {
    attitude: G20;
    id: string;
    opacity: number;
    position: PositionLike;
    visibility: 'visible' | 'hidden' | 'collapse';
    /**
     * The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    fill: Color;
    fillOpacity: number;
    /**
     * The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    stroke: Color;
    strokeWidth: number;
    strokeOpacity: number;
}
export declare class Path extends Shape implements PathAttributes {
    #private;
    /**
     * @param vertices A list of {@link Anchor}s that represent the order and coordinates to construct the rendered shape.
     * @param closed Describes whether the path is closed or open.
     * @param curved Describes whether the path automatically calculates bezier handles for each vertex.
     * @param manual Describes whether the developer controls how vertices are plotted.
     */
    constructor(board: IBoard, vertices?: Anchor[], closed?: boolean, curved?: boolean, manual?: boolean, attributes?: Partial<PathAttributes>);
    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
    /**
     * A convenience method for setting the `fill` attribute to "none".
     */
    noFill(): this;
    /**
     * A convenience method for setting the `stroke` attribute to "none".
     */
    noStroke(): this;
    corner(): this;
    center(): this;
    getBoundingBox(shallow?: boolean): {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    hasBoundingBox(): boolean;
    /**
     * TODO: Bad name. This function is called for its side effects which are to modify the Anchor.
     * Originally the function appears to promote a Vector and return an Anchor, but this is not used
     * and the call always involves an Anchor.
     * There is a return value but it is not being used.
     * @param t Percentage value describing where on the {@link Path} to estimate and assign coordinate values.
     * @param anchor - Object to apply calculated x, y to. If none available returns new `Object`.
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Path}'s curve.
     */
    getPointAt(t: number, anchor: Anchor): Anchor;
    /**
     * Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     */
    plot(): this;
    /**
     * Insert an anchor at the midpoint between every vertex.
     * @param limit - How many times to recurse subdivisions.
     */
    subdivide(limit: number): this;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get automatic(): boolean;
    set automatic(automatic: boolean);
    get beginning(): number;
    set beginning(beginning: number);
    /**
     * Defines the shape to be used at the end of open subpaths when they are stroked.
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
     */
    get cap(): 'butt' | 'round' | 'square';
    set cap(cap: 'butt' | 'round' | 'square');
    get closed(): boolean;
    set closed(closed: boolean);
    get curved(): boolean;
    set curved(curved: boolean);
    get dashes(): number[];
    set dashes(dashes: number[]);
    get ending(): number;
    set ending(ending: number);
    get fill(): Color;
    set fill(fill: Color);
    get fillOpacity(): number;
    set fillOpacity(fillOpacity: number);
    get join(): 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    set join(join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round');
    get length(): number;
    get lengths(): number[];
    get strokeWidth(): number;
    set strokeWidth(stroeWidth: number);
    get miter(): number;
    set miter(miter: number);
    get stroke(): Color;
    set stroke(stroke: Color);
    get strokeOpacity(): number;
    set strokeOpacity(strokeOpacity: number);
    get vertices(): Collection<Anchor>;
    set vertices(vertices: Collection<Anchor>);
    get vectorEffect(): 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position';
    set vectorEffect(vectorEffect: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position');
}
