import { Board } from "@g20/core";

export interface BoardOptions {
    boundingBox?: { left: number; top: number; right: number; bottom: number };
}

/**
 * A convenience function for initializing a new GraphicsBoard using SVG.
 * @param elementOrId HTML identifier (id) of element in which the board is rendered.
 * @param options An object that sets some of the board properties.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function initBoard(elementOrId: string | HTMLElement, options: BoardOptions = {}): Board {
    throw new Error();
}
