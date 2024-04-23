import { G20 } from './math/G20';
import { Observable } from './reactive/Observable';
export declare class Anchor {
    #private;
    /**
     * default is zero.
     */
    readonly origin: G20;
    readonly controls: {
        a: G20;
        b: G20;
    };
    readonly change$: Observable<this>;
    /**
     * @param origin
     * @param ax The x position of the left handle point.
     * @param ay The y position of the left handle point.
     * @param bx The x position of the right handle point.
     * @param by The y position of the right handle point.
     * @param command The command to describe how to render. Applicable commands are {@link Commands}
     */
    constructor(origin: G20, command?: 'M' | 'L' | 'C' | 'A' | 'Z', ax?: number, ay?: number, bx?: number, by?: number);
    dispose(): void;
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get t(): number;
    set t(t: number);
    copy(v: Anchor): this;
    /**
     * Invoked when the path is automatic (not manual).
     */
    ignore(): void;
    /**
     * Invoked when the path is manual (not automatic).
     */
    listen(): void;
    /**
     * default is 'M'.
     */
    get command(): 'M' | 'L' | 'C' | 'A' | 'Z';
    set command(command: 'M' | 'L' | 'C' | 'A' | 'Z');
    /**
     * default is true.
     */
    get relative(): boolean;
    set relative(relative: boolean);
    /**
     * default is zero.
     */
    get rx(): number;
    set rx(rx: number);
    /**
     * default is zero.
     */
    get ry(): number;
    set ry(ry: number);
    /**
     * default is zero.
     */
    get xAxisRotation(): number;
    set xAxisRotation(xAxisRotation: number);
    /**
     * default is zero.
     */
    get largeArcFlag(): number;
    set largeArcFlag(largeArcFlag: number);
    /**
     * default is one.
     */
    get sweepFlag(): number;
    set sweepFlag(sweepFlag: number);
}
