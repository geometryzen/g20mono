/**
 * A Handle-Body pattern for interacting with a DOM.
 */
export interface ElementDOM<E, T> {
    getElementById(elementId: string): E;
    getAttribute(element: E, qname: string): string;
    getBoundingClientRect(element: E): { width: number; height: number };
    appendChild(parent: E, child: T): void;
    addEventListener(target: E, name: "resize", callback: () => void): void;
    removeEventListener(target: E, name: "resize", callback: () => void): void;
    isDocumentBody(element: E): boolean;
}
