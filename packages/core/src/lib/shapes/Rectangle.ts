import { Anchor } from "../Anchor";
import { Board } from "../Board";
import { Collection } from "../collection";
import { Color } from "../effects/ColorProvider";
import { G20, SpinorLike, VectorLike } from "../math/G20";
import { Path, PathOptions } from "../Path";
import { Disposable, dispose } from "../reactive/Disposable";
import { default_color } from "../utils/default_color";
import { default_number } from "../utils/default_number";
import { default_closed_path_stroke_width } from "../utils/default_stroke_width";

const scratch: G20 = G20.zero.clone();

export interface RectangleOptions extends PathOptions {
    id?: string;
    opacity?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    width?: number | VectorLike;
    height?: number | VectorLike;
    visibility?: "visible" | "hidden" | "collapse";
    fillColor?: Color;
    fillOpacity?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
}

export class Rectangle extends Path implements Disposable {
    readonly #disposables: Disposable[] = [];

    /**
     * The "width" vector.
     */
    readonly #width: G20;
    /**
     * The "height" vector.
     */
    readonly #height: G20;

    readonly #origin = G20.zero.clone();

    constructor(owner: Board, attributes: RectangleOptions = {}) {
        const anchors = [new Anchor(G20.vector(0, 0), "M"), new Anchor(G20.vector(0, 0), "L"), new Anchor(G20.vector(0, 0), "L"), new Anchor(G20.vector(0, 0), "L")];

        super(owner, anchors, true, false, true, path_options_from_rectangle_options(attributes, owner));

        {
            const width = attributes.width;
            if (width instanceof G20) {
                this.#width = width;
            } else if (Array.isArray(width)) {
                this.#width = G20.vector(width[0], width[1]);
            } else if (typeof width === "number") {
                this.#width = G20.vector(width, 0);
            } else {
                this.#width = G20.ex.clone();
            }
        }

        {
            const height = attributes.height;
            if (height instanceof G20) {
                this.#height = height;
            } else if (Array.isArray(height)) {
                this.#height = G20.vector(height[0], height[1]);
            } else if (typeof height === "number") {
                this.#height = G20.vector(0, height);
            } else {
                this.#height = G20.ey.clone();
            }
        }

        this.#disposables.push(
            this.#width.change$.subscribe(() => {
                this.update();
            })
        );

        this.#disposables.push(
            this.#height.change$.subscribe(() => {
                this.update();
            })
        );

        this.#disposables.push(
            this.#origin.change$.subscribe(() => {
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
        update_rectangle_vertices(this.#width, this.#height, this.#origin, this.vertices);
        super.update();
        return this;
    }

    override flagReset(dirtyFlag = false): this {
        super.flagReset(dirtyFlag);
        return this;
    }

    get height(): G20 {
        return this.#height;
    }
    set height(height: number | VectorLike) {
        if (height instanceof G20) {
            this.#height.copyVector(height);
        } else if (Array.isArray(height)) {
            this.#height.set(height[0], height[1]);
        } else if (typeof height === "number") {
            this.#height.set(0, height, 0, 0);
        }
    }
    get origin(): G20 {
        return this.#origin;
    }
    set origin(origin: VectorLike) {
        if (origin instanceof G20) {
            this.#origin.copyVector(origin);
        } else if (Array.isArray(origin)) {
            this.#origin.set(origin[0], origin[1]);
        }
    }
    get width(): G20 {
        return this.#width;
    }
    set width(width: number | VectorLike) {
        if (width instanceof G20) {
            this.#width.copyVector(width);
        } else if (Array.isArray(width)) {
            this.#width.set(width[0], width[1]);
        } else if (typeof width === "number") {
            this.#width.set(width, 0, 0, 0);
        }
    }
}

function path_options_from_rectangle_options(options: RectangleOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        attitude: options.attitude,
        dashes: options.dashes,
        fillColor: default_color(options.fillColor, owner.defaults.rectangle.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.rectangle.fillOpacity),
        opacity: options.opacity,
        plumb: options.plumb,
        position: options.position,
        strokeColor: default_color(options.strokeColor, owner.defaults.rectangle.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.rectangle.strokeOpacity),
        strokeWidth: default_closed_path_stroke_width(default_number(options.strokeWidth, owner.defaults.rectangle.strokeWidth), owner),
        sx: options.sx,
        sy: options.sy,
        vectorEffect: options.vectorEffect,
        visibility: options.visibility
    };
    return retval;
}

function update_rectangle_vertices(width: G20, height: G20, origin: G20, vertices: Collection<Anchor>): void {
    // Lower, left.
    scratch.set(0, 0).sub(width).sub(height).scale(0.5).sub(origin);
    vertices.getAt(0).origin.copyVector(scratch);

    // Lower, right.
    scratch.set(0, 0).add(width).sub(height).scale(0.5).sub(origin);
    vertices.getAt(1).origin.copyVector(scratch);

    // Upper, right.
    scratch.set(0, 0).add(width).add(height).scale(0.5).sub(origin);
    vertices.getAt(2).origin.copyVector(scratch);

    // Upper, left.
    scratch.set(0, 0).sub(width).add(height).scale(0.5).sub(origin);
    vertices.getAt(3).origin.copyVector(scratch);
}
