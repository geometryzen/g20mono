import { ElementBase, variable } from 'g2o';
import { Constants } from './constants';
import { Gradient } from './gradient';

export class Stop extends ElementBase<Gradient> {

    _flagOffset = true;
    _flagOpacity = true;
    _flagColor = true;

    _offset = 0;
    _opacity = 1;
    _color = '#fff';

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

    override flagReset(dirtyFlag = false) {
        this._flagOffset = this._flagColor = this._flagOpacity = dirtyFlag;
        super.flagReset(dirtyFlag);
        return this;
    }
    get color(): string {
        return this._color;
    }
    set color(v: string) {
        this._color = v;
        this._flagColor = true;
        if (this.parent) {
            this.parent._flagStops = true;
        }
        this.#change.set(this);
    }
    get offset(): number {
        return this._offset;
    }
    set offset(v: number) {
        this._offset = v;
        this._flagOffset = true;
        if (this.parent) {
            this.parent._flagStops = true;
        }
        this.#change.set(this);
    }
    get opacity(): number {
        return this._opacity;
    }
    set opacity(v: number) {
        this._opacity = v;
        this._flagOpacity = true;
        if (this.parent) {
            this.parent._flagStops = true;
        }
        this.#change.set(this);
    }
}
