import { G20 } from "./math/G20";
import { Matrix } from "./math/Matrix";
import { Disposable } from './reactive/Disposable';

/**
 * A more specific representation of the attributes that are permitted on SVG elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 * The value of all attributes MUST be string.
 */
export interface SVGAttributes {
    [name: string]: string;
    'class'?: string;
    'clip-rule'?: 'nonzero' | 'evenodd' | 'inherit';
    'cx'?: string;
    'cy'?: string;
    /**
     * Defines the path to be drawn as a list of path commands and their parameters.
     */
    'd'?: string;
    'direction'?: 'ltr' | 'rtl';
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
     */
    'dominant-baseline'?: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    'dx'?: string;
    'dy'?: string;
    'fill'?: string;
    'fill-opacity'?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: 'normal' | 'italic' | 'oblique';
    'font-weight'?: 'normal' | 'bold' | 'bolder' | 'lighter' | string;
    'fx'?: string;
    'fy'?: string;
    'gradientUnits'?: 'userSpaceOnUse' | 'objectBoundingBox';
    'height'?: string;
    'href'?: string;
    'id'?: string;
    'line-height'?: string;
    /**
     * TODO: offset is not a documented SVG attribute. How do we account for it?
     */
    'offset'?: string;
    'opacity'?: string;
    'text-anchor'?: 'start' | 'middle' | 'end';
    'r'?: string;
    'spreadMethod'?: 'pad' | 'reflect' | 'repeat';
    'stop-color'?: string;
    'stop-opacity'?: string;
    'stroke'?: string;
    'stroke-dasharray'?: string;
    'stroke-dashoffset'?: string;
    'stroke-linecap'?: 'butt' | 'round' | 'square';
    'stroke-linejoin'?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    'stroke-miterlimit'?: string;
    'stroke-opacity'?: string;
    'stroke-width'?: string;
    'text-decoration'?: string;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
     */
    'transform'?: string;
    'vector-effect'?: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position';
    'visibility'?: 'visible' | 'hidden' | 'collapse';
    'width'?: string;
    'x'?: string;
    'x1'?: string;
    'x2'?: string;
    'y'?: string;
    'y1'?: string;
    'y2'?: string;
}

export interface ViewDOM<T> {
    /**
     * A runtime typesafe assertion that the element has the type required. 
     */
    downcast(element: unknown): T;
    createSVGElement(name: string, attributes: { [name: string]: string }): T;
    setAttribute(element: T, name: string, value: string): void;
    setAttributes(element: T, attributes: { [name: string]: string }): void;
    removeAttribute(element: T, name: string): void;
    removeAttributes(element: T, attributes: { [name: string]: string }): void;
    appendChild(parent: T, child: T): void;
    removeChild(parent: T, child: T): void;
    setTextContent(element: T, content: string): void;
    getParentNode(element: T): T | null;
    getLastChild(element: T): T | null;
    getElementDefs(svg: T): T;
    setStyle(element: T, name: 'display' | 'overflow' | 'top', value: string): void;
}

/**
 *
 */
export interface Shape extends Disposable {
    id: string | null;
    parent: unknown;
    get matrix(): Matrix;
    get X(): G20;
    set X(X: G20 | [x: number, y: number] | { x: number, y: number });
    get R(): G20;
    set R(R: G20);
    sx: number;
    sy: number;
    skewX: number;
    skewY: number;
    opacity: number;
    visibility: 'visible' | 'hidden' | 'collapse';
    collapse(): this;
    getBoundingBox(shallow?: boolean): { top?: number; left?: number; right?: number; bottom?: number };
    hasBoundingBox(): boolean;
    hide(): this;
    render<T>(viewDOM: ViewDOM<T>, parentElement: T, svgElement: T): void;
    viewee(): unknown;
    show(): this;
}