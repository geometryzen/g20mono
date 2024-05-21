import { Anchor, Board, Collection, Color, Disposable, dispose, G20, Path, PathOptions, SpinorLike, VectorLike } from "@g20/core";
import { effect, signal } from "@g20/reactive";
import { default_color } from "./default_color";
import { default_closed_path_stroke_width } from "./default_stroke_width";

export interface StarOptions extends PathOptions {
    id?: string;
    fillColor?: Color;
    fillOpacity?: number;
    opacity?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    radius?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: "visible" | "hidden" | "collapse";
    innerRadius?: number;
    outerRadius?: number;
    points?: number;
    twist?: number;
}

const cos = Math.cos,
    sin = Math.sin;

export class Star extends Path {
    readonly #trash: Disposable[] = [];

    readonly #innerRadius = signal(0.5);
    readonly #outerRadius = signal(1);
    readonly #points = signal(8);
    readonly #twist = signal(0);

    constructor(owner: Board, options: StarOptions = {}) {
        super(owner, [], true, false, true, path_options_from_star_options(options, owner));

        if (typeof options.innerRadius === "number") {
            this.innerRadius = options.innerRadius;
        }

        if (typeof options.outerRadius === "number") {
            this.outerRadius = options.outerRadius;
        }

        if (typeof options.points === "number") {
            this.points = options.points;
        }

        if (typeof options.twist === "number") {
            this.twist = options.twist;
        }

        this.#trash.push(
            effect(() => {
                this.update();
            })
        );
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
        const theta = (2 * Math.PI * i) / sides + twist;
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const x = r * cos(theta);
        const y = r * sin(theta);
        const vertex = vertices.getAt(i);
        vertex.origin.set(x, y);
        vertex.command = i === 0 ? "M" : "L";
    }
}

function path_options_from_star_options(options: StarOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        attitude: options.attitude,
        opacity: options.opacity,
        position: options.position,
        visibility: options.visibility,
        fillColor: default_color(options.fillColor, "none"),
        fillOpacity: options.fillOpacity,
        strokeColor: default_color(options.strokeColor, "gray"),
        strokeOpacity: options.strokeOpacity,
        strokeWidth: default_closed_path_stroke_width(options.strokeWidth, owner),
    };
    return retval;
}
