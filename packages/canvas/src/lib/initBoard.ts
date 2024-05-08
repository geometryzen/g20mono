import { Board, GraphicsBoard, ViewDOM, ViewFactory } from "g2o";
import { SVGViewDOM } from "g2o-svg";
import { CanvasViewFactory } from "./CanvasViewFactory";
import { HTMLElementDOM } from "./HTMLElementDOM";

export interface BoardOptions {
    boundingBox?: { left: number, top: number, right: number, bottom: number };
}

/**
 * A convenience function for initializing a new GraphicsBoard using SVG.
 * @param elementOrId HTML identifier (id) of element in which the board is rendered.
 * @param options An object that sets some of the board properties.
 */
export function initBoard(elementOrId: string | HTMLElement, options: BoardOptions = {}): Board {
    const elementDOM = new HTMLElementDOM();
    // The casting is a bit wierd. The viewDOM will build an SVG tree, but the viewFactory will render it into a canvas.
    const viewDOM: ViewDOM<HTMLCanvasElement> = new SVGViewDOM() as unknown as ViewDOM<HTMLCanvasElement>;
    const viewFactory: ViewFactory<HTMLCanvasElement> = new CanvasViewFactory();
    return new GraphicsBoard<HTMLElement, HTMLCanvasElement>(elementOrId, elementDOM, viewDOM, viewFactory, options);
}
