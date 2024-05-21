// import { effect } from "@g20/reactive";
import { Anchor } from '../Anchor';
import { Board } from '../Board';
import { Collection } from '../collection';
import { Color } from '../effects/ColorProvider';
import { G20, SpinorLike, VectorLike } from '../math/G20';
import { Path, PathOptions } from '../Path';
import { Disposable, dispose } from '../reactive/Disposable';
import { default_color } from '../utils/default_color';
import { default_closed_path_stroke_width } from '../utils/default_stroke_width';
import { HALF_PI, TWO_PI } from '../utils/math';
import { Commands } from '../utils/Commands';

const cos = Math.cos;
const sin = Math.sin;

const scratchX = G20.zero.clone();
const scratchY = G20.zero.clone();
const scratch = G20.zero.clone();

export interface EllipseOptions extends PathOptions {
    id?: string;
    fillColor?: Color;
    fillOpacity?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    rx?: number | VectorLike;
    ry?: number | VectorLike;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    resolution?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export class Ellipse extends Path {

    readonly #disposables: Disposable[] = [];

    readonly #rx: G20;
    readonly #ry: G20;

    constructor(owner: Board, options: EllipseOptions = {}) {
        const N = options.resolution ? Math.max(options.resolution, 2) : 4;
        const vertices: Anchor[] = [];
        for (let i = 0; i < N; i++) {
            vertices.push(new Anchor(G20.vector(0, 0)));
        }

        super(owner, vertices, true, true, true, path_options_from_ellipse_options(options, owner));

        {
            const rx = options.rx;
            if (rx instanceof G20) {
                this.#rx = rx;
            }
            else if (Array.isArray(rx)) {
                this.#rx = G20.vector(rx[0], rx[1]);
            }
            else if (typeof rx === 'number') {
                this.#rx = G20.ex.clone().scale(rx);
            }
            else {
                this.#rx = G20.ex.clone();
            }
        }

        {
            const ry = options.ry;
            if (ry instanceof G20) {
                this.#ry = ry;
            }
            else if (Array.isArray(ry)) {
                this.#ry = G20.vector(ry[0], ry[1]);
            }
            else if (typeof ry === 'number') {
                this.#ry = G20.ey.clone().scale(ry);
            }
            else {
                this.#ry = G20.ey.clone().scale(0.5);
            }
        }

        this.#disposables.push(this.rx.change$.subscribe(() => {
            this.update();
        }));

        this.#disposables.push(this.ry.change$.subscribe(() => {
            this.update();
        }));

        this.flagReset(true);
    }
    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }

    override update(): this {
        update_ellipse_vertices(this.#rx, this.#ry, this.vertices);
        super.update();
        return this;
    }

    get rx(): G20 {
        return this.#rx;
    }
    set rx(rx: G20) {
        this.#rx.copyVector(rx);
    }
    get ry(): G20 {
        return this.#ry;
    }
    set ry(ry: G20) {
        this.#ry.copyVector(ry);
    }
}

function update_ellipse_vertices(radiusX: G20, radiusY: G20, vertices: Collection<Anchor>): void {

    const N = vertices.length;

    // Coefficient for approximating circular arcs with Bezier curves
    // https://pomax.github.io/bezierinfo/#circles_cubic
    const c = (4 / 3) * Math.tan(Math.PI / (N * 2));

    for (let i = 0; i < N; i++) {
        const v = vertices.getAt(i);
        v.command = (i === 0) ? Commands.move : Commands.curve;

        const theta = i * TWO_PI / N;
        {
            scratchX.copyVector(radiusX).scale(cos(theta));
            scratchY.copyVector(radiusY).scale(sin(theta));
            scratch.copyVector(scratchX).add(scratchY);
            v.origin.copyVector(scratch);
        }
        {
            const thetaM = theta - HALF_PI;
            scratchX.copyVector(radiusX).scale(c * cos(thetaM));
            scratchY.copyVector(radiusY).scale(c * sin(thetaM));
            scratch.copyVector(scratchX).add(scratchY);
            v.controls.a.copyVector(scratch);
        }
        {
            const thetaP = theta + HALF_PI;
            scratchX.copyVector(radiusX).scale(c * cos(thetaP));
            scratchY.copyVector(radiusY).scale(c * sin(thetaP));
            scratch.copyVector(scratchX).add(scratchY);
            v.controls.b.copyVector(scratch);
        }
    }
}

function path_options_from_ellipse_options(options: EllipseOptions, owner: Board): PathOptions {
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
