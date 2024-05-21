import { Anchor } from "../Anchor";
import { Board } from "../Board";
import { Collection } from "../collection";
import { Color } from "../effects/ColorProvider";
import { G20, SpinorLike, VectorLike, vector_from_like } from "../math/G20";
import { Path, PathOptions } from "../Path";
import { Disposable, dispose } from "../reactive/Disposable";
import { Commands } from "../utils/Commands";
import { default_color } from "../utils/default_color";
import { default_number } from "../utils/default_number";
import { default_open_path_stroke_width } from "../utils/default_stroke_width";

export interface ArrowOptions extends PathOptions {
    id?: string;
    headLength?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    vectorEffect?: null | "non-scaling-stroke";
    visibility?: "hidden" | "visible" | "collapse";
}

export class Arrow extends Path {
    readonly #disposables: Disposable[] = [];
    readonly #axis: G20;
    readonly #headLength: G20;
    readonly #origin: G20;
    constructor(owner: Board, axis: VectorLike, options: ArrowOptions = {}) {
        const vertices = [
            new Anchor(G20.vector(0, 0), Commands.move), // tail
            new Anchor(G20.vector(0, 0), Commands.line), // head
            new Anchor(G20.vector(0, 0), Commands.move), // port head
            new Anchor(G20.vector(0, 0), Commands.line), // port tail
            new Anchor(G20.vector(0, 0), Commands.move), // stbd head
            new Anchor(G20.vector(0, 0), Commands.line) // stbd tail
        ];

        super(owner, vertices, false, false, true, path_attribs_from_arrow_attribs(options, owner));

        this.#axis = vector_from_like(axis);

        if (typeof options.headLength === "number") {
            // We're hitting the internal property so that we don't trigger a vertex update.
            this.#headLength = G20.scalar(options.headLength);
        } else {
            this.#headLength = G20.scalar(0.2);
        }

        this.#origin = G20.zero.clone();

        this.noFill();
        this.cap = "round";
        this.join = "round";

        this.#disposables.push(
            this.axis.change$.subscribe(() => {
                this.update();
            })
        );
        this.#disposables.push(
            this.#headLength.change$.subscribe(() => {
                this.update();
            })
        );
        this.#disposables.push(
            this.#origin.change$.subscribe(() => {
                this.update();
            })
        );
    }
    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }
    override update(): this {
        update_arrow_vertices(this.axis, this.headLength, this.origin, this.vertices);
        super.update();
        return this;
    }
    override flagReset(dirtyFlag = false): this {
        super.flagReset(dirtyFlag);
        return this;
    }
    get axis(): G20 {
        return this.#axis;
    }
    set axis(axis: VectorLike) {
        if (axis instanceof G20) {
            this.#axis.copyVector(axis);
        } else if (Array.isArray(axis)) {
            this.#axis.set(axis[0], axis[1]);
        }
    }
    get headLength(): number {
        return this.#headLength.a;
    }
    set headLength(headLength: number) {
        if (typeof headLength === "number") {
            if (this.headLength !== headLength) {
                this.#headLength.set(0, 0, headLength, 0);
            }
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
}

function update_arrow_vertices(axis: G20, headLength: number, origin: G20, vertices: Collection<Anchor>): void {
    const θ = Math.atan2(axis.y, axis.x);
    // This angle gives an arrow head that is an equilateral triangle.
    // const φ = Math.PI / 6;
    // This design gives an arrow head that fits into a golden ratio box.
    const golden = (1 + Math.sqrt(5)) / 2;
    const φ = Math.atan2(0.5, golden);

    const tail = vertices.getAt(0);
    const head = vertices.getAt(1);
    const port_head = vertices.getAt(2);
    const port_tail = vertices.getAt(3);
    const stbd_head = vertices.getAt(4);
    const stbd_tail = vertices.getAt(5);

    tail.origin.set(0, 0).sub(origin);
    head.origin.copyVector(axis).sub(origin);

    port_head.origin.copyVector(axis).sub(origin);
    port_tail.origin.set(axis.x - headLength * Math.cos(θ - φ), axis.y - headLength * Math.sin(θ - φ)).sub(origin);

    stbd_head.origin.copyVector(axis).sub(origin);
    stbd_tail.origin.set(axis.x - headLength * Math.cos(θ + φ), axis.y - headLength * Math.sin(θ + φ)).sub(origin);
}

function path_attribs_from_arrow_attribs(options: ArrowOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        attitude: options.attitude,
        dashes: options.dashes,
        fillColor: default_color(options.fillColor, owner.defaults.arrow.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.arrow.fillOpacity),
        opacity: options.opacity,
        plumb: options.plumb,
        position: options.position,
        strokeColor: default_color(options.strokeColor, owner.defaults.arrow.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.arrow.strokeOpacity),
        strokeWidth: default_open_path_stroke_width(default_number(options.strokeWidth, owner.defaults.arrow.strokeWidth), owner),
        sx: options.sx,
        sy: options.sy,
        vectorEffect: options.vectorEffect,
        visibility: options.visibility
    };
    return retval;
}
