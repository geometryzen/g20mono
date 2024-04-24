import { Canvg } from 'canvg';
import { Group, SVGViewFactory, View } from "g2o";

export class CanvasView implements View {
    domElement: HTMLCanvasElement;
    #ctx: CanvasRenderingContext2D;
    #svgView: View;
    constructor(viewBox: Group, containerId: string) {
        this.#svgView = new SVGViewFactory().createView(viewBox, containerId);
        this.domElement = document.createElement('canvas');
        this.#ctx = this.domElement.getContext('2d');
        document.body.appendChild(this.domElement);
    }
    get width(): number {
        return this.#svgView.width;
    }
    set width(width: number) {
        this.#svgView.width = width;
    }
    get height(): number {
        return this.#svgView.height;
    }
    set height(height: number) {
        this.#svgView.height = height;
    }
    render(): void {
        this.#svgView.render();
        const v = Canvg.fromString(this.#ctx, this.#svgView.domElement.outerHTML);
        v.start();
    }
    setSize(size: { width: number; height: number; }, ratio: number): void {
        this.#svgView.setSize(size, ratio);
    }
}