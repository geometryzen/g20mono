import { ColorProvider, ElementBase, Group, variable } from 'g2o';
import { effect, State, state } from 'g2o-reactive';
import { Constants } from './constants';
import { Stop } from './stop';
import { createElement, get_svg_element_defs, setAttributes, SVGAttributes } from './svg';

export interface GradientAttributes {
    id?: string;
}

/**
 *
 */
export abstract class Gradient extends ElementBase<Group> implements ColorProvider {

    #refCount = 0;
    #svgElement: SVGElement | null = null;

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

    constructor(stops: Stop[] = [], attributes: GradientAttributes = {}) {
        super(ensure_identifier(attributes));
        this.classList = [];
        this.#stops = state(stops);
    }

    override dispose(): void {
        super.dispose();
    }

    use(svgElement: SVGElement): this {
        this.#svgElement = svgElement;
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(defs: SVGDefsElement): void {
        this.zzz.disposables.push(effect(() => {

            while (this.zzz.elem.lastChild) {
                this.zzz.elem.removeChild(this.zzz.elem.lastChild);
            }

            for (let i = 0; i < this.stops.length; i++) {

                const stop = this.stops[i];

                {
                    const attrs: SVGAttributes = {};
                    stop.zzz.elem = createElement('stop', attrs);
                    this.zzz.elem.appendChild(stop.zzz.elem);
                }
                {
                    // offset
                    stop.zzz.disposables.push(effect(() => {
                        const change: SVGAttributes = {};
                        change.offset = 100 * stop.offset + '%';
                        setAttributes(stop.zzz.elem, change);
                    }));
                    // stop-color
                    stop.zzz.disposables.push(effect(() => {
                        const change: SVGAttributes = {};
                        change['stop-color'] = stop.color;
                        setAttributes(stop.zzz.elem, change);
                    }));
                    // stop-opacity
                    stop.zzz.disposables.push(effect(() => {
                        const change: SVGAttributes = {};
                        change['stop-opacity'] = `${stop.opacity}`;
                        setAttributes(stop.zzz.elem, change);
                    }));
                }

                stop.flagReset();
            }
        }));
    }

    addRef(): void {
        this.#refCount++;
        if (this.#refCount === 1) {
            this.render(get_svg_element_defs(this.#svgElement));
        }
    }
    release(): void {
        this.#refCount--;
        if (this.#refCount === 0) {
            get_svg_element_defs(this.#svgElement).removeChild(this.zzz.elem);
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
        // TODO: Should we be returning a defensive copy?
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
function ensure_identifier(attributes: GradientAttributes): string {
    if (typeof attributes.id === 'string') {
        return attributes.id;
    }
    else {
        return `${Constants.Identifier}${Constants.uniqueId()}`;
    }
}
