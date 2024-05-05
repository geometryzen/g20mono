import { G20 } from "./math/G20";

/**
 * TODO: rename to Shape when the hierarchy has been flattened.
 */
export interface IShape<P> {
    id: string;
    classList: string[];
    parent: P;
    X: G20;
    R: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
    getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    // const regex = /texture|gradient/i;
    // regex.test(child._renderer.type)
    hasBoundingBox(): boolean;
}