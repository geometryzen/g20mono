import { effect } from 'g2o-reactive';
import { Anchor } from '../anchor';
import { Collection } from '../collection';
import { Color } from '../effects/ColorProvider';
import { Board } from '../Board';
import { G20, SpinorLike, VectorLike } from '../math/G20';
import { Path, PathOptions } from '../Path';
import { Disposable, dispose } from '../reactive/Disposable';
import { default_color } from '../utils/default_color';
import { default_closed_path_stroke_width } from '../utils/default_stroke_width';
import { HALF_PI, TWO_PI } from '../utils/math';
import { Commands } from '../utils/path-commands';

const cos = Math.cos, sin = Math.sin;

export interface EllipseOptions extends PathOptions {
    id?: string;
    fillColor?: Color;
    fillOpacity?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    rx?: number;
    ry?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    resolution?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export class Ellipse extends Path {

    readonly #disposables: Disposable[] = [];

    readonly #radius = G20.vector(1, 0.5);

    constructor(owner: Board, options: EllipseOptions = {}) {

        const amount = options.resolution ? Math.max(options.resolution, 2) : 4;
        const points = [];
        for (let i = 0; i < amount; i++) {
            points.push(new Anchor(G20.vector(0, 0)));
        }

        super(owner, points, true, true, true, path_attribs_from_ellipse_attribs(options, owner));

        if (typeof options.rx === 'number') {
            this.rx = options.rx;
        }

        if (typeof options.ry === 'number') {
            this.ry = options.ry;
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

function path_attribs_from_ellipse_attribs(options: EllipseOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        fillColor: default_color(options.fillColor, 'none'),
        fillOpacity: options.fillOpacity,
        attitude: options.attitude,
        position: options.position,
        strokeColor: default_color(options.strokeColor, 'gray'),
        strokeOpacity: options.strokeOpacity,
        strokeWidth: default_closed_path_stroke_width(options.strokeWidth, owner),
        visibility: options.visibility
    };
    return retval;
}
