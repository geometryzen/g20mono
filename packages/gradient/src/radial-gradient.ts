import { ColorProvider, G20, ViewDOM, VectorLike, vector_from_like } from 'g2o';
import { effect, state } from 'g2o-reactive';
import { Gradient, GradientOptions } from './gradient';
import { Stop } from './stop';
import { SVGAttributes } from './svg';

export interface RadialGradientOptions extends GradientOptions {
    /**
     * The radius of the radial gradient.
     */
    radius?: number;
    /**
     * The x coordinate of the focal point on the radial gradient.
     */
    fx?: number;
    /**
     * The y coordinate of the focal point on the radial gradient.
     */
    fy?: number;
}

export class RadialGradient extends Gradient implements ColorProvider {

    readonly #center: G20;
    readonly #radius = state(1);
    readonly #focal: G20;

    /**
     * 
     * @param center The position of the origin of the radial gradient.
     * @param stops A list of {@link Stop}s that contain the gradient fill pattern for the gradient.
     * @param options 
     */
    constructor(center: VectorLike, stops: (Stop | [offset: number, color: string, opacity: number])[] = [], options: RadialGradientOptions = {}) {

        super(stops, options);

        this.#center = vector_from_like(center);

        if (typeof options.radius === 'number') {
            this.#radius.set(options.radius);
        }

        this.#focal = this.center.clone();
        if (typeof options.fx === 'number') {
            this.focal.x = options.fx;
        }
        if (typeof options.fy === 'number') {
            this.focal.y = options.fy;
        }
    }
    override render(viewDOM: ViewDOM, defs: unknown): this {
        const changed: SVGAttributes = {};

        if (this.zzz.elem) {
            viewDOM.setAttributes(this.zzz.elem, changed);
        }
        else {
            changed.id = this.id;
            this.zzz.elem = viewDOM.createSVGElement('radialGradient', changed);
            super.render(viewDOM, defs);

            // center
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.cx = `${this.center.x}`;
                change.cy = `${this.center.y}`;
                viewDOM.setAttributes(this.zzz.elem, change);
            }));

            // focal
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.fx = `${this.focal.x}`;
                change.fy = `${this.focal.y}`;
                viewDOM.setAttributes(this.zzz.elem, change);
            }));

            // gradientUnits
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.gradientUnits = this.units;
                viewDOM.setAttributes(this.zzz.elem, change);
            }));

            // radius
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.r = `${this.radius}`;
                viewDOM.setAttributes(this.zzz.elem, change);
            }));

            // spreadMethod
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.spreadMethod = this.spreadMethod;
                viewDOM.setAttributes(this.zzz.elem, change);
            }));
        }

        if (viewDOM.getParentNode(this.zzz.elem) === null) {
            viewDOM.appendChild(defs, this.zzz.elem);
        }

        return this.flagReset();
    }

    update() {
        if (this._flagStops) {
            this._change.set(this);
        }
        return this;
    }

    override flagReset(dirtyFlag = false) {
        super.flagReset(dirtyFlag);
        return this;
    }

    get center(): G20 {
        return this.#center;
    }
    set center(center: G20) {
        this.#center.copyVector(center);
    }
    get focal(): G20 {
        return this.#focal;
    }
    set focal(focal) {
        this.#focal.copyVector(focal);
    }
    get radius(): number | null {
        return this.#radius.get();
    }
    set radius(radius: number | null) {
        this.#radius.set(radius);
    }
}
