import { Anchor } from "../anchor";
import { Board } from "../Board";
import { Color } from "../effects/ColorProvider";
import { VectorLike, vector_from_like } from "../math/G20";
import { Path, PathOptions } from "../Path";
import { default_color } from "../utils/default_color";
import { default_closed_path_stroke_width } from "../utils/default_stroke_width";

export interface PolygonOptions extends PathOptions {
    id?: string;
    opacity?: number;
    fillColor?: Color,
    fillOpacity?: number,
    strokeColor?: Color,
    strokeOpacity?: number,
    strokeWidth?: number
}

export class Polygon extends Path {
    constructor(owner: Board, points: VectorLike[] = [], options: PolygonOptions = {}) {

        const vertices = points
            .map((point) => vector_from_like(point))
            .map((position, index) => new Anchor(position, index === 0 ? 'M' : 'L'));

        super(owner, vertices, true, false, false, path_attributes(options, owner));

        this.flagReset(true);
        this.update();
    }
}

function path_attributes(options: PolygonOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        position: options.position,
        attitude: options.attitude,
        dashes: options.dashes,
        fillColor: default_color(options.fillColor, 'none'),
        fillOpacity: options.fillOpacity,
        opacity: options.opacity,
        plumb: options.plumb,
        strokeColor: default_color(options.strokeColor, 'gray'),
        strokeOpacity: options.strokeOpacity,
        strokeWidth: default_closed_path_stroke_width(options.strokeWidth, owner),
        sx: options.sx,
        sy: options.sy,
        vectorEffect: options.vectorEffect,
        visibility: options.visibility,
    };
    return retval;
}
