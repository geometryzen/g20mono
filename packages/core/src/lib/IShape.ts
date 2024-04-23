import { Child } from "./children";
import { Color } from "./effects/ColorProvider";
import { G20 } from "./math/G20";

/**
 * TODO: rename to Shape when the hierarchy has been flattened.
 */
export interface IShape<P> extends Child {
    automatic: boolean;
    beginning: number;
    cap: 'butt' | 'round' | 'square';
    classList: string[];
    closed: boolean;
    curved: boolean;
    ending: number;
    fill: Color;
    join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    length: number;
    strokeWidth: number;
    miter: number;
    parent: P;
    position: G20;
    stroke: Color;
    visibility: 'visible' | 'hidden' | 'collapse';
    getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    // const regex = /texture|gradient/i;
    // regex.test(child._renderer.type)
    hasBoundingBox(): boolean;
    noFill(): this;
    noStroke(): this;
    subdivide(limit: number): this;
}