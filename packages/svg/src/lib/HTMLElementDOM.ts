import { ElementDOM } from "g2o";

export class HTMLElementDOM implements ElementDOM<HTMLElement, SVGElement> {
    constructor(readonly doc: Document) {

    }
    addEventListener(target: HTMLElement, name: "resize", callback: () => void): void {
        target.addEventListener(name, callback);
    }
    appendChild(parent: HTMLElement, child: SVGElement): void {
        parent.appendChild(child);
    }
    getAttribute(element: HTMLElement, qualifiedName: string): string {
        return element.getAttribute(qualifiedName);
    }
    getBoundingClientRect(element: HTMLElement): { width: number; height: number; } {
        return element.getBoundingClientRect();
    }
    getElementById(elementId: string): HTMLElement {
        return document.getElementById(elementId);
    }
    isDocumentBody(element: HTMLElement): boolean {
        return element === document.body;
    }
    removeEventListener(target: HTMLElement, name: "resize", callback: () => void): void {
        target.removeEventListener(name, callback);
    }
}