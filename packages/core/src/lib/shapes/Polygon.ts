import { Anchor } from "../anchor";
import { Color } from "../effects/ColorProvider";
import { IBoard } from "../IBoard";
import { Path, PathAttributes } from "../path";
import { PositionLike, position_from_like } from "../Shape";

export interface PolygonAttributes {
    id: string;
    opacity: number;
    fill: Color,
    fillOpacity: number,
    stroke: Color,
    strokeOpacity: number,
    strokeWidth: number
}

export class Polygon extends Path implements PolygonAttributes {
    constructor(board: IBoard, points: PositionLike[] = [], attributes: Partial<PolygonAttributes> = {}) {

        const vertices = points
            .map((point) => position_from_like(point))
            .map((position, index) => new Anchor(position, index === 0 ? 'M' : 'L'));

        super(board, vertices, true, false, false, path_attributes(attributes));

        this.flagReset(true);
        this.update();
    }
}

function path_attributes(attributes: Partial<PolygonAttributes>): Partial<PathAttributes> {
    const retval: Partial<PathAttributes> = {
        id: attributes.id,
        opacity: attributes.opacity,
        fill: attributes.fill,
        fillOpacity: attributes.fillOpacity,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth
    };
    return retval;
}
