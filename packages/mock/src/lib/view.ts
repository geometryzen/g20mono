import { Group, View, ViewDOM, ViewFactory } from "g2o";
import { MockElement } from "./nodes";

export class MockView implements View<MockElement> {
    height: number;
    width: number;
    readonly #svgElement: MockElement;
    constructor(readonly viewBox: Group, readonly containerId: string, readonly viewDOM: ViewDOM<MockElement>) {
        this.#svgElement = viewDOM.createSVGElement('svg', {}) as MockElement;
        const defs = viewDOM.createSVGElement('defs', {}) as MockElement;
        // this.#svgElement.appendChild(defs);
        viewDOM.appendChild(this.#svgElement, defs);
    }
    get domElement(): MockElement {
        return this.#svgElement;
    }
    render(): void {
        this.viewBox.render(this.viewDOM, this.#svgElement, this.#svgElement);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSize(size: { width: number; height: number; }, ratio: number): void {
    }
}

export class MockViewFactory implements ViewFactory<MockElement> {
    constructor(readonly viewDOM: ViewDOM<MockElement>) {

    }
    createView(viewBox: Group, containerId: string): View<MockElement> {
        return new MockView(viewBox, containerId, this.viewDOM);
    }
}
