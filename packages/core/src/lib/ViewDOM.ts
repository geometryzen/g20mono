/**
 * A Handle-Body pattern for interacting with a DOM.
 */
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
    setStyle(element: T, name: "display" | "overflow" | "top", value: string): void;
}
