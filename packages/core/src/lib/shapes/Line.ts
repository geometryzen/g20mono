import { Anchor } from '../anchor';
import { Board } from '../Board';
import { Color } from '../effects/ColorProvider';
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
    vectorEffect?: null | 'non-scaling-stroke' | 'none';
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
    set point1(point1: Anchor | VectorLike) {
        this.vertices.splice(0, 1, anchor_from_like(point1, 'M'));
    }
    get point2(): Anchor {
        return this.vertices.getAt(1);
    }
    set point2(point2: Anchor | VectorLike) {
        this.vertices.splice(1, 1, anchor_from_like(point2, 'L'));
    }
}

function anchor_from_like(like: Anchor | VectorLike, command: 'M' | 'L'): Anchor {
    if (like instanceof Anchor) {
        return like;
    }
    else {
        return new Anchor(vector_from_like(like), command);
    }
}

function path_attribs_from_line_attribs(options: LineOptions, owner: Board): PathOptions {
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
        strokeWidth: default_open_path_stroke_width(options.strokeWidth, owner),
        sx: options.sx,
        sy: options.sy,
        vectorEffect: options.vectorEffect,
        visibility: options.visibility
    };
    return retval;
}
