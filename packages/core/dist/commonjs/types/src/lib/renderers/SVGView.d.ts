import { Anchor } from '../anchor';
import { Group } from '../group';
import { IBoard } from '../IBoard';
import { G20 } from '../math/G20';
import { Matrix } from '../matrix';
import { Shape } from '../Shape';
import { View } from './View';
type DOMElement = HTMLElement | SVGElement;
export declare function get_svg_element_defs(svg: SVGElement): SVGDefsElement;
/**
 * sets the "hidden" _flagUpdate property.
 */
export declare function set_defs_dirty_flag(defs: SVGDefsElement, dirtyFlag: boolean): void;
/**
 * Used to set attributes on SVG elements so the value MUST be a string.
 */
export type StylesMap = {
    [name: string]: string;
};
/**
 * A more specific representation of the attributes that are permitted on SVG elements.
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute
 * The value of all attributes MUST be string.
 */
export interface SVGAttributes {
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
/**
 * An de-serialized representation of SVGAttributes.
 */
export interface SVGProperties {
    'class'?: string;
    'cx'?: number;
    'cy'?: number;
    /**
     * Defines the path to be drawn as a list of path commands and their parameters.
     */
    'd'?: string;
    'dominant-baseline'?: 'auto' | 'middle' | 'hanging';
    'fill'?: string;
    'fill-opacity'?: string;
    'font-family'?: string;
    'font-size'?: number;
    'fx'?: number;
    'fy'?: number;
    'height'?: number;
    'id'?: string;
    'line-height'?: number;
    'opacity'?: string;
    'patternUnits'?: 'userSpaceOnUse' | 'objectBoundingBox';
    'text-anchor'?: 'start' | 'middle' | 'end';
    'r'?: number;
    'stroke'?: string;
    'stroke-dasharray'?: string;
    'stroke-opacity'?: number;
    'stroke-width'?: number;
    'transform'?: string;
    'visibility'?: 'visible' | 'hidden' | 'collapse';
    'width'?: number;
    'x'?: number;
    'y'?: number;
}
export declare function serialize_svg_props(props: SVGProperties): SVGAttributes;
export type DomContext = {
    domElement: DOMElement;
    elem: HTMLElement | SVGElement;
};
export declare const svg: {
    readonly ns: "http://www.w3.org/2000/svg";
    readonly xlink: "http://www.w3.org/1999/xlink";
    readonly createElement: (qualifiedName: string, attrs?: SVGAttributes) => SVGElement;
    readonly setAttributes: (elem: Element, attrs: SVGAttributes) => {
        readonly ns: "http://www.w3.org/2000/svg";
        readonly xlink: "http://www.w3.org/1999/xlink";
        readonly createElement: (qualifiedName: string, attrs?: SVGAttributes) => SVGElement;
        readonly setAttributes: any;
        readonly removeAttributes: (elem: Element, attrs: SVGAttributes) => any;
        readonly path_from_anchors: (board: IBoard, position: G20, attitude: G20, anchors: Anchor[], closed: boolean) => string;
        /**
         * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
         * @param shape
         * @param svgElement
         * @returns
         */
        readonly getClip: (shape: Shape, svgElement: SVGElement) => SVGClipPathElement;
        readonly defs: {
            readonly update: (svgElement: SVGElement, defs: SVGDefsElement) => void;
        };
    };
    readonly removeAttributes: (elem: Element, attrs: SVGAttributes) => {
        readonly ns: "http://www.w3.org/2000/svg";
        readonly xlink: "http://www.w3.org/1999/xlink";
        readonly createElement: (qualifiedName: string, attrs?: SVGAttributes) => SVGElement;
        readonly setAttributes: (elem: Element, attrs: SVGAttributes) => any;
        readonly removeAttributes: any;
        readonly path_from_anchors: (board: IBoard, position: G20, attitude: G20, anchors: Anchor[], closed: boolean) => string;
        /**
         * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
         * @param shape
         * @param svgElement
         * @returns
         */
        readonly getClip: (shape: Shape, svgElement: SVGElement) => SVGClipPathElement;
        readonly defs: {
            readonly update: (svgElement: SVGElement, defs: SVGDefsElement) => void;
        };
    };
    readonly path_from_anchors: (board: IBoard, position: G20, attitude: G20, anchors: Anchor[], closed: boolean) => string;
    /**
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
     * @param shape
     * @param svgElement
     * @returns
     */
    readonly getClip: (shape: Shape, svgElement: SVGElement) => SVGClipPathElement;
    readonly defs: {
        readonly update: (svgElement: SVGElement, defs: SVGDefsElement) => void;
    };
};
export interface SVGViewParams {
    domElement?: SVGElement;
}
export declare class SVGView implements View {
    #private;
    /**
     * The topmost svg element.
     */
    readonly domElement: SVGElement;
    readonly viewBox: Group;
    readonly defs: SVGDefsElement;
    width?: number;
    height?: number;
    readonly size$: import("../..").Observable<{
        width: number;
        height: number;
    }>;
    constructor(viewBox: Group, containerId: string, params?: SVGViewParams);
    setSize(size: {
        width: number;
        height: number;
    }, ratio: number): this;
    render(): this;
}
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
 *
 * [
 *    [a c e]
 *    [b d f]
 *    [0 0 1]
 * ] => "matrix(a b c d e f)""
 */
export declare function transform_value_of_matrix(m: Matrix): string;
export {};
