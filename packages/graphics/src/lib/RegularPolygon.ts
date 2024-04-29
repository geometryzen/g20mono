import { Anchor, Board, Collection, Disposable, dispose, G20, Path } from 'g2o';
import { effect, state } from 'g2o-reactive';

const cos = Math.cos, sin = Math.sin;

export class RegularPolygon extends Path {

    readonly #disposables: Disposable[] = [];
    readonly #radius = state(0);
    readonly #sides = state(0);

    /**
     * @param x The x position of the polygon.
     * @param y The y position of the polygon.
     * @param radius The radius value of the polygon.
     * @param sides The number of vertices used to construct the polygon.
     */
    constructor(board: Board, x = 0, y = 0, radius = 0, sides = 12) {

        sides = Math.max(sides || 0, 3);

        super(board);

        this.closed = true;
        this.automatic = false;

        if (typeof radius === 'number') {
            this.#radius.set(radius);
        }

        if (typeof sides === 'number') {
            this.sides = sides;
        }

        this.update();

        if (typeof x === 'number') {
            this.position.x = x;
        }
        if (typeof y === 'number') {
            this.position.y = y;
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
        update_vertices(this.radius, this.sides, this.vertices);
        // Need Flag
        this.zzz.flags[1] = true;
        super.update();
        return this;
    }

    override flagReset(dirtyFlag = false) {
        super.flagReset(dirtyFlag);
        return this;
    }
    get radius(): number {
        return this.#radius.get();
    }
    set radius(radius: number) {
        this.#radius.set(radius);
    }
    get sides(): number {
        return this.#sides.get();
    }
    set sides(sides: number) {
        this.#sides.set(sides);
    }
}

function update_vertices(radius: number, sides: number, vertices: Collection<Anchor>): void {

    const amount = sides + 1;
    let length = vertices.length;

    if (length > sides) {
        vertices.splice(sides - 1, length - sides);
        length = sides;
    }

    for (let i = 0; i < amount; i++) {

        const pct = (i + 0.5) / sides;
        const theta = 2 * Math.PI * pct + Math.PI / 2;
        const x = radius * cos(theta);
        const y = radius * sin(theta);

        if (i >= length) {
            vertices.push(new Anchor(G20.vector(x, y)));
        }
        else {
            vertices.getAt(i).origin.set(x, y);
        }

        vertices.getAt(i).command = i === 0 ? 'M' : 'L';
    }
}
