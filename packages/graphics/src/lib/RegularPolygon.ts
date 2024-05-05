import {
    Anchor,
    Board,
    Collection,
    Color,
    Disposable,
    dispose,
    G20,
    Path,
    PathOptions,
    SpinorLike,
    VectorLike
} from 'g2o';
import { effect, state } from 'g2o-reactive';

const cos = Math.cos;
const sin = Math.sin;

export interface RegularPolygonOptions extends PathOptions {
    id?: string;
    fillColor?: Color;
    fillOpacity?: number;
    opacity?: number;
    position?: VectorLike,
    attitude?: SpinorLike,
    radius?: number;
    sides?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    twist?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export class RegularPolygon extends Path {

    readonly #trash: Disposable[] = [];

    readonly #radius = state(1);
    readonly #twist = state(0);
    readonly #sides = state(6);

    constructor(board: Board, options: RegularPolygonOptions = {}) {

        super(board, [], true, false, true, path_attribs_from_regular_polygon_attribs(options));

        if (typeof options.radius === 'number') {
            this.radius = options.radius;
        }

        if (typeof options.sides === 'number') {
            const MIN = 3;
            const MAX = 24;
            this.sides = Math.min(Math.max(options.sides, MIN), MAX);
        }

        if (typeof options.twist === 'number') {
            this.twist = options.twist;
        }

        this.#trash.push(effect(() => {
            this.update();
        }));

        this.flagReset(true);
    }

    override dispose(): void {
        dispose(this.#trash);
        super.dispose();
    }

    override update(): this {
        update_vertices(this.radius, this.sides, this.twist, this.vertices);
        super.update();
        return this;
    }

    override flagReset(dirtyFlag = false): this {
        super.flagReset(dirtyFlag);
        return this;
    }

    get radius(): number {
        return this.#radius.get();
    }
    set radius(radius: number) {
        this.#radius.set(radius);
    }
    get sides(): number {
        return this.#sides.get();
    }
    set sides(sides: number) {
        this.#sides.set(sides);
    }
    get twist(): number {
        return this.#twist.get();
    }
    set twist(twist: number) {
        this.#twist.set(twist);
    }
}

function path_attribs_from_regular_polygon_attribs(options: RegularPolygonOptions): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        attitude: options.attitude,
        opacity: options.opacity,
        position: options.position,
        visibility: options.visibility,
        fillColor: options.fillColor,
        fillOpacity: options.fillOpacity,
        strokeColor: options.strokeColor,
        strokeOpacity: options.strokeOpacity,
        strokeWidth: options.strokeWidth,
        // plumb: attributes.plumb
    };
    return retval;
}

function update_vertices(radius: number, sides: number, twist: number, vertices: Collection<Anchor>): void {

    const N = sides + 1;
    if (vertices.length > N) {
        vertices.splice(N, vertices.length - N);
    }
    while (vertices.length < N) {
        vertices.push(new Anchor(G20.vector(0, 0)));
    }

    for (let i = 0; i < N; i++) {

        const theta = (2 * Math.PI * i / sides) + twist;
        const x = radius * cos(theta);
        const y = radius * sin(theta);
        const vertex = vertices.getAt(i);
        vertex.origin.set(x, y);
        vertex.command = (i === 0) ? 'M' : 'L';
    }
}
