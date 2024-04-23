import { Child } from './children';
import { Flag } from './Flag';
import { Disposable } from './reactive/Disposable';
import { ZZZ } from './renderers/ZZZ';

/**
 * The foundational object for the scenegraph.
 */
export abstract class ElementBase<P> implements Child, Disposable {
    /**
     * 
     */
    parent: P;

    /**
     * 
     */
    readonly zzz: ZZZ = new ZZZ();

    readonly #id: string;

    #className = '';

    classList: string[] = [];

    constructor(id: string) {
        this.#id = id;
        this.flagReset(false);
    }

    dispose(): void {
        this.zzz.dispose();
    }

    flagReset(dirtyFlag = false): this {
        this.zzz.flags[Flag.ClassName] = dirtyFlag;
        return this;
    }
    get id(): string {
        return this.#id;
    }
    get className(): string {
        return this.#className;
    }
    set className(className: string) {
        if (this.className !== className) {
            this.zzz.flags[Flag.ClassName] = true;
            this.classList = className.split(/\s+?/);
            this.#className = className;
        }
    }
}
