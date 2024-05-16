import { effect, signal } from "@g20/reactive";
import { Anchor } from '../anchor';
import { Board } from '../Board';
import { Collection } from '../collection';
import { Color } from '../effects/ColorProvider';
import { G20, SpinorLike, VectorLike } from '../math/G20';
import { Path, PathOptions } from '../Path';
import { Disposable, dispose } from '../reactive/Disposable';
import { default_color } from '../utils/default_color';
import { default_closed_path_stroke_width } from '../utils/default_stroke_width';

export interface RectangleOptions extends PathOptions {
    id?: string;
    opacity?: number;
    position?: VectorLike;
    attitude?: SpinorLike;
    width?: number;
    height?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
    fillColor?: Color;
    fillOpacity?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
}

export interface RectangleProperties {
    id: string;
    opacity: number;
    width: number;
    height: number;
    visibility: 'visible' | 'hidden' | 'collapse';
    X: G20;
    R: G20;
}

export class Rectangle extends Path implements RectangleProperties, Disposable {

    readonly #disposables: Disposable[] = [];

    readonly #width = signal(1);
    readonly #height = signal(1);

    readonly #origin = G20.zero.clone();

    constructor(owner: Board, attributes: RectangleOptions = {}) {

        const anchors = [
            new Anchor(G20.vector(0, 0), 'M'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L')
        ];

        super(owner, anchors, true, false, true, path_attribs_from_rectangle_attribs(attributes, owner));

        if (typeof attributes.width === 'number') {
            this.width = attributes.width;
        }

        if (typeof attributes.height === 'number') {
            this.height = attributes.height;
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
        update_rectangle_vertices(this.width, this.height, this.origin, this.vertices);
        super.update();
        return this;
    }

    override flagReset(dirtyFlag = false): this {
        super.flagReset(dirtyFlag);
        return this;
    }

    get height(): number {
        return this.#height.get();
    }
    set height(height: number) {
        if (typeof height === 'number') {
            this.#height.set(height);
        }
    }
    get origin(): G20 {
        return this.#origin;
    }
    set origin(origin: VectorLike) {
        if (origin instanceof G20) {
            this.#origin.copyVector(origin);
        }
        else if (Array.isArray(origin)) {
            this.#origin.set(origin[0], origin[1]);
        }
    }
    get width(): number {
        return this.#width.get();
    }
    set width(width: number) {
        if (typeof width === 'number') {
            this.#width.set(width);
        }
    }
}

function path_attribs_from_rectangle_attribs(attributes: RectangleOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: attributes.id,
        attitude: attributes.attitude,
        opacity: attributes.opacity,
        position: attributes.position,
        visibility: attributes.visibility,
        fillColor: default_color(attributes.fillColor, 'none'),
        fillOpacity: attributes.fillOpacity,
        strokeColor: default_color(attributes.strokeColor, 'gray'),
        strokeOpacity: attributes.strokeOpacity,
        strokeWidth: default_closed_path_stroke_width(attributes.strokeWidth, owner),
        vectorEffect: attributes.vectorEffect
    };
    return retval;
}

function update_rectangle_vertices(width: number, height: number, origin: G20, vertices: Collection<Anchor>): void {

    const x = width / 2;
    const y = height / 2;

    vertices.getAt(0).origin.set(-x, -y).sub(origin);
    vertices.getAt(1).origin.set(x, -y).sub(origin);
    vertices.getAt(2).origin.set(x, y).sub(origin);
    vertices.getAt(3).origin.set(-x, y).sub(origin);
}