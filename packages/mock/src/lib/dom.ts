import { ElementDOM, SVGAttributes, ViewDOM } from "@g20/core";
import { MockElement, MockNode } from "./nodes";

/**
 * TODO: Can ViewDOM was be parameterized while keeping Shape unparameterized?
 * This would allow us to avoid casting.
 */
export class MockViewDOM implements ViewDOM<MockElement> {
    downcast(element: unknown): MockElement {
        if (element instanceof MockElement) {
            return element;
        }
        else {
            throw new Error("element is not a MockElement");
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createSVGElement(name: string, attrs: SVGAttributes): MockElement {
        return new MockElement(name);
    }
    setAttribute(unk: unknown, name: string, value: string): void {
        if (unk instanceof MockElement) {
            const element = unk as MockElement;
            element.setAttribute(name, value);
        }
        else {
            throw new Error();
        }
    }
    setAttributes(unk: unknown, attributes: SVGAttributes): void {
        if (unk instanceof MockElement) {
            const element = unk as MockElement;
            for (const name of Object.keys(attributes)) {
                const value = attributes[name];
                element.setAttribute(name, value);
            }
        }
        else {
            throw new Error();
        }
    }
    removeAttribute(element: MockElement, name: string): void {
        element.removeAttribute(name);
    }
    removeAttributes(unk: unknown, attributes: SVGAttributes): void {
        if (unk instanceof MockElement) {
            const element = unk as MockElement;
            for (const name of Object.keys(attributes)) {
                element.removeAttribute(name);
            }
        }
        else {
            throw new Error();
        }
    }
    appendChild(unkP: unknown, unkC: unknown): void {
        if (unkP instanceof MockElement && unkC instanceof MockNode) {
            unkP.appendChild(unkC);
        }
        else {
            throw new Error();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeChild(parent: unknown, child: unknown): void {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTextContent(element: MockElement, textContent: string): void {
        throw new Error("Method not implemented.");
    }
    getParentNode(element: MockElement): MockElement {
        return element.parent;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getLastChild(element: MockElement): MockElement {
        throw new Error("Method not implemented.");
    }
    getElementDefs(svg: MockElement): MockElement {
        const children = svg.children;
        const N = children.length;
        for (let i = 0; i < N; i++) {
            const child = children[i];
            if (child instanceof MockElement) {
                if (child.name === 'defs') {
                    return child;
                }
            }
        }
        throw new Error();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setStyle(element: MockElement, name: "display" | "overflow" | "top", value: string): void {
        element.style.set(name, value);
    }
}

export class MockElementDOM implements ElementDOM<MockElement, MockElement> {
    constructor() {

    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getElementById(elementId: string): MockElement {
        throw new Error("Method not implemented.");
    }
    getAttribute(element: MockElement, name: string): string {
        return element.getAttribute(name);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getBoundingClientRect(element: MockElement): { width: number; height: number; } {
        return { width: 640, height: 480 };
    }
    appendChild(parent: MockElement, child: MockElement): void {
        parent.appendChild(child);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addEventListener(target: MockElement, name: "resize", callback: () => void): void {
        // Do nothing yet.
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeEventListener(target: MockElement, name: "resize", callback: () => void): void {
        // Do nothing yet.
    }
    isDocumentBody(element: MockElement): boolean {
        return element.name === 'body';
    }
}
