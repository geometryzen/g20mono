import { ColorProvider, Disposable, G20 } from 'g2o';
import { Gradient } from './gradient';
import { Stop } from './stop';
import { createElement, get_svg_element_defs, setAttributes, SVGAttributes } from './svg';

export class LinearGradient extends Gradient implements ColorProvider {

    _flagEndPoints = false;

    #left: G20 | null = null;
    #left_change_subscription: Disposable | null = null;
    #right: G20 | null = null;
    #right_change_subscription: Disposable | null = null;

    /**
     * @param x1 The x position of the first end point of the linear gradient.
     * @param y1 The y position of the first end point of the linear gradient.
     * @param x2 The x position of the second end point of the linear gradient.
     * @param y2 The y position of the second end point of the linear gradient.
     * @param stops A list of {@link Stop}s that contain the gradient fill pattern for the gradient.
     * The linear gradient lives within the space of the parent object's matrix space.
     */
    constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, stops: Stop[] = []) {
        super(stops);
        this.left = new G20(x1, y1);
        this.right = new G20(x2, y2);
    }

    render(svgElement: SVGElement): this {
        const changed: SVGAttributes = {};

        if (this._flagEndPoints) {
            changed.x1 = `${this.left.x}`;
            changed.y1 = `${this.left.y}`;
            changed.x2 = `${this.right.x}`;
            changed.y2 = `${this.right.y}`;
        }

        // If there is no attached DOM element yet,
        // create it with all necessary attributes.
        if (this.zzz.elem) {
            setAttributes(this.zzz.elem, changed);
        }
        else {
            changed.id = this.id;
            this.zzz.elem = createElement('linearGradient', changed);

            this.zzz.disposables.push(this.zzz.units$.subscribe((units) => {
                const change: SVGAttributes = {};
                change.gradientUnits = units;
                setAttributes(this.zzz.elem, change);
            }));
            this.zzz.disposables.push(this.zzz.spreadMethod$.subscribe((spreadMethod) => {
                const change: SVGAttributes = {};
                change.spreadMethod = spreadMethod;
                setAttributes(this.zzz.elem, change);
            }));
        }

        if (this.zzz.elem.parentNode === null) {
            get_svg_element_defs(svgElement).appendChild(this.zzz.elem);
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

                if (!stop.zzz.elem) {
                    stop.zzz.elem = createElement('stop', attrs);
                }
                else {
                    setAttributes(stop.zzz.elem, attrs);
                }

                if (lengthChanged) {
                    this.zzz.elem.appendChild(stop.zzz.elem);
                }
                stop.flagReset();
            }
        }
        return this.flagReset();
    }

    static Properties = ['left', 'right'];

    update() {
        if (this._flagEndPoints || this._flagStops) {
            this._change.set(this);
        }
        return this;
    }

    override flagReset(dirtyFlag = false) {
        this._flagEndPoints = dirtyFlag;
        super.flagReset(dirtyFlag);
        return this;
    }
    get left() {
        return this.#left;
    }
    set left(v) {
        if (this.#left_change_subscription) {
            this.#left_change_subscription.dispose();
            this.#left_change_subscription = null;
        }
        this.#left = v;
        this.#left_change_subscription = this.#left.change$.subscribe(() => {
            this._flagEndPoints = true;
        });
        this._flagEndPoints = true;
    }
    get right() {
        return this.#right;
    }
    set right(v) {
        if (this.#right_change_subscription) {
            this.#right_change_subscription.dispose();
            this.#right_change_subscription = null;
        }
        this.#right = v;
        this.#right_change_subscription = this.#right.change$.subscribe(() => {
            this._flagEndPoints = true;
        });
        this._flagEndPoints = true;
    }
}
