import { Anchor, Board, Collection, Color, Disposable, dispose, G20, Path, PathOptions, SpinorLike, VectorLike } from "@g20/core";
import { effect, signal } from "@g20/reactive";
import { default_color } from "./default_color";
import { default_number } from "./default_number";
import { default_closed_path_stroke_width } from "./default_stroke_width";

export interface RoundedRectangleOptions extends PathOptions {
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
    height?: number;
    width?: number;
}

export class RoundedRectangle extends Path {
    readonly #trash: Disposable[] = [];

    readonly #width = signal(Math.SQRT2);
    readonly #height = signal(Math.SQRT2);

    readonly #radius = signal(0.2);

    constructor(owner: Board, options: RoundedRectangleOptions = {}) {
        if (typeof options.radius === "undefined" && typeof options.width === "number" && typeof options.height === "number") {
            options.radius = Math.floor(Math.min(options.width, options.height) / 12);
        }

        const points: Anchor[] = [];
        for (let i = 0; i < 10; i++) {
            const origin = G20.vector(0, 0);
            const command = i === 0 ? "M" : "C";
            points.push(new Anchor(origin, command));
        }

        super(owner, points, true, false, true, path_options_from_rounded_rectangle_options(options, owner));

        if (typeof options.width === "number") {
            this.width = options.width;
        }

        if (typeof options.height === "number") {
            this.height = options.height;
        }

        if (typeof options.radius === "number") {
            this.radius = options.radius;
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
        update_vertices(this.width, this.height, this.radius, this.vertices);
        super.update();
        return this;
    }

    get width(): number {
        return this.#width.get();
    }
    set width(width: number) {
        this.#width.set(width);
    }

    get height(): number {
        return this.#height.get();
    }
    set height(height: number) {
        this.#height.set(height);
    }

    get radius(): number {
        return this.#radius.get();
    }
    set radius(radius: number) {
        this.#radius.set(radius);
    }
}

function path_options_from_rounded_rectangle_options(options: RoundedRectangleOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        attitude: options.attitude,
        opacity: options.opacity,
        position: options.position,
        visibility: options.visibility,
        fillColor: default_color(options.fillColor, owner.defaults.polygon.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.polygon.fillOpacity),
        strokeColor: default_color(options.strokeColor, owner.defaults.polygon.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.polygon.strokeOpacity),
        strokeWidth: default_closed_path_stroke_width(options.strokeWidth, owner)
    };
    return retval;
}

function update_vertices(width: number, height: number, radius: number, vertices: Collection<Anchor>) {
    const rx = radius;
    const ry = radius;

    let v: Anchor;
    const w = width / 2;
    const h = height / 2;

    v = vertices.getAt(0);
    v.x = -(w - rx);
    v.y = -h;

    // Upper Right Corner

    v = vertices.getAt(1);
    v.x = w - rx;
    v.y = -h;
    v.controls.a.clear();
    v.controls.b.x = rx;
    v.controls.b.y = 0;

    v = vertices.getAt(2);
    v.x = w;
    v.y = -(h - ry);
    v.controls.b.clear();
    v.controls.a.clear();

    // Bottom Right Corner

    v = vertices.getAt(3);
    v.x = w;
    v.y = h - ry;
    v.controls.a.clear();
    v.controls.b.x = 0;
    v.controls.b.y = ry;

    v = vertices.getAt(4);
    v.x = w - rx;
    v.y = h;
    v.controls.b.clear();
    v.controls.a.clear();

    // Bottom Left Corner

    v = vertices.getAt(5);
    v.x = -(w - rx);
    v.y = h;
    v.controls.a.clear();
    v.controls.b.x = -rx;
    v.controls.b.y = 0;

    v = vertices.getAt(6);
    v.x = -w;
    v.y = h - ry;
    v.controls.a.clear();
    v.controls.b.clear();

    // Upper Left Corner

    v = vertices.getAt(7);
    v.x = -w;
    v.y = -(h - ry);
    v.controls.a.clear();
    v.controls.b.x = 0;
    v.controls.b.y = -ry;

    v = vertices.getAt(8);
    v.x = -(w - rx);
    v.y = -h;
    v.controls.a.clear();
    v.controls.b.clear();

    v = vertices.getAt(9);
    v.copy(vertices.getAt(8));
}
