import { Board, Color, Group, GroupOptions, Line, LineOptions, ViewDOM } from "@g20/core";
import { default_color } from "./default_color";
import { default_number } from "./default_number";
import { default_open_path_stroke_width } from "./default_stroke_width";

export interface GridOptions extends GroupOptions {
    id?: string;
    lineColor?: Color;
    lineOpacity?: number;
    lineWidth?: number;
}

export class Grid extends Group {
    constructor(owner: Board, options: GridOptions = {}) {
        super(owner, [], options);
        const Nx = 10;
        const Ny = 10;
        const Lx = Nx - 1;
        const Ly = Ny - 1;
        const Mx = Nx / 2 - 1;
        const My = Ny / 2 - 1;

        const bbox = owner.getBoundingBox();

        const mx = (bbox.right - bbox.left) / Nx;
        const my = (bbox.top - bbox.bottom) / Ny;

        const lineOptions: LineOptions = {
            fillColor: default_color(options.lineColor, owner.defaults.line.fillColor),
            fillOpacity: default_number(options.lineOpacity, owner.defaults.line.fillOpacity),
            strokeColor: default_color(options.lineColor, owner.defaults.line.strokeColor),
            strokeOpacity: default_number(options.lineOpacity, owner.defaults.line.strokeOpacity),
            strokeWidth: default_open_path_stroke_width(default_number(options.lineWidth, owner.defaults.line.strokeWidth), owner)
        };

        for (let i = 0; i < Ly; i++) {
            const line = new Line(owner, [bbox.left, my * (i - My)], [bbox.right, my * (i - My)], lineOptions);
            this.add(line);
        }

        for (let i = 0; i < Lx; i++) {
            const line = new Line(owner, [mx * (i - Mx), bbox.bottom], [mx * (i - Mx), bbox.top], lineOptions);
            this.add(line);
        }
    }
    override dispose(): void {
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
