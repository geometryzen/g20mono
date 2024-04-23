import { Child } from './children';
import { Disposable } from './reactive/Disposable';
import { ZZZ } from './renderers/ZZZ';
/**
 * The foundational object for the scenegraph.
 */
export declare abstract class ElementBase<P> implements Child, Disposable {
    #private;
    /**
     *
     */
    parent: P;
    /**
     *
     */
    readonly zzz: ZZZ;
    classList: string[];
    constructor(id: string);
    dispose(): void;
    flagReset(dirtyFlag?: boolean): this;
    get id(): string;
    get className(): string;
    set className(className: string);
}
