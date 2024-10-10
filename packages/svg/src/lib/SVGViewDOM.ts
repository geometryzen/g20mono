import { Anchor, Board, Commands, G20, Matrix, ShapeBase, SVGAttributes, ViewDOM } from "@g20/core";
import { mod, toFixed } from "./math";

type DOMElement = HTMLElement | SVGElement;

const ns = "http://www.w3.org/2000/svg";

const xlink = "http://www.w3.org/1999/xlink";

function createSVGElement(name: string, attrs: SVGAttributes = {}): SVGElement {
    const elem = document.createElementNS(ns, name);
    if (attrs && Object.keys(attrs).length > 0) {
        setAttributes(elem, attrs);
    }
    return elem;
}

function setAttributes(elem: Element, attrs: SVGAttributes): void {
    // SVGAttributes does not have an index signature.
    const styles = attrs as { [name: string]: string };
    const keys = Object.keys(attrs);
    for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        const value = styles[name];
        if (/href/.test(keys[i])) {
            elem.setAttributeNS(xlink, name, value);
        } else {
            elem.setAttribute(name, value);
        }
    }
}

export class SVGViewDOM implements ViewDOM<SVGElement> {
    downcast(element: unknown): SVGElement {
        if (element instanceof SVGElement) {
            return element as SVGElement;
        } else {
            throw new Error("element is not an SVGElement");
        }
    }
    createSVGElement(name: string, attributes: SVGAttributes = {}): SVGElement {
        return createSVGElement(name, attributes);
    }
    setAttribute(element: SVGElement, name: string, value: string): void {
        element.setAttribute(name, value);
    }
    setAttributes(element: SVGElement, attributes: SVGAttributes): void {
        setAttributes(element, attributes);
    }
    removeAttribute(element: SVGElement, name: string): void {
        element.removeAttribute(name);
    }
    removeAttributes(element: SVGElement, attributes: SVGAttributes): void {
        svg.removeAttributes(element, attributes);
    }
    appendChild(parent: SVGElement, child: SVGElement): void {
        parent.appendChild(child);
    }
    removeChild(parent: SVGElement, child: SVGElement): void {
        parent.removeChild(child);
    }
    setTextContent(element: SVGElement, textContent: string): void {
        element.textContent = textContent;
    }
    getParentNode(element: SVGElement): SVGElement | null {
        return element.parentNode as SVGElement;
    }
    getLastChild(element: SVGElement): SVGElement {
        return element.lastChild as SVGElement;
    }
    getElementDefs(svg: SVGElement): SVGElement {
        return get_svg_element_defs(svg);
    }
    setStyle(element: SVGElement, name: "display" | "overflow", value: string): void {
        element.style[name] = value;
    }
}

/**
 * Finds the SVGDefsElement from the children of the SVGElement.
 */
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

export type DomContext = {
    domElement: DOMElement;
    elem: HTMLElement | SVGElement;
};

