import { Board, Group, Line } from "g2o";

export interface GridOptions {
    id?: string
}

export class Grid extends Group {
    constructor(board: Board, options: GridOptions = {}) {
        super(board, [], options);
        const Nx = 10;
        const Ny = 10;
        const Lx = Nx - 1;
        const Ly = Ny - 1;
        const Mx = (Nx / 2) - 1;
        const My = (Ny / 2) - 1;

        const bbox = board.getBoundingBox();

        const mx = (bbox.right - bbox.left) / Nx;
        const my = (bbox.top - bbox.bottom) / Ny;

        for (let i = 0; i < Ly; i++) {
            const line = new Line(board, [bbox.left, my * (i - My)], [bbox.right, my * (i - My)], {
                strokeWidth: 2 / board.sx,
                strokeOpacity: 0.5
            });
            this.add(line);
        }

        for (let i = 0; i < Lx; i++) {
            const line = new Line(board, [mx * (i - Mx), bbox.bottom], [mx * (i - Mx), bbox.top], {
                strokeWidth: 2 / board.sx,
                strokeOpacity: 0.5
            });
            this.add(line);
        }
    }
}
