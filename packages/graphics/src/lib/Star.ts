import {
    Anchor,
    Board,
    Collection, Color, Disposable, dispose, G20,
    Path, PathAttributes, PositionLike
} from 'g2o';
import { effect, state } from 'g2o-reactive';

export interface StarAttributes {
    id?: string;
    fill?: Color;
    fillOpacity?: number;
    opacity?: number;
    position?: PositionLike,
    attitude?: G20,
    radius?: number;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
    innerRadius?: number;
    outerRadius?: number;
    points?: number;
    twist?: number;
}

const cos = Math.cos, sin = Math.sin;

export class Star extends Path {

    readonly #trash: Disposable[] = [];

    readonly #innerRadius = state(0.5);
    readonly #outerRadius = state(1);
    readonly #points = state(8);
    readonly #twist = state(0);

    constructor(board: Board, attributes: StarAttributes = {}) {

        super(board, [], true, false, true, path_attribs_from_star_attribs(attributes));

        if (typeof attributes.innerRadius === 'number') {
            this.innerRadius = attributes.innerRadius;
        }

        if (typeof attributes.outerRadius === 'number') {
            this.outerRadius = attributes.outerRadius;
        }

        if (typeof attributes.points === 'number') {
            this.points = attributes.points;
        }

        if (typeof attributes.twist === 'number') {
            this.twist = attributes.twist;
        }

        this.#trash.push(effect(() => {
            this.update();
        }));
    }

    override dispose(): void {
        dispose(this.#trash);
        super.dispose();
    }

    override update() {
        update_vertices(this.points, this.innerRadius, this.outerRadius, this.twist, this.vertices);
        super.update();
        return this;
    }

    get innerRadius(): number {
        return this.#innerRadius.get();
    }
    set innerRadius(innerRadius: number) {
        this.#innerRadius.set(innerRadius);
    }
    get outerRadius(): number {
        return this.#outerRadius.get();
    }
    set outerRadius(outerRadius: number) {
        this.#outerRadius.set(outerRadius);
    }
    get points(): number {
        return this.#points.get();
    }
    set points(points: number) {
        this.#points.set(points);
    }
    get twist(): number {
        return this.#twist.get();
    }
    set twist(twist: number) {
        this.#twist.set(twist);
    }
}

function update_vertices(points: number, innerRadius: number, outerRadius: number, twist: number, vertices: Collection<Anchor>) {

    const sides = 2 * points;
    const N = sides + 1;
    if (vertices.length > N) {
        vertices.splice(N, vertices.length - N);
    }
    while (vertices.length < N) {
        vertices.push(new Anchor(G20.vector(0, 0)));
    }

    for (let i = 0; i < N; i++) {

        const theta = (2 * Math.PI * i / sides) + twist;
        const r = (i % 2 === 0) ? outerRadius : innerRadius;
        const x = r * cos(theta);
        const y = r * sin(theta);
        const vertex = vertices.getAt(i);
        vertex.origin.set(x, y);
        vertex.command = (i === 0) ? 'M' : 'L';
    }
}

function path_attribs_from_star_attribs(attributes: StarAttributes): PathAttributes {
    const retval: PathAttributes = {
        id: attributes.id,
        attitude: attributes.attitude,
        opacity: attributes.opacity,
        position: attributes.position,
        visibility: attributes.visibility,
        fill: attributes.fill,
        fillOpacity: attributes.fillOpacity,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth
    };
    return retval;
}
