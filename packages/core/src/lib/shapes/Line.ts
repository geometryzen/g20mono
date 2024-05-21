import { Anchor } from "../Anchor";
import { Board } from "../Board";
import { Color } from "../effects/ColorProvider";
import { G20, VectorLike, vector_from_like } from "../math/G20";
import { Path, PathOptions } from "../Path";
import { default_color } from "../utils/default_color";
import { default_open_path_stroke_width } from "../utils/default_stroke_width";

export interface LineOptions extends PathOptions {
    id?: string;
    dashes?: number[];
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    vectorEffect?: null | "non-scaling-stroke" | "none";
    visibility?: "visible" | "hidden" | "collapse";
}

export interface LineProperties {
    id?: string;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: "visible" | "hidden" | "collapse";
}

export class Line extends Path implements LineProperties {
    constructor(owner: Board, point1: VectorLike, point2: VectorLike, options: LineOptions = {}) {
        const vertex1 = new Anchor(vector_from_like(point1), "M");
        const vertex2 = new Anchor(vector_from_like(point2), "L");
        super(owner, [vertex1, vertex2], false, false, false, path_options_from_line_options(options, owner));
    }
    override dispose(): void {
        super.dispose();
    }
    get point1(): G20 {
        return this.vertices.getAt(0).origin;
    }
    set point1(point1: VectorLike) {
        if (point1 instanceof G20) {
            this.vertices.getAt(0).origin.copyVector(point1);
        } else if (Array.isArray(point1)) {
            this.vertices.getAt(0).origin.set(point1[0], point1[1]);
        }
    }
    get point2(): G20 {
        return this.vertices.getAt(1).origin;
    }
    set point2(point2: VectorLike) {
        if (point2 instanceof G20) {
            this.vertices.getAt(1).origin.copyVector(point2);
        } else if (Array.isArray(point2)) {
            this.vertices.getAt(1).origin.set(point2[0], point2[1]);
        }
    }
}

function path_options_from_line_options(options: LineOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        position: options.position,
        attitude: options.attitude,
        dashes: options.dashes,
        fillColor: default_color(options.fillColor, owner.defaults.line.fillColor),
        fillOpacity: options.fillOpacity,
        opacity: options.opacity,
        plumb: options.plumb,
        strokeColor: default_color(options.strokeColor, owner.defaults.line.strokeColor),
        strokeOpacity: options.strokeOpacity,
        strokeWidth: default_open_path_stroke_width(options.strokeWidth, owner),
        sx: options.sx,
        sy: options.sy,
        vectorEffect: options.vectorEffect,
        visibility: options.visibility,
    };
    return retval;
}
