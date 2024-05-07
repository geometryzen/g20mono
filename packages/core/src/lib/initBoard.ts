import { Board } from "./Board";
import { GraphicsBoard } from "./GraphicsBoard";
import { SVGViewDOM } from "./renderers/SVGViewDOM";
import { SVGViewFactory } from "./renderers/SVGViewFactory";

export interface BoardOptions {
    boundingBox?: { left: number, top: number, right: number, bottom: number };
}

/**
 * Initialize a new board.
 * @param elementOrId HTML identifier (id) of element in which the board is rendered.
 * @param options An object that sets some of the board properties.
 */
export function initBoard(elementOrId: string | HTMLElement, options: BoardOptions = {}): Board {
    const viewDOM = new SVGViewDOM();
    return new GraphicsBoard<SVGElement>(elementOrId, viewDOM, new SVGViewFactory(), options);
}
