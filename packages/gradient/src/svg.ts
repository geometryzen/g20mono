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

const ns = 'http://www.w3.org/2000/svg';

const xlink = 'http://www.w3.org/1999/xlink';

export function createElement(qualifiedName: string, attrs: SVGAttributes = {}) {
    const elem = document.createElementNS(ns, qualifiedName);
    if (attrs && Object.keys(attrs).length > 0) {
        setAttributes(elem, attrs);
    }
    return elem;
}

export function setAttributes(elem: Element, attrs: SVGAttributes): void {
    // SVGAttributes does not have an index signature.
    const styles = attrs as { [name: string]: string };
    const keys = Object.keys(attrs);
    for (let i = 0; i < keys.length; i++) {
        const qualifiedName = keys[i];
        const value = styles[qualifiedName];
        if (/href/.test(keys[i])) {
            elem.setAttributeNS(xlink, qualifiedName, value);
        }
        else {
            elem.setAttribute(qualifiedName, value);
        }
    }
}
export function get_svg_element_defs(svg: SVGElement): SVGDefsElement {
    const children = svg.children;
    const N = children.length;
    for (let i = 0; i < N; i++) {
        const child = children.item(i);
        if (child instanceof SVGDefsElement) {
            return child;
        }
    }
    throw new Error();
}

