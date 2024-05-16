import { ElementBase, variable } from "@g20/core";
import { signal } from "@g20/reactive";
import { Constants } from './constants';
import { Gradient } from './gradient';

export class Stop extends ElementBase {

    readonly #offset = signal(0);
    readonly #opacity = signal(1);
    readonly #color = signal('#fff');

    readonly #change = variable(this);
    readonly change$ = this.#change.asObservable();

    /**
     * @param offset The offset percentage of the stop represented as a zero-to-one value. Default value flip flops from zero-to-one as new stops are created.
     * @param color The color of the stop. Default value flip flops from white to black as new stops are created.
     * @param opacity The opacity value. Default value is 1, cannot be lower than 0.
     */
    constructor(offset?: number, color?: string, opacity?: number) {

        super(Constants.Identifier + Constants.uniqueId());

        this.offset = typeof offset === 'number' ? offset : Stop.Index <= 0 ? 0 : 1;

        this.opacity = typeof opacity === 'number' ? opacity : 1;

        this.color = (typeof color === 'string') ? color : Stop.Index <= 0 ? '#fff' : '#000';

        Stop.Index = (Stop.Index + 1) % 2;
    }

    /**
     * The current index being referenced for calculating a stop's default offset value.
     */
    static Index = 0;

    get color(): string {
        return this.#color.get();
    }
    set color(color: string) {
        this.#color.set(color);
        if (this.parent && this.parent instanceof Gradient) {
            this.parent._flagStops = true;
        }
        this.#change.set(this);
    }
    get offset(): number {
        return this.#offset.get();
    }
    set offset(offset: number) {
        this.#offset.set(offset);
        if (this.parent && this.parent instanceof Gradient) {
            this.parent._flagStops = true;
        }
        this.#change.set(this);
    }
    get opacity(): number {
        return this.#opacity.get();
    }
    set opacity(opacity: number) {
        this.#opacity.set(opacity);
        if (this.parent && this.parent instanceof Gradient) {
            this.parent._flagStops = true;
        }
        this.#change.set(this);
    }
}
