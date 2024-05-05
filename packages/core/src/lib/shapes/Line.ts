import { Anchor } from '../anchor';
import { Color } from '../effects/ColorProvider';
import { Board } from '../IBoard';
import { VectorLike, vector_from_like } from '../math/G20';
import { Path, PathOptions } from '../Path';
import { default_color } from '../utils/default_color';
import { default_open_path_stroke_width } from '../utils/default_stroke_width';

export interface LineOptions extends PathOptions {
    id?: string,
    dashes?: number[],
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    vectorEffect?: null | 'non-scaling-stroke';
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
    constructor(owner: Board, point1: VectorLike, point2: VectorLike, options: LineOptions = {}) {
        const vertex1 = new Anchor(vector_from_like(point1), 'M');
        const vertex2 = new Anchor(vector_from_like(point2), 'L');
        super(owner, [vertex1, vertex2],
            false,
            false,
            false,
            path_attribs_from_line_attribs(options, owner));
    }
    override dispose(): void {
        super.dispose();
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

function path_attribs_from_line_attribs(options: LineOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        dashes: options.dashes,
        strokeColor: default_color(options.strokeColor, 'gray'),
        strokeOpacity: options.strokeOpacity,
        strokeWidth: default_open_path_stroke_width(options.strokeWidth, owner),
        vectorEffect: options.vectorEffect,
        visibility: options.visibility
    };
    return retval;
}
