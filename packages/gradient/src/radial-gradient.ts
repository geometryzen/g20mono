import { ColorProvider, G20 } from 'g2o';
import { effect, state } from 'g2o-reactive';
import { Gradient, GradientAttributes } from './gradient';
import { Stop } from './stop';
import { createElement, setAttributes, SVGAttributes } from './svg';

export interface RadialGradientAttributes extends GradientAttributes {

}

export class RadialGradient extends Gradient implements ColorProvider {

    readonly #center: G20;
    readonly #radius = state(null as number | null);
    readonly #focal: G20;

    /**
     * @param cx The x position of the origin of the radial gradient.
     * @param cy The y position of the origin of the radial gradient.
     * @param r The radius of the radial gradient.
     * @param stops A list of {@link Stop}s that contain the gradient fill pattern for the gradient.
     * @param fx The x position of the focal point on the radial gradient.
     * @param fy The y position of the focal point on the radial gradient.
     */
    constructor(cx: number = 0, cy: number = 0, r: number = 1, stops: Stop[] = [], fx?: number, fy?: number, attributes: RadialGradientAttributes = {}) {

        super(stops, attributes);

        this.#center = new G20(cx, cy);

        this.#radius.set(r);

        this.#focal = this.center.clone();
        if (typeof fx === 'number') {
            this.focal.x = fx;
        }
        if (typeof fy === 'number') {
            this.focal.y = fy;
        }
    }
    render(defs: SVGDefsElement): this {
        const changed: SVGAttributes = {};

        if (this.zzz.elem) {
            setAttributes(this.zzz.elem, changed);
        }
        else {
            changed.id = this.id;
            this.zzz.elem = createElement('radialGradient', changed);
            // center
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.cx = `${this.center.x}`;
                change.cy = `${this.center.y}`;
                setAttributes(this.zzz.elem, change);
            }));
            // focal
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.fx = `${this.focal.x}`;
                change.fy = `${this.focal.y}`;
                setAttributes(this.zzz.elem, change);
            }));
            // gradientUnits
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.gradientUnits = this.units;
                setAttributes(this.zzz.elem, change);
            }));
            // radius
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.r = `${this.radius}`;
                setAttributes(this.zzz.elem, change);
            }));
            // spreadMethod
            this.zzz.disposables.push(effect(() => {
                const change: SVGAttributes = {};
                change.spreadMethod = this.spreadMethod;
                setAttributes(this.zzz.elem, change);
            }));
        }

        if (this.zzz.elem.parentNode === null) {
            defs.appendChild(this.zzz.elem);
        }

        if (this._flagStops) {

            const lengthChanged = this.zzz.elem.childNodes.length !== this.stops.length;

            if (lengthChanged) {
                while (this.zzz.elem.lastChild) {
                    this.zzz.elem.removeChild(this.zzz.elem.lastChild);
                }
            }

            for (let i = 0; i < this.stops.length; i++) {

                const stop = this.stops[i];
                const attrs: SVGAttributes = {};

                if (stop._flagOffset) {
                    attrs.offset = 100 * stop.offset + '%';
                }
                if (stop._flagColor) {
                    attrs['stop-color'] = stop._color;
                }
                if (stop._flagOpacity) {
                    attrs['stop-opacity'] = `${stop._opacity}`;
                }

                if (stop.zzz.elem) {
                    setAttributes(stop.zzz.elem, attrs);
                }
                else {
                    stop.zzz.elem = createElement('stop', attrs);
                }

                if (lengthChanged) {
                    this.zzz.elem.appendChild(stop.zzz.elem);
                }
                stop.flagReset();
            }
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
