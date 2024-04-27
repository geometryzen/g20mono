import { Anchor } from '../anchor.js';
import { Constants } from '../constants.js';
import { Flag } from '../Flag.js';
import { Board } from '../IBoard.js';
import { G20 } from '../math/G20.js';
import { Path } from '../path.js';
import { HALF_PI, mod, TWO_PI } from '../utils/math.js';
import { Commands } from '../utils/path-commands.js';

/**
 * @param {Number} [x=0] - The x position of the arc segment.
 * @param {Number} [y=0] - The y position of the arc segment.
 * @param {Number} [innerRadius=0] - The inner radius value of the arc segment.
 * @param {Number} [outerRadius=0] - The outer radius value of the arc segment.
 * @param {Number} [startAngle=0] - The start angle of the arc segment in Number.
 * @param {Number} [endAngle=6.2831] - The end angle of the arc segment in Number.
 * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
 */
export class ArcSegment extends Path {

    /**
     * @name ArcSegment#_flagStartAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#startAngle} needs updating.
     */
    _flagStartAngle = false;
    /**
     * @name ArcSegment#_flagEndAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#endAngle} needs updating.
     */
    _flagEndAngle = false;
    /**
     * @name ArcSegment#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#innerRadius} needs updating.
     */
    _flagInnerRadius = false;
    /**
     * @name ArcSegment#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#outerRadius} needs updating.
     */
    _flagOuterRadius = false;

    /**
     * @name ArcSegment#_startAngle
     * @private
     * @see {@link ArcSegment#startAngle}
     */
    _startAngle = 0;
    /**
     * @name ArcSegment#_endAngle
     * @private
     * @see {@link ArcSegment#endAngle}
     */
    _endAngle = TWO_PI;
    /**
     * @name ArcSegment#_innerRadius
     * @private
     * @see {@link ArcSegment#innerRadius}
     */
    _innerRadius = 0;
    /**
     * @name ArcSegment#_outerRadius
     * @private
     * @see {@link ArcSegment#outerRadius}
     */
    _outerRadius = 0;

    constructor(board: Board, x = 0, y = 0, ir = 0, or = 0, sa = 0, ea = 2 * Math.PI, res = 24) {

        const amount = res || (Constants.Resolution * 3);
        const points: Anchor[] = [];
        for (let i = 0; i < amount; i++) {
            points.push(new Anchor(G20.vector(0, 0)));
        }

        super(board, points, true, false, true);

        /**
         * @name ArcSegment#innerRadius
         * @property {Number} - The size of the inner radius of the arc segment.
         */
        if (typeof ir === 'number') {
            this.innerRadius = ir;
        }

        /**
         * @name ArcSegment#outerRadius
         * @property {Number} - The size of the outer radius of the arc segment.
         */
        if (typeof or === 'number') {
            this.outerRadius = or;
        }

        /**
         * @name ArcSegment#startAngle
         * @property {Number} - The angle of one side for the arc segment.
         */
        if (typeof sa === 'number') {
            this.startAngle = sa;
        }

        /**
         * @name ArcSegment#endAngle
         * @property {Number} - The angle of the other side for the arc segment.
         */
        if (typeof ea === 'number') {
            this.endAngle = ea;
        }

        this.update();

        if (typeof x === 'number') {
            this.position.x = x;
        }
        if (typeof y === 'number') {
            this.position.y = y;
        }

    }

    static Properties = ['startAngle', 'endAngle', 'innerRadius', 'outerRadius'];

