import { Anchor } from '../anchor';
import { Color } from '../effects/ColorProvider';
import { IBoard } from '../IBoard';
import { Path, PathAttributes } from '../path';
import { PositionLike, position_from_like } from '../Shape';

export interface LineAttributes {
    id?: string,
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export interface LineProperties {
    id?: string,
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export class Line extends Path implements LineProperties {
    constructor(board: IBoard, point1: PositionLike, point2: PositionLike, attributes: LineAttributes = {}) {
        super(board, [
            new Anchor(position_from_like(point1), 'M'),
            new Anchor(position_from_like(point2), 'L')],
            false,
            false,
            false,
            path_attribs_from_line_attribs(attributes));
    }
    get point1(): Anchor {
        return this.vertices.getAt(0);
    }
    set point1(point1: Anchor) {
        if (point1 instanceof Anchor) {
            this.vertices.splice(0, 1, point1);
        }
        else {
            const error = new Error('Line.point1 argument is not an Anchor.');
            // eslint-disable-next-line no-console
            console.warn(error.name, error.message);
        }
    }
    get point2(): Anchor {
        return this.vertices.getAt(1);
    }
    set point2(point2: Anchor) {
        if (point2 instanceof Anchor) {
            this.vertices.splice(1, 1, point2);
        }
        else {
            const error = new Error('Line.point2 argument is not an Anchor.');
            // eslint-disable-next-line no-console
            console.warn(error.name, error.message);
        }
    }
}

function path_attribs_from_line_attribs(attributes: LineAttributes): Partial<PathAttributes> {
    const retval: Partial<PathAttributes> = {
        id: attributes.id,
        visibility: attributes.visibility,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth
    };
    return retval;
}
