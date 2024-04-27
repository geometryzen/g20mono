import { Board, Disposable } from "g2o";
import { effect } from "g2o-reactive";

export class Player {
    readonly #board: Board;
    readonly #frameCount: Disposable;
    /**
     * The handle of the last frame requested.
     */
    #handle: number | null = null;
    constructor(board: Board, callback: (frameCount: number) => void) {
        this.#board = board;
        this.#frameCount = effect(() => {
            callback(board.frameCount);
        });
    }
    dispose(): void {
        if (this.#frameCount) {
            this.#frameCount.dispose();
        }
    }
    play(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const animate = (timestamp: number) => {

            this.#handle = null;

            this.#board.update();

            this.#handle = window.requestAnimationFrame(animate);
        };
        this.#handle = window.requestAnimationFrame(animate);
    }
    pause(): void {
        if (typeof this.#handle === 'number') {
            window.cancelAnimationFrame(this.#handle);
            this.#handle = null;
        }
    }
}