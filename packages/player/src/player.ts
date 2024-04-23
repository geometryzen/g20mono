import { Board, Disposable } from "g2o";

export class Player {
    readonly #board: Board;
    readonly #frameCount: Disposable;
    /**
     * The handle of the last frame requested.
     */
    #handle: number | null = null;
    constructor(board: Board, callback: (frameCount: number) => void) {
        this.#board = board;
        this.#frameCount = board.frameCount$.subscribe(callback);
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

            // TODO: If we are to make use of the timestamp, it would be here.
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