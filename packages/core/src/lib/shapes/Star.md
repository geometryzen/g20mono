import { Anchor } from '../anchor.js';
import { Flag } from '../Flag.js';
import { IBoard } from '../IBoard.js';
import { G20 } from '../math/G20.js';
import { Path } from '../path.js';
import { TWO_PI } from '../utils/math.js';
import { Commands } from '../utils/path-commands.js';

const cos = Math.cos, sin = Math.sin;

export class Star extends Path {

    _flagInnerRadius = false;
    _flagOuterRadius = false;
    _flagSides = false;

    _innerRadius = 0;
    _outerRadius = 0;
    _sides = 0;

    /**
     * @param x The x position of the star.
     * @param y The y position of the star.
     * @param innerRadius The inner radius value of the star.
     * @param outerRadius The outer radius value of the star.
     * @param sides The number of sides used to construct the star.
     */
    constructor(board: IBoard, x = 0, y = 0, innerRadius = 0, outerRadius = 0, sides = 5) {

        if (arguments.length <= 3) {
            outerRadius = innerRadius;
            innerRadius = outerRadius / 2;
        }

        if (sides <= 0) {
            sides = 5;
        }

        super(board);

        this.closed = true;
        this.automatic = false;

        this.innerRadius = innerRadius;

        this.outerRadius = outerRadius;

        this.sides = sides;

        this.update();

        this.position.x = x;
        this.position.y = y;
    }

    static Properties = ['innerRadius', 'outerRadius', 'sides'];


    update() {

        if (this.zzz.flags[Flag.Vertices] || this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {

            const sides = this._sides * 2;
            const amount = sides + 1;
            let length = this.vertices.length;

            if (length > sides) {
                this.vertices.splice(sides - 1, length - sides);
                length = sides;
            }

            for (let i = 0; i < amount; i++) {

                const pct = (i + 0.5) / sides;
                const theta = TWO_PI * pct;
                const r = (!(i % 2) ? this._innerRadius : this._outerRadius) / 2;
                const x = r * cos(theta);
                const y = r * sin(theta);

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
        this._flagInnerRadius = this._flagOuterRadius = this._flagSides = false;
        super.flagReset.call(this);
        return this;
    }

    get innerRadius(): number {
        return this._innerRadius;
    }
    set innerRadius(v: number) {
        this._innerRadius = v;
        this._flagInnerRadius = true;
    }

    get outerRadius(): number {
        return this._outerRadius;
    }
    set outerRadius(v: number) {
        this._outerRadius = v;
        this._flagOuterRadius = true;
    }

    get sides(): number {
        return this._sides;
    }
    set sides(v: number) {
        this._sides = v;
        this._flagSides = true;
    }
}
