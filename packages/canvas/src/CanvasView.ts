import { Canvg } from 'canvg';
import { Group, Observable, SVGViewFactory, View } from "g2o";

export class CanvasView implements View {
    domElement: HTMLCanvasElement | SVGElement;
    #ctx: CanvasRenderingContext2D;
    height?: number;
    size$: Observable<{ width: number; height: number; }>;
    width?: number;
    #svgView: View;
    constructor(viewBox: Group, containerId: string) {
        this.#svgView = new SVGViewFactory().createView(viewBox, containerId);
        const canvas = document.createElement('canvas');
        this.#ctx = canvas.getContext('2d');
        this.domElement = canvas;//this.#svgView.domElement;
        this.size$ = this.#svgView.size$;
        document.body.appendChild(canvas);
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