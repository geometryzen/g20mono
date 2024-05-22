import { Arrow, Board, G20, Group, GroupOptions, Shape, Text, ViewDOM } from "@g20/core";

export interface AxesOptions extends GroupOptions {
    id?: string;
}

export class Axes extends Group {
    readonly xAxis: Arrow;
    readonly yAxis: Arrow;
    readonly xLabel: Text;
    readonly yLabel: Text;
    constructor(board: Board, options: AxesOptions = {}) {
        super(board, [], options);
        const bbox = board.getBoundingBox();
        const sx = Math.abs(bbox.right - bbox.left);
        const sy = Math.abs(bbox.top - bbox.bottom);
        const dx = sx * 0.05;
        const dy = sy * 0.05;

        const xHead: [x: number, y: number] = [(board.crazy ? bbox.left : bbox.right) - dx, 0];
        const xTail: [x: number, y: number] = [(board.crazy ? bbox.right : bbox.left) + dx, 0];

        const yHead: [x: number, y: number] = [0, (board.goofy ? bbox.bottom : bbox.top) - dy];
        const yTail: [x: number, y: number] = [0, (board.goofy ? bbox.top : bbox.bottom) + dy];

        this.xAxis = new Arrow(board, G20.ex.scale(sx - 2 * dx), {
            position: xTail,
            headLength: 0.025 * sx
        });
        this.add(this.xAxis);

        this.yAxis = new Arrow(board, G20.ey.scale(sy - 2 * dy), {
            position: yTail,
            headLength: 0.025 * sy
        });
        this.add(this.yAxis);

        this.xLabel = new Text(board, "x", {
            position: xHead,
            anchor: "start",
            baseline: "middle",
            dx: 16 * 0.6 // fontSize * ratio of width / height for typical character
        });
        this.add(this.xLabel);
        resize(this.xLabel, board);

        this.yLabel = new Text(board, "y", {
            position: yHead,
            anchor: "middle",
            baseline: "middle",
            dy: 16 // fontSize
        });
        this.add(this.yLabel);
        resize(this.yLabel, board);
    }
    override dispose(): void {
        this.xLabel.dispose();
        this.yLabel.dispose();
        this.xAxis.dispose();
        this.yAxis.dispose();
        super.dispose();
    }
    override render<T>(viewDOM: ViewDOM<T>, parentElement: T, svgElement: T): void {
        if (this.zzz.viewee) {
            // The element has already been defined.
        } else {
            super.render(viewDOM, parentElement, svgElement);
        }
    }
}

function resize(shape: Shape, board: Board): void {
    shape.sx = 1 / board.sx;
    shape.sy = 1 / board.sy;
}
