import { ElementDOM, GraphicsBoard, Group, SVGAttributes, View, ViewDOM, ViewFactory } from "../src/index";

class MockNode {
    parent: MockElement | null = null;
}

class MockElement extends MockNode {
    readonly #attributes = new Map<string, string>();
    readonly #children: MockNode[] = [];
    constructor(readonly qualifiedName: string) {
        super();
    }
    get children(): MockNode[] {
        return this.#children;
    }
    appendChild(child: MockNode) {
        this.#children.push(child);
        child.parent = this;
    }
    removeAttribute(qualifiedName: string): void {
        this.#attributes.delete(qualifiedName);
    }
    setAttribute(qualifiedName: string, value: string): void {
        this.#attributes.set(qualifiedName, value);
    }
}

class MockView implements View<MockElement> {
    /**
     * The svg element.
     */
    domElement: MockElement;
    height: number;
    width: number;
    readonly #svgElement: MockElement;
    constructor(readonly viewBox: Group, readonly containerId: string, readonly viewDOM: ViewDOM<MockElement>) {
        this.#svgElement = viewDOM.createSVGElement('svg', {}) as MockElement;
        const defs = viewDOM.createSVGElement('defs', {}) as MockElement;
        // this.#svgElement.appendChild(defs);
        viewDOM.appendChild(this.#svgElement, defs);
    }
    render(): void {
        this.viewBox.render(this.viewDOM, this.#svgElement, this.#svgElement);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSize(size: { width: number; height: number; }, ratio: number): void {
    }
}

class MockViewFactory implements ViewFactory<MockElement> {
    constructor(readonly viewDOM: ViewDOM<MockElement>) {

    }
    createView(viewBox: Group, containerId: string): View<MockElement> {
        return new MockView(viewBox, containerId, this.viewDOM);
    }
}

/**
 * TODO: Can ViewDOM was be parameterized while keeping Shape unparameterized?
 * This would allow us to avoid casting.
 */
class MockViewDOM implements ViewDOM<MockElement> {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setTextContent(element: unknown, textContent: string): void {
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

describe("GraphicsBoard", function () {
    it("constructor", function () {
        expect(typeof GraphicsBoard === 'function').toBe(true);

        const elementOrId = void 0 as string;
        const elementDOM = void 0 as ElementDOM<unknown, MockElement>;
        const viewDOM = new MockViewDOM();
        const viewFactory = new MockViewFactory(viewDOM);

        const board = new GraphicsBoard(elementOrId, elementDOM, viewDOM, viewFactory, {});

        board.rectangle();
    });
    it("point", function () {
        expect(typeof GraphicsBoard === 'function').toBe(true);

        const elementOrId = void 0 as string;
        const elementDOM = void 0 as ElementDOM<unknown, MockElement>;
        const viewDOM = new MockViewDOM();
        const viewFactory = new MockViewFactory(viewDOM);

        const board = new GraphicsBoard(elementOrId, elementDOM, viewDOM, viewFactory, {});

        const x = Math.random();
        const y = Math.random();
        const P = board.point([x, y]);
        expect(P.X.x).toBe(x);
        expect(P.X.y).toBe(y);
    });
});
