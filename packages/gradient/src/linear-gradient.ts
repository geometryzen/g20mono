import { ColorProvider, G20, PositionLike, position_from_like } from 'g2o';
import { effect } from 'g2o-reactive';
import { Gradient, GradientAttributes } from './gradient';
import { Stop } from './stop';
import { createElement, setAttributes, SVGAttributes } from './svg';

export interface LinearGradientAttributes extends GradientAttributes {

}

export class LinearGradient extends Gradient implements ColorProvider {

    readonly #point1: G20;
    readonly #point2: G20;

    /**
     * @param point1 The position of the first end point of the linear gradient.
     * @param point2 The position of the second end point of the linear gradient.
     * @param stops A list of {@link Stop}s that contain the gradient fill pattern for the gradient.
     * The linear gradient lives within the space of the parent object's matrix space.
     */
    constructor(point1: PositionLike, point2: PositionLike, stops: Stop[], attributes: LinearGradientAttributes = {}) {
        super(stops, attributes);
        this.#point1 = position_from_like(point1);
        this.#point2 = position_from_like(point2);
    }
    override render(defs: SVGDefsElement): this {

        // If there is no attached DOM element yet,
        // create it with all necessary attributes.
        if (this.zzz.elem) {
            const changed: SVGAttributes = {};
            setAttributes(this.zzz.elem, changed);
        }
        else {
            {
                const changed: SVGAttributes = {};
                changed.id = this.id;
                this.zzz.elem = createElement('linearGradient', changed);
                super.render(defs);
            }

            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.x1 = `${this.point1.x}`;
                change.y1 = `${this.point1.y}`;
                setAttributes(this.zzz.elem, change);
            }));

            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.x2 = `${this.point2.x}`;
                change.y2 = `${this.point2.y}`;
                setAttributes(this.zzz.elem, change);
            }));

            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.gradientUnits = this.units;
                setAttributes(this.zzz.elem, change);
            }));
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.spreadMethod = this.spreadMethod;
                setAttributes(this.zzz.elem, change);
            }));
        }

        if (this.zzz.elem.parentNode === null) {
            defs.appendChild(this.zzz.elem);
        }

        return this.flagReset();
    }

    update(): this {
        if (this._flagStops) {
            this._change.set(this);
        }
        return this;
    }

    override flagReset(dirtyFlag = false) {
        super.flagReset(dirtyFlag);
        return this;
    }
    get point1(): G20 {
        return this.#point1;
    }
    set point1(point1: G20) {
        if (point1 instanceof G20) {
            this.#point1.copyVector(point1);
        }
    }
    get point2(): G20 {
        return this.#point2;
    }
    set point2(point2: G20) {
        if (point2 instanceof G20) {
            this.#point2.copyVector(point2);
        }
    }
}
