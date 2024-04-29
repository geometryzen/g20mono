import { effect, state } from 'g2o-reactive';
import { Anchor } from '../anchor';
import { Collection } from '../collection';
import { Color } from '../effects/ColorProvider';
import { Board } from '../IBoard';
import { G20 } from '../math/G20';
import { Path, PathAttributes } from '../Path';
import { Disposable, dispose } from '../reactive/Disposable';
import { PositionLike } from '../Shape';
import { HALF_PI, TWO_PI } from '../utils/math';
import { Commands } from '../utils/path-commands';

export interface CircleAttributes {
    position?: PositionLike;
    attitude?: G20;
    radius?: number;
    fill?: Color;
    fillOpacity?: number;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    resolution?: number;
}

export interface CircleProperties {
    X: G20;
    R: G20;
    position: G20;
    attitude: G20;
    radius: number;
    // radius$: Observable<number>;
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}

export class Circle extends Path implements CircleProperties {

    readonly #disposables: Disposable[] = [];

    readonly #radius = state(1);

    constructor(board: Board, options: CircleAttributes = {}) {

        // At least 2 vertices are required for proper circle.
        const N = options.resolution ? Math.max(options.resolution, 2) : 4;
        // These anchors will be placed on the circle during the update phase.
        const points: Anchor[] = [];
        for (let i = 0; i < N; i++) {
            points.push(new Anchor(G20.vector(0, 0)));
        }

        super(board, points, true, true, true, path_attributes(options));

        if (typeof options.radius === 'number') {
            this.#radius.set(options.radius);
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
        update_circle_vertices(this.radius, this.closed, this.vertices);
        super.update();
        return this;
    }

    flagReset(dirtyFlag = false): this {
        super.flagReset(dirtyFlag);
        return this;
    }

    get radius(): number {
        return this.#radius.get();
    }
    set radius(radius: number) {
        if (typeof radius === 'number') {
            this.#radius.set(radius);
        }
    }
}

function path_attributes(attributes: CircleAttributes): PathAttributes {
    const retval: PathAttributes = {
        attitude: attributes.attitude,
        position: attributes.position,
        fill: attributes.fill,
        fillOpacity: attributes.fillOpacity,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth
    };
    return retval;
}

function update_circle_vertices(radius: number, closed: boolean, vertices: Collection<Anchor>): void {

    let length = vertices.length;

    if (!closed && length > 2) {
        length -= 1;
    }

    // Coefficient for approximating circular arcs with Bezier curves
    const c = (4 / 3) * Math.tan(Math.PI / (length * 2));
    const rc = radius * c;

    const cos = Math.cos;
    const sin = Math.sin;

    for (let i = 0; i < vertices.length; i++) {
        const pct = i / length;
        const theta = pct * TWO_PI;

        const x = radius * cos(theta);
        const y = radius * sin(theta);

        const lx = rc * cos(theta - HALF_PI);
        const ly = rc * sin(theta - HALF_PI);

        const rx = rc * cos(theta + HALF_PI);
        const ry = rc * sin(theta + HALF_PI);

        const v = vertices.getAt(i);

        v.command = i === 0 ? Commands.move : Commands.curve;
        v.origin.set(x, y);
        v.controls.a.set(lx, ly);
        v.controls.b.set(rx, ry);
    }

}
