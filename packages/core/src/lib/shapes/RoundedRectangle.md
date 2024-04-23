import { Anchor } from '../anchor';
import { Flag } from '../Flag';
import { IBoard } from '../IBoard';
import { G20 } from '../math/G20';
import { Path } from '../path';
import { Disposable } from '../reactive/Disposable';
import { Commands } from '../utils/path-commands';

export class RoundedRectangle extends Path {

    _flagWidth = false;
    _flagHeight = false;
    _flagRadius = false;

    _width = 0;
    _height = 0;

    _radius: number | G20 = 12;
    #radius_change_subscription: Disposable | null = null;

    /**
     * @param x The x position of the rounded rectangle.
     * @param y The y position of the rounded rectangle.
     * @param width The width value of the rounded rectangle.
     * @param height The width value of the rounded rectangle.
     * @param radius The radius value of the rounded rectangle.
     */
    constructor(board: IBoard, x = 0, y = 0, width = 0, height = 0, radius = 12) {

        if (typeof radius === 'undefined' &&
            typeof width === 'number' && typeof height === 'number') {
            radius = Math.floor(Math.min(width, height) / 12);
        }

        const points: Anchor[] = [];
        for (let i = 0; i < 10; i++) {
            points.push(new Anchor(G20.vector(0, 0), 0, 0, 0, 0, i === 0 ? Commands.move : Commands.curve));
        }

        // points[points.length - 1].command = Commands.close;

        super(board, points);

        this.closed = true;
        this.automatic = false;

        /**
         * @name RoundedRectangle#width
         * @property {Number} - The width of the rounded rectangle.
         */
        if (typeof width === 'number') {
            this.width = width;
        }

        /**
         * @name RoundedRectangle#height
         * @property {Number} - The height of the rounded rectangle.
         */
        if (typeof height === 'number') {
            this.height = height;
        }

        /**
         * @name RoundedRectangle#radius
         * @property {Number} - The size of the radius of the rounded rectangle.
         */
        if (typeof radius === 'number') {
            this.radius = radius;
        }

        this.update();

        if (typeof x === 'number') {
            this.position.x = x;
        }
        if (typeof y === 'number') {
            this.position.y = y;
        }

    }

    static Properties = ['width', 'height', 'radius'];

    update() {

        if (this.zzz.flags[Flag.Vertices] || this._flagWidth || this._flagHeight || this._flagRadius) {

            const width = this._width;
            const height = this._height;

            let rx, ry;

            if (this._radius instanceof G20) {
                rx = this._radius.x;
                ry = this._radius.y;
            }
            else {
                rx = this._radius;
                ry = this._radius;
            }

            let v;
            const w = width / 2;
            const h = height / 2;

            v = this.vertices.getAt(0);
            v.x = - (w - rx);
            v.y = - h;

            // Upper Right Corner

            v = this.vertices.getAt(1);
            v.x = (w - rx);
            v.y = - h;
            v.controls.left.clear();
            v.controls.right.x = rx;
            v.controls.right.y = 0;

            v = this.vertices.getAt(2);
            v.x = w;
            v.y = - (h - ry);
            v.controls.right.clear();
            v.controls.left.clear();

            // Bottom Right Corner

            v = this.vertices.getAt(3);
            v.x = w;
            v.y = (h - ry);
            v.controls.left.clear();
            v.controls.right.x = 0;
            v.controls.right.y = ry;

            v = this.vertices.getAt(4);
            v.x = (w - rx);
            v.y = h;
            v.controls.right.clear();
            v.controls.left.clear();

            // Bottom Left Corner

            v = this.vertices.getAt(5);
            v.x = - (w - rx);
            v.y = h;
            v.controls.left.clear();
            v.controls.right.x = - rx;
            v.controls.right.y = 0;

            v = this.vertices.getAt(6);
            v.x = - w;
            v.y = (h - ry);
            v.controls.left.clear();
            v.controls.right.clear();

            // Upper Left Corner

            v = this.vertices.getAt(7);
            v.x = - w;
            v.y = - (h - ry);
            v.controls.left.clear();
            v.controls.right.x = 0;
            v.controls.right.y = - ry;

            v = this.vertices.getAt(8);
            v.x = - (w - rx);
            v.y = - h;
            v.controls.left.clear();
            v.controls.right.clear();

            v = this.vertices.getAt(9);
            v.copy(this.vertices.getAt(8));
        }

        super.update.call(this);

        return this;

    }

    flagReset() {
        this._flagWidth = this._flagHeight = this._flagRadius = false;
        super.flagReset.call(this);
        return this;
    }

    get width() {
        return this._width;
    }
    set width(v) {
        this._width = v;
        this._flagWidth = true;
    }

    get height() {
        return this._height;
    }
    set height(v) {
        this._height = v;
        this._flagHeight = true;
    }

    get radius() {
        return this._radius;
    }
    set radius(radius) {

        if (this.#radius_change_subscription) {
            this.#radius_change_subscription.dispose();
            this.#radius_change_subscription = null;
        }

        this._radius = radius;

        if (radius instanceof G20) {
            this.#radius_change_subscription = radius.change$.subscribe(() => {
                this._flagRadius = true;
            });
        }

        this._flagRadius = true;
    }
}
