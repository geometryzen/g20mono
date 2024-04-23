import { Anchor } from '../anchor';
import { Collection } from '../collection';
import { Color } from '../effects/ColorProvider';
import { Flag } from '../Flag';
import { IBoard } from '../IBoard';
import { G20 } from '../math/G20';
import { Path, PathAttributes } from '../path';
import { Disposable, dispose } from '../reactive/Disposable';
import { variable } from '../reactive/variable';
import { PositionLike } from '../Shape';

export interface RectangleAPI<X> {
    id: string;
    opacity: number;
    position: X;
    attitude: G20;
    width: number;
    height: number;
    visibility: 'visible' | 'hidden' | 'collapse';
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}

export interface RectangleAttributes extends Partial<RectangleAPI<PositionLike>> {
    id?: string;
    opacity?: number;
    position?: PositionLike;
    attitude?: G20;
    width?: number;
    height?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}

export interface RectangleProperties extends RectangleAPI<G20> {
    id: string;
    opacity: number;
    position: G20;
    attitude: G20;
    width: number;
    height: number;
    visibility: 'visible' | 'hidden' | 'collapse';
}

export class Rectangle extends Path implements RectangleProperties, Disposable {

    readonly #disposables: Disposable[] = [];

    readonly #width = variable(1);
    readonly #height = variable(1);

    readonly #origin = G20.zero.clone();

    constructor(board: IBoard, attributes: RectangleAttributes = {}) {

        const points = [
            new Anchor(G20.vector(0, 0), 'M'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L')
        ];

        super(board, points, true, false, true, path_options_from_rectangle_options(attributes));

        this.zzz.width$ = this.#width.asObservable();
        this.zzz.height$ = this.#height.asObservable();

        if (typeof attributes.width === 'number') {
            this.width = attributes.width;
        }

        if (typeof attributes.height === 'number') {
            this.height = attributes.height;
        }

        this.#disposables.push(this.#origin.change$.subscribe(() => {
            this.zzz.flags[Flag.Vertices] = true;
        }));

        this.#disposables.push(this.zzz.width$.subscribe((width) => {
            update_rectangle_vertices(width, this.height, this.origin, this.closed, this.vertices);
            // Nothing will happen if the Flag.Vertices is not set.
            this.zzz.flags[Flag.Vertices] = true;
            this.zzz.flags[Flag.Matrix] = true;
            super.update();
        }));

        this.#disposables.push(this.zzz.height$.subscribe((height) => {
            update_rectangle_vertices(this.width, height, this.origin, this.closed, this.vertices);
            // Nothing will happen if the Flag.Vertices is not set.
            this.zzz.flags[Flag.Vertices] = true;
            this.zzz.flags[Flag.Matrix] = true;
            super.update();
        }));

        this.#disposables.push(this.#origin.change$.subscribe((origin) => {
            update_rectangle_vertices(this.width, this.height, origin, this.closed, this.vertices);
            // Nothing will happen if the Flag.Vertices is not set.
            this.zzz.flags[Flag.Vertices] = true;
            this.zzz.flags[Flag.Matrix] = true;
            super.update();
        }));

        this.flagReset(true);
        this.update();
    }

    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }

    override update(): this {
        if (this.zzz.flags[Flag.Vertices] || this.zzz.flags[Flag.Width] || this.zzz.flags[Flag.Height]) {
            update_rectangle_vertices(this.width, this.height, this.origin, this.closed, this.vertices);
        }

        super.update();

        return this;
    }

    override flagReset(dirtyFlag = false): this {
        this.zzz.flags[Flag.Width] = dirtyFlag;
        this.zzz.flags[Flag.Height] = dirtyFlag;
        super.flagReset(dirtyFlag);
        return this;
    }
    get height(): number {
        return this.#height.get();
    }
    set height(height: number) {
        if (typeof height === 'number') {
            this.#height.set(height);
            this.zzz.flags[Flag.Height] = true;
        }
    }
    get origin(): G20 {
        return this.#origin;
    }
    set origin(origin: G20) {
        this.#origin.copyVector(origin);
        this.zzz.flags[Flag.Vertices] = true;
    }
    get width(): number {
        return this.#width.get();
    }
    set width(width: number) {
        if (typeof width === 'number') {
            this.#width.set(width);
            this.zzz.flags[Flag.Width] = true;
        }
    }
}

function path_options_from_rectangle_options(attributes: RectangleAttributes): Partial<PathAttributes> {
    const retval: Partial<PathAttributes> = {
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

function update_rectangle_vertices(sizeX: number, sizeY: number, origin: G20, closed: boolean, vertices: Collection<Anchor>): void {

    const x = sizeX / 2;
    const y = sizeY / 2;

    if (!closed && vertices.length === 4) {
        vertices.push(new Anchor(G20.vector(0, 0)));
    }

    vertices.getAt(0).origin.set(-x, -y).sub(origin);
    vertices.getAt(1).origin.set(x, -y).sub(origin);
    vertices.getAt(2).origin.set(x, y).sub(origin);
    vertices.getAt(3).origin.set(-x, y).sub(origin);

    const anchor = vertices.getAt(4);
    if (anchor) {
        anchor.origin.set(-x, -y).sub(origin);
        anchor.command = 'L';
    }
}

