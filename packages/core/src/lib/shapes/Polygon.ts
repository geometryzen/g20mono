import { Anchor } from "../anchor";
import { Color } from "../effects/ColorProvider";
import { Board } from "../IBoard";
import { Path, PathAttributes } from "../Path";
import { PositionLike, position_from_like } from "../Shape";
import { default_color } from "../utils/default_color";
import { default_closed_path_stroke_width } from "../utils/default_stroke_width";

export interface PolygonAttributes {
    id?: string;
    opacity?: number;
    fill?: Color,
    fillOpacity?: number,
    stroke?: Color,
    strokeOpacity?: number,
    strokeWidth?: number
}

export class Polygon extends Path implements PolygonAttributes {
    constructor(owner: Board, points: PositionLike[] = [], attributes: PolygonAttributes = {}) {

        const vertices = points
            .map((point) => position_from_like(point))
            .map((position, index) => new Anchor(position, index === 0 ? 'M' : 'L'));

        super(owner, vertices, true, false, false, path_attributes(attributes, owner));

        this.flagReset(true);
        this.update();
    }
}

function path_attributes(attributes: PolygonAttributes, owner: Board): PathAttributes {
    const retval: PathAttributes = {
        id: attributes.id,
        opacity: attributes.opacity,
        fill: default_color(attributes.fill, 'none'),
        fillOpacity: attributes.fillOpacity,
        stroke: default_color(attributes.stroke, 'gray'),
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: default_closed_path_stroke_width(attributes.strokeWidth, owner)
    };
    return retval;
}
