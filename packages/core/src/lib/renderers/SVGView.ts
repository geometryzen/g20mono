import { Anchor } from '../anchor';
import { Group } from '../group';
import { IBoard } from '../IBoard';
import { G20 } from '../math/G20';
import { Matrix } from '../matrix';
import { variable } from '../reactive/variable';
import { Shape } from '../Shape';
import { mod, toFixed } from '../utils/math';
import { Commands } from '../utils/path-commands';
import { View } from './View';

type DOMElement = HTMLElement | SVGElement;

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

/**
 * sets the "hidden" _flagUpdate property.
 */
export function set_defs_dirty_flag(defs: SVGDefsElement, dirtyFlag: boolean): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (defs as any)._flagUpdate = dirtyFlag;
}

/**
 * gets the "hidden" _flagUpdate property.
 */
function get_defs_dirty_flag(defs: SVGDefsElement): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (defs as any)._flagUpdate as boolean;
}

/**
 * Used to set attributes on SVG elements so the value MUST be a string.
 */
export type StylesMap = { [name: string]: string };

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

export function serialize_svg_props(props: SVGProperties): SVGAttributes {
    const attrs: SVGAttributes = {};
    attrs.class = props.class;
    if (typeof props.cx === 'number') {
        attrs.cx = `${props.cx}`;
    }
    return attrs;
}

export type DomContext = {
    domElement: DOMElement;
    elem: HTMLElement | SVGElement;
};

export const svg = {
    ns: 'http://www.w3.org/2000/svg',

    xlink: 'http://www.w3.org/1999/xlink',

    // Create an svg namespaced element.
    createElement: function (qualifiedName: string, attrs: SVGAttributes = {}) {
        const elem = document.createElementNS(svg.ns, qualifiedName);
        if (attrs && Object.keys(attrs).length > 0) {
            svg.setAttributes(elem, attrs);
        }
        return elem;
    },

    // Add attributes from an svg element.
    setAttributes: function (elem: Element, attrs: SVGAttributes) {
        // SVGAttributes does not have an index signature.
        const styles = attrs as { [name: string]: string };
        const keys = Object.keys(attrs);
        for (let i = 0; i < keys.length; i++) {
            const qualifiedName = keys[i];
            const value = styles[qualifiedName];
            if (/href/.test(keys[i])) {
                elem.setAttributeNS(svg.xlink, qualifiedName, value);
            }
            else {
                elem.setAttribute(qualifiedName, value);
            }
        }
        return this;
    },

    // Remove attributes from an svg element.
    removeAttributes: function (elem: Element, attrs: SVGAttributes) {
        for (const key in attrs) {
            elem.removeAttribute(key);
        }
        return this;
    },

    path_from_anchors: function (board: IBoard, position: G20, attitude: G20, anchors: Anchor[], closed: boolean): string {

        // The anchors are user coordinates and don't include the position and attitude of the body.
        // By switching x amd y here we handle a 90 degree coordinate rotation.
        // We are not completely done because Text and Images are rotated.
        const [screenX, screenY] = screen_functions(board);

        const l = anchors.length;
        const last = l - 1;
        let d: Anchor; // The elusive last Commands.move point
        let string = '';

        for (let i = 0; i < l; i++) {

            const b = anchors[i];

            const prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
            const a = anchors[prev];

            let command: string;
            let c; Anchor;
            let vx, vy, ux, uy, ar, bl, br, cl;
            let rx, ry, xAxisRotation, largeArcFlag, sweepFlag;

            let x = toFixed(screenX(b.x, b.y));
            let y = toFixed(screenY(b.x, b.y));

            switch (b.command) {

                case Commands.close:
                    command = Commands.close;
                    break;

                case Commands.arc:

                    rx = b.rx;
                    ry = b.ry;
                    xAxisRotation = b.xAxisRotation;
                    largeArcFlag = b.largeArcFlag;
                    sweepFlag = b.sweepFlag;

                    command = Commands.arc + ' ' + rx + ' ' + ry + ' '
                        + xAxisRotation + ' ' + largeArcFlag + ' ' + sweepFlag + ' '
                        + x + ' ' + y;
                    break;

                case Commands.curve:

                    ar = (a.controls && a.controls.b) || G20.zero;
                    bl = (b.controls && b.controls.a) || G20.zero;

                    if (a.relative) {
                        vx = toFixed(screenX(ar.x + a.x, ar.y + a.y));
                        vy = toFixed(screenY(ar.x + a.x, ar.y + a.y));
                    }
                    else {
                        vx = toFixed(screenX(ar.x, ar.y));
                        vy = toFixed(screenY(ar.x, ar.y));
                    }

                    if (b.relative) {
                        ux = toFixed(screenX(bl.x + b.x, bl.y + b.y));
                        uy = toFixed(screenY(bl.x + b.x, bl.y + b.y));
                    }
                    else {
                        ux = toFixed(screenX(bl.x, bl.y));
                        uy = toFixed(screenY(bl.x, bl.y));
                    }

                    command = ((i === 0) ? Commands.move : Commands.curve) +
                        ' ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
                    break;

                case Commands.move: {
                    d = b;
                    command = Commands.move + ' ' + x + ' ' + y;
                    break;
                }
                default: {
                    command = b.command + ' ' + x + ' ' + y;
                }
            }

            // Add a final point and close it off

            if (i >= last && closed) {

                if (b.command === Commands.curve) {

                    // Make sure we close to the most previous Commands.move
                    c = d;

                    br = (b.controls && b.controls.b) || b;
                    cl = (c.controls && c.controls.a) || c;

                    if (b.relative) {
                        vx = toFixed(screenX(br.x + b.x, br.y + b.y));
                        vy = toFixed(screenY(br.x + b.x, br.y + b.y));
                    }
                    else {
                        vx = toFixed(screenX(br.x, br.y));
                        vy = toFixed(screenY(br.x, br.y));
                    }

                    if (c.relative) {
                        ux = toFixed(screenX(cl.x + c.x, cl.y + c.y));
                        uy = toFixed(screenY(cl.x + c.x, cl.y + c.y));
                    }
                    else {
                        ux = toFixed(screenX(cl.x, cl.y));
                        uy = toFixed(screenY(cl.x, cl.y));
                    }

                    x = toFixed(screenX(c.x, c.y));
                    y = toFixed(screenY(c.x, c.y));

                    command += ' C ' + vx + ' ' + vy + ' ' + ux + ' ' + uy + ' ' + x + ' ' + y;
                }

                if (b.command !== Commands.close) {
                    command += ' Z';
                }
            }
            string += command + ' ';
        }

        return string;

    },

    /**
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
     * @param shape 
     * @param svgElement 
     * @returns 
     */
    getClip: function (shape: Shape, svgElement: SVGElement): SVGClipPathElement {
        let clipPath = shape.zzz.clipPath;
        if (!clipPath) {
            clipPath = shape.zzz.clipPath = svg.createElement('clipPath', { 'clip-rule': 'nonzero' }) as SVGClipPathElement;
        }
        if (clipPath.parentNode === null) {
            get_svg_element_defs(svgElement).appendChild(clipPath);
        }
        return clipPath;
    },

    defs: {
        update: function (svgElement: SVGElement, defs: SVGDefsElement) {
            if (get_defs_dirty_flag(defs)) {
                const children = Array.prototype.slice.call(defs.children, 0);
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    const id = child.id;
                    const selector = `[fill="url(#${id})"],[stroke="url(#${id})"],[clip-path="url(#${id})"]`;
                    const exists = svgElement.querySelector(selector);
                    if (!exists) {
                        defs.removeChild(child);
                    }
                }
                set_defs_dirty_flag(defs, false);
            }
        }
    },
} as const;

