import { ColorProvider, G20, VectorLike, vector_from_like, ViewDOM } from "@g20/core";
import { effect, signal } from "@g20/reactive";
import { Gradient, GradientOptions } from "./gradient";
import { Stop } from "./stop";
import { SVGAttributes } from "./svg";

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
    readonly #radius = signal(1);
    readonly #focal: G20;

    /**
     *
     * @param center The position of the origin of the radial gradient.
     * @param stops A list of {@link Stop}s that contain the gradient fill pattern for the gradient.
     * @param options
     */
    constructor(
        center: VectorLike,
        stops: (Stop | [offset: number, color: string, opacity: number])[] = [],
        options: RadialGradientOptions = {}
    ) {
        super(stops, options);

        this.#center = vector_from_like(center);

        if (typeof options.radius === "number") {
            this.#radius.set(options.radius);
        }

        this.#focal = this.center.clone();
        if (typeof options.fx === "number") {
            this.focal.x = options.fx;
        }
        if (typeof options.fy === "number") {
            this.focal.y = options.fy;
        }
    }
    override render<T>(viewDOM: ViewDOM<T>, defs: T): this {
        if (this.zzz.viewee) {
            // Nothing to see here.
        } else {
            const changed: SVGAttributes = {};
            changed.id = this.id;
            const viewee = viewDOM.createSVGElement("radialGradient", changed);
            this.zzz.viewee = viewee;
            viewDOM.appendChild(defs, viewee);

            super.render(viewDOM, defs);

            // center
            this.zzz.disposables.push(
                effect(() => {
                    const change: SVGAttributes = {};
                    change.cx = `${this.center.x}`;
                    change.cy = `${this.center.y}`;
                    viewDOM.setAttributes(viewee, change);
                })
            );

            // focal
            this.zzz.disposables.push(
                effect(() => {
                    const change: SVGAttributes = {};
                    change.fx = `${this.focal.x}`;
                    change.fy = `${this.focal.y}`;
                    viewDOM.setAttributes(viewee, change);
                })
            );

            // gradientUnits
            this.zzz.disposables.push(
                effect(() => {
                    const change: SVGAttributes = {};
                    change.gradientUnits = this.units;
                    viewDOM.setAttributes(viewee, change);
                })
            );

            // radius
            this.zzz.disposables.push(
                effect(() => {
                    const change: SVGAttributes = {};
                    change.r = `${this.radius}`;
                    viewDOM.setAttributes(viewee, change);
                })
            );

            // spreadMethod
            this.zzz.disposables.push(
                effect(() => {
                    const change: SVGAttributes = {};
                    change.spreadMethod = this.spreadMethod;
                    viewDOM.setAttributes(viewee, change);
                })
            );
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
