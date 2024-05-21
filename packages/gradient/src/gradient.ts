import { ColorProvider, ElementBase, variable, ViewDOM } from "@g20/core";
import { effect, State, signal } from "@g20/reactive";
import { Constants } from "./constants";
import { Stop } from "./stop";
import { SVGAttributes } from "./svg";

export interface GradientOptions {
    id?: string;
    spreadMethod?: "pad" | "reflect" | "repeat";
    units?: "objectBoundingBox" | "userSpaceOnUse";
}

/**
 *
 */
export abstract class Gradient extends ElementBase implements ColorProvider {
    #refCount = 0;

    _flagStops = false;

    readonly #spreadMethod = signal("pad" as "pad" | "reflect" | "repeat");
    readonly #units = signal("userSpaceOnUse" as "userSpaceOnUse" | "objectBoundingBox");

    readonly #stops: State<Stop[]> = signal([]);

    readonly _change = variable(this);
    readonly change$ = this._change.asObservable();

    constructor(
        stops: (Stop | [offset: number, color: string, opacity: number])[] = [],
        options: GradientOptions = {}
    ) {
        super(ensure_identifier(options));

        if (typeof options.spreadMethod === "string") {
            this.spreadMethod = options.spreadMethod;
        }
        if (typeof options.units === "string") {
            this.units = options.units;
        }

        this.#stops = signal(map_to_stops(stops));
    }

    override dispose(): void {
        super.dispose();
    }

    serialize(): string {
        return `url(#${this.id})`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render<T>(viewDOM: ViewDOM<T>, defs: T): void {
        this.zzz.disposables.push(
            effect(() => {
                while (viewDOM.getLastChild(this.zzz.viewee as T)) {
                    viewDOM.removeChild(this.zzz.viewee as T, viewDOM.getLastChild(this.zzz.viewee as T));
                }

                const stops = this.stops;
                const N = stops.length;
                for (let i = 0; i < N; i++) {
                    const stop = stops[i];
                    {
                        const attrs: SVGAttributes = { id: stop.id };
                        const stopElement = viewDOM.createSVGElement("stop", attrs);
                        stop.zzz.viewee = stopElement;
                        viewDOM.appendChild(this.zzz.viewee as T, stopElement);
                        stop.zzz.disposables.push(
                            effect(() => {
                                viewDOM.setAttribute(stopElement, "offset", 100 * stop.offset + "%");
                            })
                        );
                        stop.zzz.disposables.push(
                            effect(() => {
                                viewDOM.setAttribute(stopElement, "stop-color", stop.color);
                            })
                        );
                        stop.zzz.disposables.push(
                            effect(() => {
                                viewDOM.setAttribute(stopElement, "stop-opacity", `${stop.opacity}`);
                            })
                        );
                    }
                }
            })
        );
    }

    incrementUse<T>(viewDOM: ViewDOM<T>, defs: T): void {
        this.#refCount++;
        if (this.#refCount === 1) {
            this.render(viewDOM, defs);
        }
    }

    decrementUse<T>(viewDOM: ViewDOM<T>, defs: T): void {
        this.#refCount--;
        if (this.#refCount === 0) {
            viewDOM.removeChild(defs, viewDOM.downcast(this.zzz.viewee));
            this.zzz.viewee = null;
        }
    }

    update(): this {
        if (this._flagStops) {
            this._change.set(this);
        }
        return this;
    }

    flagReset(dirtyFlag = false): this {
        this._flagStops = dirtyFlag;
        return this;
    }

    /**
     * Indicates what happens if the gradient starts or ends inside the bounds of the target rectangle.
     * @see {@link https://www.w3.org/TR/SVG11/pservers.html#LinearGradientElementSpreadMethodAttribute} for more information
     */
    get spreadMethod(): "pad" | "reflect" | "repeat" {
        return this.#spreadMethod.get();
    }
    set spreadMethod(spread: "pad" | "reflect" | "repeat") {
        this.#spreadMethod.set(spread);
    }
    get stops(): Stop[] {
        return this.#stops.get();
    }
    set stops(stops: Stop[]) {
        this.#stops.set(stops);
    }
    /**
     * Indicates how coordinate values are interpreted by the renderer.
     * @see {@link https://www.w3.org/TR/SVG11/pservers.html#RadialGradientElementGradientUnitsAttribute} for more information
     */
    get units(): "userSpaceOnUse" | "objectBoundingBox" {
        return this.#units.get();
    }
    set units(units: "userSpaceOnUse" | "objectBoundingBox") {
        this.#units.set(units);
    }
}

function ensure_identifier(attributes: GradientOptions): string {
    if (typeof attributes.id === "string") {
        return attributes.id;
    } else {
        return `${Constants.Identifier}${Constants.uniqueId()}`;
    }
}

function map_to_stops(stops: (Stop | [offset: number, color: string, opacity: number])[]): Stop[] {
    const retval: Stop[] = [];
    const N = stops.length;
    for (let i = 0; i < N; i++) {
        const candidate = stops[i];
        if (candidate instanceof Stop) {
            retval.push(candidate);
        } else if (Array.isArray(candidate)) {
            retval.push(new Stop(candidate[0], candidate[1], candidate[2]));
        } else {
            throw new Error();
        }
    }
    return retval;
}
