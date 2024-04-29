import { effect, state } from 'g2o-reactive';
import { Anchor } from '../anchor';
import { Collection } from '../collection';
import { Color } from '../effects/ColorProvider';
import { Flag } from '../Flag';
import { Board } from '../IBoard';
import { G20 } from '../math/G20';
import { Path, PathAttributes } from '../path';
import { Disposable, dispose } from '../reactive/Disposable';
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
                        this.zzz.elem.setAttribute("x", `${-height / 2}`);
                        this.zzz.elem.setAttribute("y", `${-width / 2}`);
                    }
                    else {
                        // SVG Coordinate System
                        this.zzz.elem.setAttribute("x", `${-width / 2}`);
                        this.zzz.elem.setAttribute("y", `${-height / 2}`);
                    }
                }
                else {
                    if (crazy) {
                        this.zzz.elem.setAttribute("x", `${-width / 2}`);
                        this.zzz.elem.setAttribute("y", `${-height / 2}`);
                    }
                    else {
                        // Cartesian Coordinate System
                        this.zzz.elem.setAttribute("x", `${-height / 2}`);
                        this.zzz.elem.setAttribute("y", `${-width / 2}`);
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
                        this.zzz.elem.setAttribute("width", `${height}`);
                        this.zzz.elem.setAttribute("height", `${width}`);
                    }
                    else {
                        this.zzz.elem.setAttribute("width", `${width}`);
                        this.zzz.elem.setAttribute("height", `${height}`);
                    }
                }
                else {
                    if (crazy) {
                        this.zzz.elem.setAttribute("width", `${width}`);
                        this.zzz.elem.setAttribute("height", `${height}`);
                    }
                    else {
                        this.zzz.elem.setAttribute("width", `${height}`);
                        this.zzz.elem.setAttribute("height", `${width}`);
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

    readonly #width = state(1);
    readonly #height = state(1);

    readonly #origin = G20.zero.clone();

    constructor(board: Board, attributes: RectangleAttributes = {}) {

        const points = [
            new Anchor(G20.vector(0, 0), 'M'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L'),
            new Anchor(G20.vector(0, 0), 'L')
        ];

        super(board, points, true, false, true, path_attribs_from_rectangle_attribs(attributes));

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
        this.zzz.flags[Flag.Vertices] = true;
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

function path_attribs_from_rectangle_attribs(attributes: RectangleAttributes): PathAttributes {
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