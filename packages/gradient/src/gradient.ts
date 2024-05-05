import { ColorProvider, ElementBase, Group, variable } from 'g2o';
import { effect, State, state } from 'g2o-reactive';
import { Constants } from './constants';
import { Stop } from './stop';
import { createElement, SVGAttributes } from './svg';

export interface GradientOptions {
    id?: string;
}

/**
 *
 */
export abstract class Gradient extends ElementBase<Group> implements ColorProvider {

    #refCount = 0;

    _flagStops = false;

    /**
     * Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle.
     * @see {@link https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute} for more information
     */
    readonly #spreadMethod = state('pad' as 'pad' | 'reflect' | 'repeat');
    /**
     * Indicates how coordinate values are interpreted by the renderer.
     * @see {@link https://www.w3.org/TR/SVG11/pservers.html#RadialGradientElementGradientUnitsAttribute} for more information
     */
    readonly #units = state('userSpaceOnUse' as 'userSpaceOnUse' | 'objectBoundingBox');

    readonly #stops: State<Stop[]> = state([]);

    readonly _change = variable(this);
    readonly change$ = this._change.asObservable();

    constructor(stops: Stop[] = [], options: GradientOptions = {}) {
        super(ensure_identifier(options));
        this.classList = [];
        this.#stops = state(stops);
    }

    override dispose(): void {
        super.dispose();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(defs: SVGDefsElement): void {
        this.zzz.disposables.push(effect(() => {

            while (this.zzz.elem.lastChild) {
                this.zzz.elem.removeChild(this.zzz.elem.lastChild);
            }

            const stops = this.stops;
            const N = stops.length;
            for (let i = 0; i < N; i++) {
                const stop = stops[i];
                {
                    const attrs: SVGAttributes = { id: stop.id };
                    stop.zzz.elem = createElement('stop', attrs);
                    this.zzz.elem.appendChild(stop.zzz.elem);
                }
                stop.zzz.disposables.push(effect(() => {
                    stop.zzz.elem.setAttribute('offset', 100 * stop.offset + '%');
                }));
                stop.zzz.disposables.push(effect(() => {
                    stop.zzz.elem.setAttribute('stop-color', stop.color);
                }));
                stop.zzz.disposables.push(effect(() => {
                    stop.zzz.elem.setAttribute('stop-opacity', `${stop.opacity}`);
                }));
                stop.flagReset();
            }
        }));
    }

    addRef(defs: SVGDefsElement): void {
        this.#refCount++;
        if (this.#refCount === 1) {
            this.render(defs);
        }
    }
    release(defs: SVGDefsElement): void {
        this.#refCount--;
        if (this.#refCount === 0) {
            defs.removeChild(this.zzz.elem);
            this.zzz.elem = null;
        }
    }

    update(): this {
        if (this._flagStops) {
            this._change.set(this);
        }
        return this;
    }

    override flagReset(dirtyFlag = false): this {
        this._flagStops = dirtyFlag;
        super.flagReset(dirtyFlag);
        return this;
    }
    get spreadMethod(): 'pad' | 'reflect' | 'repeat' {
        return this.#spreadMethod.get();
    }
    set spreadMethod(spread: 'pad' | 'reflect' | 'repeat') {
        this.#spreadMethod.set(spread);
    }
    get stops(): Stop[] {
        return this.#stops.get();
    }
    set stops(stops: Stop[]) {
        this.#stops.set(stops);
    }
    get units(): 'userSpaceOnUse' | 'objectBoundingBox' {
        return this.#units.get();
    }
    set units(units: 'userSpaceOnUse' | 'objectBoundingBox') {
        this.#units.set(units);
    }
}

function ensure_identifier(attributes: GradientOptions): string {
    if (typeof attributes.id === 'string') {
        return attributes.id;
    }
    else {
        return `${Constants.Identifier}${Constants.uniqueId()}`;
    }
}