export interface SVGViewParams {
    domElement?: SVGElement;
}

export class SVGView implements View {
    /**
     * The topmost svg element.
     */
    readonly domElement: SVGElement;
    readonly viewBox: Group;
    readonly defs: SVGDefsElement;

    width?: number;
    height?: number;

    readonly #size = variable({ width: 0, height: 0 });
    readonly size$ = this.#size.asObservable();

    constructor(viewBox: Group, containerId: string, params: SVGViewParams = {}) {
        if (viewBox instanceof Group) {
            this.viewBox = viewBox;
            this.viewBox.parent = null;
        }
        else {
            throw new Error("viewBox must be a Group");
        }
        if (params.domElement) {
            this.domElement = params.domElement;
        }
        else {
            this.domElement = svg.createElement('svg', { id: `${containerId}-svg` });
        }

        this.defs = svg.createElement('defs') as SVGDefsElement;
        set_defs_dirty_flag(this.defs, false);
        this.domElement.appendChild(this.defs);
        this.domElement.style.overflow = 'hidden';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSize(size: { width: number, height: number }, ratio: number): this {
        this.width = size.width;
        this.height = size.height;
        svg.setAttributes(this.domElement, { width: `${size.width}px`, height: `${size.height}px` });
        this.#size.set(size);
        return this;
    }

    render(): this {
        const svgElement = this.domElement;
        this.viewBox.render(this.domElement, svgElement);
        svg.defs.update(svgElement, this.defs);
        return this;
    }
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
export function transform_value_of_matrix(m: Matrix): string {
    const a = m.a;
    const b = m.b;
    const c = m.c;
    const d = m.d;
    const e = m.e;
    const f = m.f;
    return `matrix(${[a, b, c, d, e, f].map(toFixed).join(' ')})`;
}

/**
 * If the bounding box is oriented such that y increases in the upwards direction,
 * exchange the x and y coordinates because we will be applying a 90 degree rotation.
 */
function screen_functions(board: IBoard) {
    if (board.goofy) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return [(x: number, y: number): number => x, (x: number, y: number): number => y];
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return [(x: number, y: number): number => y, (x: number, y: number): number => x];
    }
}
