import { G20 } from "./math/G20";

/**
 * TODO: rename to Shape when the hierarchy has been flattened.
 */
export interface IShape<P> {
    id: string;
    automatic: boolean;
    beginning: number;
    classList: string[];
    ending: number;
    length: number;
    parent: P;
    position: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
    getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    // const regex = /texture|gradient/i;
    // regex.test(child._renderer.type)
    hasBoundingBox(): boolean;
    subdivide(limit: number): this;
}