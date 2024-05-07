import { effect, state } from 'g2o-reactive';
import { Anchor } from '../anchor';
import { Collection } from '../collection';
import { Color } from '../effects/ColorProvider';
import { Board } from '../IBoard';
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

/*
export class Rectangle extends ColoredShape implements RectangleProperties, Disposable {
    readonly #disposables: Disposable[] = [];
    readonly #width = state(1);
    readonly #height = state(1);
    constructor(board: Board, attributes: RectangleAttributes = {}) {
        super(board, colored_shape_attribs_from_rectangle_attribs(attributes));

        if (typeof attributes.width === 'number') {
            this.width = attributes.width;
        }

        if (typeof attributes.height === 'number') {
            this.height = attributes.height;
        }
    }
    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }
    get height(): number {
        return this.#height.get();
    }
    set height(height: number) {
        if (typeof height === 'number') {
            this.#height.set(height);
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
    render(parentElement: HTMLElement | SVGElement, svgElement: SVGElement): void {

        this.update();

        if (this.zzz.elem) {
            // Nothing to see here.
        }
        else {
            const changed: SVGAttributes = {};
            this.zzz.elem = svg.createElement('rect', changed);
            parentElement.appendChild(this.zzz.elem);
            super.render(parentElement, svgElement);

            this.#disposables.push(effect(() => {
                const width = this.width;
                const height = this.height;
                const goofy = this.board.goofy;
                const crazy = this.board.crazy;
                if (goofy) {
                    if (crazy) {
                        host.setAttribute(this.zzz.elem,"x", `${-height / 2}`);
                        host.setAttribute(this.zzz.elem,"y", `${-width / 2}`);
                    }
                    else {
                        // SVG Coordinate System
                        host.setAttribute(this.zzz.elem,"x", `${-width / 2}`);
                        host.setAttribute(this.zzz.elem,"y", `${-height / 2}`);
                    }
                }
                else {
                    if (crazy) {
                        host.setAttribute(this.zzz.elem,"x", `${-width / 2}`);
                        host.setAttribute(this.zzz.elem,"y", `${-height / 2}`);
                    }
                    else {
                        // Cartesian Coordinate System
                        host.setAttribute(this.zzz.elem,"x", `${-height / 2}`);
                        host.setAttribute(this.zzz.elem,"y", `${-width / 2}`);
                    }
                }
            }));

            // These should be split according to the property that changed...
            this.#disposables.push(effect(() => {
                const width = this.width;
                const height = this.height;
                const goofy = this.board.goofy;
                const crazy = this.board.crazy;
                if (goofy) {
                    if (crazy) {
                        host.setAttribute(this.zzz.elem,"width", `${height}`);
                        host.setAttribute(this.zzz.elem,"height", `${width}`);
                    }
                    else {
                        host.setAttribute(this.zzz.elem,"width", `${width}`);
                        host.setAttribute(this.zzz.elem,"height", `${height}`);
                    }
                }
                else {
                    if (crazy) {
                        host.setAttribute(this.zzz.elem,"width", `${width}`);
                        host.setAttribute(this.zzz.elem,"height", `${height}`);
                    }
                    else {
                        host.setAttribute(this.zzz.elem,"width", `${height}`);
                        host.setAttribute(this.zzz.elem,"height", `${width}`);
                    }
                }
            }));
        }

        this.flagReset();
    }
    getBoundingBox(): { top?: number; left?: number; right?: number; bottom?: number; } {
        throw new Error('Method not implemented.');
    }
    hasBoundingBox(): boolean {
        throw new Error('Method not implemented.');
    }
}
*/
/*
function colored_shape_attribs_from_rectangle_attribs(attributes: RectangleAttributes): ColoredShapeAttributes {
    const retval: ColoredShapeAttributes = {
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
*/

export class Rectangle extends Path implements RectangleProperties, Disposable {

    readonly #disposables: Disposable[] = [];

    readonly #width = state((1 + Math.sqrt(5)) / 2);
    readonly #height = state(1);

    readonly #origin = G20.zero.clone();

    constructor(owner: Board, attributes: RectangleOptions = {}) {

        const points = [
            new Anchor(G20.vector(0, 0), 'M'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L')
        ];

        super(owner, points, true, false, true, path_attribs_from_rectangle_attribs(attributes, owner));

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
        update_rectangle_vertices(this.width, this.height, this.origin, this.closed, this.vertices);
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
    set origin(origin: G20) {
        this.#origin.copyVector(origin);
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