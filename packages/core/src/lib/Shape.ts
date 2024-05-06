import { G20 } from "./math/G20";

/**
 *
 */
export interface Shape {
    id: string;
    classList: string[];
    parent: unknown;
    X: G20;
    R: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
    getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    hasBoundingBox(): boolean;
}