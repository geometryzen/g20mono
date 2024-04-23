import { Anchor } from '../anchor.js';
import { Flag } from '../Flag.js';
import { IBoard } from '../IBoard.js';
import { G20 } from '../math/G20.js';
import { Path } from '../path.js';
import { TWO_PI } from '../utils/math.js';
import { Commands } from '../utils/path-commands.js';

const cos = Math.cos, sin = Math.sin;

export class RegularPolygon extends Path {

    _flagWidth = false;
    _flagHeight = false;
    _flagSides = false;

    _radius = 0;
    _width = 0;
    _height = 0;
    _sides = 0;

    /**
     * @param x The x position of the polygon.
     * @param y The y position of the polygon.
     * @param radius The radius value of the polygon.
     * @param sides The number of vertices used to construct the polygon.
     */
    constructor(board: IBoard, x = 0, y = 0, radius = 0, sides = 12) {

        sides = Math.max(sides || 0, 3);

        super(board);

        this.closed = true;
        this.automatic = false;

        if (typeof radius === 'number') {
            this.radius = radius;
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

    }

    static Properties = ['width', 'height', 'sides'];

    update(): this {

        if (this.zzz.flags[Flag.Vertices] || this._flagWidth || this._flagHeight || this._flagSides) {

            const sides = this._sides;
            const amount = sides + 1;
            let length = this.vertices.length;

            if (length > sides) {
                this.vertices.splice(sides - 1, length - sides);
                length = sides;
            }

            for (let i = 0; i < amount; i++) {

                const pct = (i + 0.5) / sides;
                const theta = TWO_PI * pct + Math.PI / 2;
                const x = this._width * cos(theta) / 2;
                const y = this._height * sin(theta) / 2;

                if (i >= length) {
                    this.vertices.push(new Anchor(G20.vector(x, y)));
                }
                else {
                    this.vertices.getAt(i).origin.set(x, y);
                }

                this.vertices.getAt(i).command = i === 0 ? Commands.move : Commands.line;
            }
        }

        super.update.call(this);
        return this;
    }

    flagReset() {
        this._flagWidth = this._flagHeight = this._flagSides = false;
        super.flagReset.call(this);
        return this;
    }
    get radius() {
        return this._radius;
    }
    set radius(v) {
        this._radius = v;
        this.width = v * 2;
        this.height = v * 2;
    }
    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
        this._flagWidth = true;
        this._radius = Math.max(this.width, this.height) / 2;
    }
    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
        this._flagHeight = true;
        this._radius = Math.max(this.width, this.height) / 2;
    }
    get sides() {
        return this._sides;
    }
    set sides(v) {
        this._sides = v;
        this._flagSides = true;
    }
}
