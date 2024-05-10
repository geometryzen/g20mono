import { ColorProvider, G20, VectorLike, vector_from_like, ViewDOM } from "g2o";
import { effect } from "g2o-reactive";
import { Gradient, GradientOptions } from './gradient';
import { Stop } from './stop';
import { SVGAttributes } from './svg';

export interface LinearGradientOptions extends GradientOptions {

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
    constructor(point1: VectorLike, point2: VectorLike, stops: (Stop | [offset: number, color: string, opacity: number])[], options: LinearGradientOptions = {}) {
        super(stops, options);
        this.#point1 = vector_from_like(point1);
        this.#point2 = vector_from_like(point2);
    }
    override render<T>(viewDOM: ViewDOM<T>, defs: T): this {

        // If there is no attached DOM element yet,
        // create it with all necessary attributes.
        if (this.zzz.viewee) {
            // Nothing to do.
        }
        else {
            {
                const changed: SVGAttributes = {};
                changed.id = this.id;
                const viewee = viewDOM.createSVGElement('linearGradient', changed);
                this.zzz.viewee = viewee;
                if (viewDOM.getParentNode(viewee) === null) {
                    viewDOM.appendChild(defs, viewee);
                }

                this.zzz.disposables.push(effect(() => {
                    const change: SVGAttributes = {};
                    change.x1 = `${this.point1.x}`;
                    change.y1 = `${this.point1.y}`;
                    viewDOM.setAttributes(viewee, change);
                }));

                this.zzz.disposables.push(effect(() => {
                    const change: SVGAttributes = {};
                    change.x2 = `${this.point2.x}`;
                    change.y2 = `${this.point2.y}`;
                    viewDOM.setAttributes(viewee, change);
                }));

                this.zzz.disposables.push(effect(() => {
                    const change: SVGAttributes = {};
                    change.gradientUnits = this.units;
                    viewDOM.setAttributes(viewee, change);
                }));
                this.zzz.disposables.push(effect(() => {
                    const change: SVGAttributes = {};
                    change.spreadMethod = this.spreadMethod;
                    viewDOM.setAttributes(viewee, change);
                }));
                super.render(viewDOM, defs);
            }
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
