import { G20 } from './math/G20';
import { Disposable } from './reactive/Disposable';
import { Observable } from './reactive/Observable';
import { variable } from './reactive/variable';
import { Commands } from './utils/path-commands';

export class Anchor {
    /**
     * default is zero.
     */
    readonly origin: G20;
    readonly #origin_change: Disposable;
    readonly controls = {
        a: new G20(),
        b: new G20()
    };
    readonly #a_change: Disposable;
    readonly #b_change: Disposable;

    #command: 'M' | 'L' | 'C' | 'A' | 'Z';
    #relative: boolean;

    #rx: number;
    #ry: number;
    #xAxisRotation: number;
    #largeArcFlag: number;
    #sweepFlag: number;

    readonly #change = variable(this);
    readonly change$: Observable<this> = this.#change.asObservable();

    #t: number;

    /**
     * @param origin
     * @param ax The x position of the left handle point.
     * @param ay The y position of the left handle point.
     * @param bx The x position of the right handle point.
     * @param by The y position of the right handle point.
     * @param command The command to describe how to render. Applicable commands are {@link Commands}
     */
    constructor(origin: G20, command: 'M' | 'L' | 'C' | 'A' | 'Z' = Commands.move, ax = 0, ay = 0, bx = 0, by = 0) {

        this.origin = origin;
        this.controls.a.set(ax, ay);
        this.controls.b.set(bx, by);

        this.#command = command;
        this.#relative = true;
        this.#rx = 0;
        this.#ry = 0;
        this.#xAxisRotation = 0;
        this.#largeArcFlag = 0;
        this.#sweepFlag = 1;

        this.#t = 0;

        this.#origin_change = this.origin.change$.subscribe(() => {
            this.#change.set(this);
        });
        this.#a_change = this.controls.a.change$.subscribe(() => {
            this.#change.set(this);
        });
        this.#b_change = this.controls.b.change$.subscribe(() => {
            this.#change.set(this);
        });
    }

    dispose(): void {
        if (this.#origin_change) {
            this.#origin_change.dispose();
        }
        if (this.#a_change) {
            this.#a_change.dispose();
        }
        if (this.#b_change) {
            this.#b_change.dispose();
        }
    }

    get x() {
        return this.origin.x;
    }

    set x(x: number) {
        this.origin.x = x;
    }

    get y() {
        return this.origin.y;
    }

    set y(y: number) {
        this.origin.y = y;
    }

    get t(): number {
        return this.#t;
    }
    set t(t: number) {
        if (this.t !== t) {
            this.#t = t;
        }
    }

    copy(v: Anchor): this {
        this.origin.copyVector(v.origin);
        this.command = v.command;
        this.controls.a.copyVector(v.controls.a);
        this.controls.b.copyVector(v.controls.b);
        this.relative = v.relative;
        this.rx = v.rx;
        this.ry = v.ry;
        this.xAxisRotation = v.xAxisRotation;
        this.largeArcFlag = v.largeArcFlag;
        this.sweepFlag = v.sweepFlag;
        return this;
    }

    /**
     * Invoked when the path is automatic (not manual).
     */
    ignore(): void {
        throw new Error("TODO: Anchor.ignore()");
    }

    /**
     * Invoked when the path is manual (not automatic).
     */
    listen(): void {
        // Do nothing.
        // throw new Error("TODO: Anchor.listen()");
    }

    /**
     * default is 'M'.
     */
    get command(): 'M' | 'L' | 'C' | 'A' | 'Z' {
        return this.#command;
    }
    set command(command: 'M' | 'L' | 'C' | 'A' | 'Z') {
        if (this.command !== command) {
            this.#command = command;
        }
    }
    /**
     * default is true.
     */
    get relative(): boolean {
        return this.#relative;
    }
    set relative(relative: boolean) {
        if (this.relative !== !!relative) {
            this.#relative = relative;
        }
    }
    /**
     * default is zero.
     */
    get rx(): number {
        return this.#rx;
    }
    set rx(rx: number) {
        if (this.rx !== rx) {
            this.#rx = rx;
        }
    }
    /**
     * default is zero.
     */
    get ry(): number {
        return this.#ry;
    }
    set ry(ry: number) {
        if (this.ry !== ry) {
            this.#ry = ry;
        }
    }
    /**
     * default is zero.
     */
    get xAxisRotation(): number {
        return this.#xAxisRotation;
    }
    set xAxisRotation(xAxisRotation: number) {
        if (this.xAxisRotation !== xAxisRotation) {
            this.#xAxisRotation = xAxisRotation;
        }
    }
    /**
     * default is zero.
     */
    get largeArcFlag(): number {
        return this.#largeArcFlag;
    }
    set largeArcFlag(largeArcFlag) {
        if (this.largeArcFlag !== largeArcFlag) {
            this.#largeArcFlag = largeArcFlag;
        }
    }
    /**
     * default is one.
     */
    get sweepFlag(): number {
        return this.#sweepFlag;
    }
    set sweepFlag(sweepFlag) {
        if (this.sweepFlag !== sweepFlag) {
            this.#sweepFlag = sweepFlag;
        }
    }
}