    update() {

        if (this.zzz.flags[Flag.Vertices] || this._flagStartAngle || this._flagEndAngle
            || this._flagInnerRadius || this._flagOuterRadius) {

            const sa = this._startAngle;
            const ea = this._endAngle;

            const ir = this._innerRadius;
            const or = this._outerRadius;

            const connected = mod(sa, TWO_PI) === mod(ea, TWO_PI);
            const punctured = ir > 0;

            const vertices = this.vertices;
            let length = (punctured ? vertices.length / 2 : vertices.length);
            let command, id = 0;
            let i, last, pct, v, theta, step, x, y, amp;

            if (connected) {
                length--;
            }
            else if (!punctured) {
                length -= 2;
            }

            /**
             * Outer Circle
             */
            for (i = 0, last = length - 1; i < length; i++) {

                pct = i / last;
                v = vertices.getAt(id);
                theta = pct * (ea - sa) + sa;
                step = (ea - sa) / length;

                x = or * Math.cos(theta);
                y = or * Math.sin(theta);

                switch (i) {
                    case 0:
                        command = Commands.move;
                        break;
                    default:
                        command = Commands.curve;
                }

                v.command = command;
                v.x = x;
                v.y = y;
                v.controls.a.clear();
                v.controls.b.clear();

                if (v.command === Commands.curve) {
                    amp = or * step / Math.PI;
                    v.controls.a.x = amp * Math.cos(theta - HALF_PI);
                    v.controls.a.y = amp * Math.sin(theta - HALF_PI);
                    v.controls.b.x = amp * Math.cos(theta + HALF_PI);
                    v.controls.b.y = amp * Math.sin(theta + HALF_PI);
                    if (i === 1) {
                        v.controls.a.scale(2);
                    }
                    if (i === last) {
                        v.controls.b.scale(2);
                    }
                }

                id++;

            }

            if (punctured) {

                if (connected) {
                    vertices.getAt(id).command = Commands.close;
                    id++;
                }
                else {
                    length--;
                    last = length - 1;
                }

                /**
                 * Inner Circle
                 */
                for (i = 0; i < length; i++) {

                    pct = i / last;
                    v = vertices.getAt(id);
                    theta = (1 - pct) * (ea - sa) + sa;
                    step = (ea - sa) / length;

                    x = ir * Math.cos(theta);
                    y = ir * Math.sin(theta);
                    command = Commands.curve;
                    if (i <= 0) {
                        command = connected ? Commands.move : Commands.line;
                    }

                    v.command = command;
                    v.x = x;
                    v.y = y;
                    v.controls.a.clear();
                    v.controls.b.clear();

                    if (v.command === Commands.curve) {
                        amp = ir * step / Math.PI;
                        v.controls.a.x = amp * Math.cos(theta + HALF_PI);
                        v.controls.a.y = amp * Math.sin(theta + HALF_PI);
                        v.controls.b.x = amp * Math.cos(theta - HALF_PI);
                        v.controls.b.y = amp * Math.sin(theta - HALF_PI);
                        if (i === 1) {
                            v.controls.a.scale(2);
                        }
                        if (i === last) {
                            v.controls.b.scale(2);
                        }
                    }

                    id++;

                }

                // Final Point
                vertices.getAt(id).copy(vertices.getAt(0));
                vertices.getAt(id).command = Commands.line;

            }
            else if (!connected) {

                vertices.getAt(id).command = Commands.line;
                vertices.getAt(id).x = 0;
                vertices.getAt(id).y = 0;
                id++;

                // Final Point
                vertices.getAt(id).copy(vertices.getAt(0));
                vertices.getAt(id).command = Commands.line;

            }

        }

        super.update();

        return this;
    }

    override flagReset(dirtyFlag = false) {
        super.flagReset(dirtyFlag);

        this._flagStartAngle = this._flagEndAngle
            = this._flagInnerRadius = this._flagOuterRadius = false;
        return this;
    }
    get startAngle() {
        return this._startAngle;
    }
    set startAngle(v) {
        this._startAngle = v;
        this._flagStartAngle = true;
    }
    get endAngle() {
        return this._endAngle;
    }
    set endAngle(v) {
        this._endAngle = v;
        this._flagEndAngle = true;
    }
    get innerRadius() {
        return this._innerRadius;
    }
    set innerRadius(v) {
        this._innerRadius = v;
        this._flagInnerRadius = true;
    }
    get outerRadius() {
        return this._outerRadius;
    }
    set outerRadius(v) {
        this._outerRadius = v;
        this._flagOuterRadius = true;
    }
}
