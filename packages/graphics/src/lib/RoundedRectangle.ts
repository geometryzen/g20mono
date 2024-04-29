import {
    Anchor,
    Board,
    Collection, Color, Disposable,
    dispose, G20,
    Path,
    PathAttributes,
    PositionLike
} from 'g2o';
import { effect, state } from 'g2o-reactive';

export interface RoundedRectangleAttributes {
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
    height?: number;
    width?: number;
}

export class RoundedRectangle extends Path {

    readonly #trash: Disposable[] = [];

    readonly #width = state(Math.SQRT2);
    readonly #height = state(Math.SQRT2);

    readonly #radius = state(0.2);

    constructor(board: Board, attributes: RoundedRectangleAttributes = {}) {

        if (typeof attributes.radius === 'undefined' && typeof attributes.width === 'number' && typeof attributes.height === 'number') {
            attributes.radius = Math.floor(Math.min(attributes.width, attributes.height) / 12);
        }

        const points: Anchor[] = [];
        for (let i = 0; i < 10; i++) {
            const origin = G20.vector(0, 0);
            const command = (i === 0) ? 'M' : 'C';
            points.push(new Anchor(origin, command));
        }

        super(board, points, true, false, true, path_attribs_from_rounded_rectangle_attribs(attributes));

        if (typeof attributes.width === 'number') {
            this.width = attributes.width;
        }

        if (typeof attributes.height === 'number') {
            this.height = attributes.height;
        }

        if (typeof attributes.radius === 'number') {
            this.radius = attributes.radius;
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

function path_attribs_from_rounded_rectangle_attribs(attributes: RoundedRectangleAttributes): PathAttributes {
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

function update_vertices(width: number, height: number, radius: number, vertices: Collection<Anchor>) {

    const rx = radius;
    const ry = radius;

    let v: Anchor;
    const w = width / 2;
    const h = height / 2;

    v = vertices.getAt(0);
    v.x = - (w - rx);
    v.y = - h;

    // Upper Right Corner

    v = vertices.getAt(1);
    v.x = (w - rx);
    v.y = - h;
    v.controls.a.clear();
    v.controls.b.x = rx;
    v.controls.b.y = 0;

    v = vertices.getAt(2);
    v.x = w;
    v.y = - (h - ry);
    v.controls.b.clear();
    v.controls.a.clear();

    // Bottom Right Corner

    v = vertices.getAt(3);
    v.x = w;
    v.y = (h - ry);
    v.controls.a.clear();
    v.controls.b.x = 0;
    v.controls.b.y = ry;

    v = vertices.getAt(4);
    v.x = (w - rx);
    v.y = h;
    v.controls.b.clear();
    v.controls.a.clear();

    // Bottom Left Corner

    v = vertices.getAt(5);
    v.x = - (w - rx);
    v.y = h;
    v.controls.a.clear();
    v.controls.b.x = - rx;
    v.controls.b.y = 0;

    v = vertices.getAt(6);
    v.x = - w;
    v.y = (h - ry);
    v.controls.a.clear();
    v.controls.b.clear();

    // Upper Left Corner

    v = vertices.getAt(7);
    v.x = - w;
    v.y = - (h - ry);
    v.controls.a.clear();
    v.controls.b.x = 0;
    v.controls.b.y = - ry;

    v = vertices.getAt(8);
    v.x = - (w - rx);
    v.y = - h;
    v.controls.a.clear();
    v.controls.b.clear();

    v = vertices.getAt(9);
    v.copy(vertices.getAt(8));
}