export const svg = {
    ns: "http://www.w3.org/2000/svg",

    xlink: "http://www.w3.org/1999/xlink",

    // Create an svg namespaced element.
    createElement: function (name: string, attrs: SVGAttributes = {}) {
        const elem = document.createElementNS(svg.ns, name);
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
            const name = keys[i];
            const value = styles[name];
            if (/href/.test(keys[i])) {
                elem.setAttributeNS(svg.xlink, name, value);
            } else {
                elem.setAttribute(name, value);
            }
        }
        return this;
    },

    // Remove attributes from an svg element.
    removeAttributes: function (elem: Element, attrs: SVGAttributes) {
        if (elem) {
            for (const key in attrs) {
                elem.removeAttribute(key);
            }
            return this;
        } else {
            throw new Error("elem MUST be defined.");
        }
    },

    path_from_anchors: function (board: Board, position: G20, attitude: G20, anchors: Anchor[], closed: boolean): string {
        // The anchors are user coordinates and don't include the position and attitude of the body.
        // By switching x amd y here we handle a 90 degree coordinate rotation.
        // We are not completely done because Text and Images are rotated.
        const [screenX, screenY] = screen_functions(board);

        const l = anchors.length;
        const last = l - 1;
        let d: Anchor; // The elusive last Commands.move point
        let string = "";

        for (let i = 0; i < l; i++) {
            const b = anchors[i];

            const prev = closed ? mod(i - 1, l) : Math.max(i - 1, 0);
            const a = anchors[prev];

            let command: string;
            let c;
            // Anchor;
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

                    command = Commands.arc + " " + rx + " " + ry + " " + xAxisRotation + " " + largeArcFlag + " " + sweepFlag + " " + x + " " + y;
                    break;

                case Commands.curve:
                    ar = (a.controls && a.controls.b) || G20.zero;
                    bl = (b.controls && b.controls.a) || G20.zero;

                    if (a.relative) {
                        vx = toFixed(screenX(ar.x + a.x, ar.y + a.y));
                        vy = toFixed(screenY(ar.x + a.x, ar.y + a.y));
                    } else {
                        vx = toFixed(screenX(ar.x, ar.y));
                        vy = toFixed(screenY(ar.x, ar.y));
                    }

                    if (b.relative) {
                        ux = toFixed(screenX(bl.x + b.x, bl.y + b.y));
                        uy = toFixed(screenY(bl.x + b.x, bl.y + b.y));
                    } else {
                        ux = toFixed(screenX(bl.x, bl.y));
                        uy = toFixed(screenY(bl.x, bl.y));
                    }

                    command = (i === 0 ? Commands.move : Commands.curve) + " " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
                    break;

                case Commands.move: {
                    d = b;
                    command = Commands.move + " " + x + " " + y;
                    break;
                }
                default: {
                    command = b.command + " " + x + " " + y;
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
                    } else {
                        vx = toFixed(screenX(br.x, br.y));
                        vy = toFixed(screenY(br.x, br.y));
                    }

                    if (c.relative) {
                        ux = toFixed(screenX(cl.x + c.x, cl.y + c.y));
                        uy = toFixed(screenY(cl.x + c.x, cl.y + c.y));
                    } else {
                        ux = toFixed(screenX(cl.x, cl.y));
                        uy = toFixed(screenY(cl.x, cl.y));
                    }

                    x = toFixed(screenX(c.x, c.y));
                    y = toFixed(screenY(c.x, c.y));

                    command += " C " + vx + " " + vy + " " + ux + " " + uy + " " + x + " " + y;
                }

                if (b.command !== Commands.close) {
                    command += " Z";
                }
            }
            string += command + " ";
        }

        return string;
    },

    /**
     * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
     * @param shape
     * @param svgElement
     * @returns
     */
    getClip: function <T>(viewDOM: ViewDOM<T>, shape: ShapeBase, svgElement: T): T {
        let clipPath = shape.zzz.svgClipPathElement as T;
        if (!clipPath) {
            clipPath = shape.zzz.svgClipPathElement = viewDOM.createSVGElement("clipPath", {
                "clip-rule": "nonzero"
            });
        }
        if (viewDOM.getParentNode(clipPath) === null) {
            viewDOM.appendChild(viewDOM.getElementDefs(svgElement), clipPath);
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
    }
} as const;

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
    return `matrix(${[a, b, c, d, e, f].map(toFixed).join(" ")})`;
}

/**
 * If the bounding box is oriented such that y increases in the upwards direction,
 * exchange the x and y coordinates because we will be applying a 90 degree rotation.
 */
export function screen_functions(board: Board) {
    if (board.goofy) {
        if (board.crazy) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return [(x: number, y: number): number => y, (x: number, y: number): number => x];
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return [(x: number, y: number): number => x, (x: number, y: number): number => y];
        }
    } else {
        if (board.crazy) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return [(x: number, y: number): number => x, (x: number, y: number): number => y];
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return [(x: number, y: number): number => y, (x: number, y: number): number => x];
        }
    }
}
