import { ElementDOM, SVGAttributes, ViewDOM } from "../../src/index";
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
    createSVGElement(qualifiedName: string, attrs: SVGAttributes): MockElement {
        return new MockElement(qualifiedName);
    }
    setAttribute(unk: unknown, qualifiedName: string, value: string): void {
        if (unk instanceof MockElement) {
            const element = unk as MockElement;
            element.setAttribute(qualifiedName, value);
        }
        else {
            throw new Error();
        }
    }
    setAttributes(unk: unknown, attributes: SVGAttributes): void {
        if (unk instanceof MockElement) {
            const element = unk as MockElement;
            for (const qualifiedName of Object.keys(attributes)) {
                const value = attributes[qualifiedName];
                element.setAttribute(qualifiedName, value);
            }
        }
        else {
            throw new Error();
        }
    }
    removeAttribute(element: MockElement, qualifiedName: string): void {
        element.removeAttribute(qualifiedName);
    }
    removeAttributes(unk: unknown, attributes: SVGAttributes): void {
        if (unk instanceof MockElement) {
            const element = unk as MockElement;
            for (const qualifiedName of Object.keys(attributes)) {
                element.removeAttribute(qualifiedName);
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
    setTextContent(element: MockElement, content: string): void {
        element.textContent = content;
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
                if (child.qualifiedName === 'defs') {
                    return child;
                }
            }
        }
        throw new Error();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setStyle(element: unknown, name: "display" | "overflow" | "top", value: string): void {
        throw new Error("Method not implemented.");
    }
}

export class MockElementDOM implements ElementDOM<MockElement, MockElement> {
    constructor() {

    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getElementById(elementId: string): MockElement {
        throw new Error("Method not implemented.");
    }
    getAttribute(element: MockElement, qualifiedName: string): string {
        return element.getAttribute(qualifiedName);
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
        return element.qualifiedName === 'body';
    }
}
