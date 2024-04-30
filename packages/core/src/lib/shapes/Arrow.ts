import { Anchor } from "../anchor";
import { Collection } from "../collection";
import { Color } from "../effects/ColorProvider";
import { Board } from "../IBoard";
import { G20 } from "../math/G20";
import { Path, PathAttributes } from "../Path";
import { Disposable, dispose } from '../reactive/Disposable';
import { PositionLike, position_from_like } from "../Shape";
import { Commands } from "../utils/path-commands";

export interface ArrowAttributes {
    id?: string;
    headLength?: number;
    position?: PositionLike;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'hidden' | 'visible' | 'collapse';
}

export interface ArrowProperties {
    X: G20;
    position: G20;
    R: G20;
    attitude: G20;
    axis: G20;
    headLength: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}

export class Arrow extends Path implements ArrowProperties {
    readonly #disposables: Disposable[] = [];
    readonly #axis: G20;
    readonly #headLength: G20;
    readonly #origin: G20;
    constructor(owner: Board, axis: PositionLike, attributes: ArrowAttributes = {}) {

        const vertices = [
            new Anchor(G20.vector(0, 0), Commands.move),    // tail
            new Anchor(G20.vector(0, 0), Commands.line),    // head
            new Anchor(G20.vector(0, 0), Commands.move),    // port head
            new Anchor(G20.vector(0, 0), Commands.line),    // port tail
            new Anchor(G20.vector(0, 0), Commands.move),    // stbd head
            new Anchor(G20.vector(0, 0), Commands.line),    // stbd tail
        ];

        super(owner, vertices, false, false, true, path_attribs_from_arrow_attribs(attributes));

        this.#origin = G20.zero.clone();

        this.#axis = position_from_like(axis);

        if (typeof attributes.headLength === 'number') {
            // We're hitting the internal property so that we don't trigger a vertex update.
            this.#headLength = G20.scalar(attributes.headLength);
        }
        else {
            this.#headLength = G20.scalar(0.25);
        }

        this.noFill();
        this.cap = 'round';
        this.join = 'round';

        this.#disposables.push(this.#axis.change$.subscribe(() => {
            this.update();
        }));
        this.#disposables.push(this.#headLength.change$.subscribe(() => {
            this.update();
        }));
        this.#disposables.push(this.#origin.change$.subscribe(() => {
            this.update();
        }));
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
    set axis(axis: G20) {
        if (axis instanceof G20) {
            this.#axis.copyVector(axis);
        }
    }
    get headLength(): number {
        return this.#headLength.a;
    }
    set headLength(headLength: number) {
        if (typeof headLength === 'number') {
            if (this.headLength !== headLength) {
                this.#headLength.set(0, 0, headLength, 0);
            }
        }
    }
    get origin(): G20 {
        return this.#origin;
    }
    set origin(origin: G20) {
        if (origin instanceof G20) {
            this.#origin.copyVector(origin);
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

function path_attribs_from_arrow_attribs(attributes: ArrowAttributes): PathAttributes {
    const retval: PathAttributes = {
        id: attributes.id,
        // attitude: attributes.attitude,
        // opacity: attributes.opacity,
        position: attributes.position,
        // visibility: attributes.visibility,
        // fill: attributes.fill,
        // fillOpacity: attributes.fillOpacity,
        stroke: attributes.stroke,
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: attributes.strokeWidth,
        visibility: attributes.visibility
    };
    return retval;
}
