import { Anchor } from "../Anchor";
import { Board } from "../Board";
import { Collection } from "../collection";
import { Color } from "../effects/ColorProvider";
import { G20, SpinorLike, VectorLike } from "../math/G20";
import { Path, PathOptions } from "../Path";
import { Disposable, dispose } from "../reactive/Disposable";
import { Commands } from "../utils/Commands";
import { default_color } from "../utils/default_color";
import { default_number } from "../utils/default_number";
import { default_closed_path_stroke_width } from "../utils/default_stroke_width";
import { HALF_PI, TWO_PI } from "../utils/math";

export interface CircleOptions extends PathOptions {
    position?: VectorLike;
    attitude?: SpinorLike;
    radius?: number;
    fillColor?: Color;
    fillOpacity?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    resolution?: number;
}

export class Circle extends Path {
    readonly #disposables: Disposable[] = [];

    readonly #radius = G20.scalar(1);

    constructor(owner: Board, options: CircleOptions = {}) {
        // At least 2 vertices are required for proper circle.
        const N = options.resolution ? Math.max(options.resolution, 2) : 4;
        // These anchors will be placed on the circle during the update phase.
        const points: Anchor[] = [];
        for (let i = 0; i < N; i++) {
            points.push(new Anchor(G20.vector(0, 0)));
        }

        super(owner, points, true, true, true, path_options_from_circle_options(options, owner));

        if (typeof options.radius === "number") {
            this.#radius.set(0, 0, options.radius, 0);
        }

        this.#disposables.push(
            this.#radius.change$.subscribe(() => {
                this.update();
            })
        );

        this.flagReset(true);
    }

    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }

    override update(): this {
        update_circle_vertices(this.radius.a, this.vertices);
        super.update();
        return this;
    }

    get radius(): G20 {
        return this.#radius;
    }
    set radius(radius: G20 | number) {
        if (radius instanceof G20) {
            this.#radius.set(0, 0, radius.a, 0);
        } else if (typeof radius === "number") {
            this.#radius.set(0, 0, radius, 0);
        }
    }
}

function path_options_from_circle_options(options: CircleOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        attitude: options.attitude,
        dashes: options.dashes,
        fillColor: default_color(options.fillColor, owner.defaults.circle.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.circle.fillOpacity),
        opacity: options.opacity,
        position: options.position,
        plumb: options.plumb,
        strokeColor: default_color(options.strokeColor, owner.defaults.circle.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.circle.strokeOpacity),
        strokeWidth: default_closed_path_stroke_width(default_number(options.strokeWidth, owner.defaults.circle.strokeWidth), owner),
        sx: options.sx,
        sy: options.sy,
        vectorEffect: options.vectorEffect,
        visibility: options.visibility
    };
    return retval;
}

function update_circle_vertices(radius: number, vertices: Collection<Anchor>): void {
    const N = vertices.length;

    // Coefficient for approximating circular arcs with Bezier curves
    const c = (4 / 3) * Math.tan(Math.PI / (N * 2));
    const rc = radius * c;

    const cos = Math.cos;
    const sin = Math.sin;

    for (let i = 0; i < N; i++) {
        const theta = (i * TWO_PI) / N;

        const x = radius * cos(theta);
        const y = radius * sin(theta);

        const ax = rc * cos(theta - HALF_PI);
        const ay = rc * sin(theta - HALF_PI);

        const bx = rc * cos(theta + HALF_PI);
        const by = rc * sin(theta + HALF_PI);

        const v = vertices.getAt(i);

        v.command = i === 0 ? Commands.move : Commands.curve;
        v.origin.set(x, y);
        v.controls.a.set(ax, ay);
        v.controls.b.set(bx, by);
    }
}
