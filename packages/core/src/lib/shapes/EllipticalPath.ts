import { effect } from 'g2o-reactive';
import { Anchor } from '../anchor.js';
import { Collection } from '../collection.js';
import { Color } from '../effects/ColorProvider.js';
import { Flag } from '../Flag.js';
import { IBoard } from '../IBoard.js';
import { G20 } from '../math/G20.js';
import { Path, PathAttributes } from '../path.js';
import { Disposable, dispose } from '../reactive/Disposable.js';
import { PositionLike } from '../Shape.js';
import { HALF_PI, TWO_PI } from '../utils/math.js';
import { Commands } from '../utils/path-commands.js';

const cos = Math.cos, sin = Math.sin;

export interface EllipseAttributes {
    id?: string;
    fill?: Color;
    fillOpacity?: number;
    position?: PositionLike;
    attitude?: G20;
    rx?: number;
    ry?: number;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    resolution?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export class EllipticalPath extends Path {

    readonly #disposables: Disposable[] = [];

    readonly #radius = G20.vector(1, 1);

    constructor(board: IBoard, attributes: EllipseAttributes = {}) {

        const amount = attributes.resolution ? Math.max(attributes.resolution, 2) : 4;
        const points = [];
        for (let i = 0; i < amount; i++) {
            points.push(new Anchor(G20.vector(0, 0)));
        }

        super(board, points, true, true, true, path_attribs_from_ellipse_attribs(attributes));

        if (typeof attributes.rx === 'number') {
            this.rx = attributes.rx;
        }

        if (typeof attributes.ry === 'number') {
            this.height = attributes.ry * 2;
        }

        this.#disposables.push(effect(() => {
            this.update();
        }));

        this.flagReset(true);
    }
    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }

    override update(): this {
        update_ellipse_vertices(this.width / 2, this.height / 2, this.closed, this.vertices);
        // Nothing will happen if the Flag.Vertices is not set.
        this.zzz.flags[Flag.Vertices] = true;
        super.update();
        return this;
    }

    override flagReset(dirtyFlag = false): this {
        super.flagReset(dirtyFlag);
        return this;
    }
    get rx(): number {
        return this.#radius.x;
    }
    set rx(rx: number) {
        this.#radius.x = rx;
    }
    get ry(): number {
        return this.#radius.y;
    }
    set ry(ry: number) {
        this.#radius.y = ry;
    }
    get height(): number {
        return this.#radius.y * 2;
    }
    set height(height: number) {
        this.#radius.y = height / 2;
    }
    get width(): number {
        return this.#radius.x * 2;
    }
    set width(width: number) {
        this.#radius.x = width / 2;
    }
}

function update_ellipse_vertices(radiusX: number, radiusY: number, closed: boolean, vertices: Collection<Anchor>): void {

    let length = vertices.length;

    if (!closed && length > 2) {
        length -= 1;
    }

    // Coefficient for approximating circular arcs with Bezier curves
    const c = (4 / 3) * Math.tan(Math.PI / (vertices.length * 2));

    for (let i = 0; i < vertices.length; i++) {
        const pct = i / length;
        const theta = pct * TWO_PI;

        const x = radiusX * cos(theta);
        const y = radiusY * sin(theta);

        const ax = radiusX * c * cos(theta - HALF_PI);
        const ay = radiusY * c * sin(theta - HALF_PI);

        const bx = radiusX * c * cos(theta + HALF_PI);
        const by = radiusY * c * sin(theta + HALF_PI);

        const v = vertices.getAt(i);

        v.command = (i === 0) ? Commands.move : Commands.curve;
        v.origin.set(x, y);
        v.controls.a.set(ax, ay);
        v.controls.b.set(bx, by);
    }
}

function path_attribs_from_ellipse_attribs(attributes: EllipseAttributes): PathAttributes {
    const retval: PathAttributes = {
        id: attributes.id,
        fill: attributes.fill,
        fillOpacity: attributes.fillOpacity,
        attitude: attributes.attitude,
        position: attributes.position,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth,
        visibility: attributes.visibility
    };
    return retval;
}
