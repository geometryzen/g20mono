import { G20 } from "./math/G20";
import { Matrix } from "./math/Matrix";
import { Disposable } from './reactive/Disposable';

/**
 *
 */
export interface Shape extends Disposable {
    id: string;
    classList: string[];
    parent: unknown;
    get matrix(): Matrix;
    X: G20;
    R: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
    getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    hasBoundingBox(): boolean;
    render(parentElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
}