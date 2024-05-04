import { State, state } from 'g2o-reactive';
import { Flag } from './Flag';
import { Disposable } from './reactive/Disposable';
import { ZZZ } from './renderers/ZZZ';

/**
 * The foundational object for the scenegraph.
 */
export abstract class ElementBase<P> implements Disposable {
    /**
     * 
     */
    parent: P;

    /**
     * 
     */
    readonly zzz: ZZZ = new ZZZ();

    readonly #id: State<string | null>;

    #className = '';

    classList: string[] = [];

    constructor(id: string | null) {
        this.#id = state(id);
        this.flagReset(false);
    }

    dispose(): void {
        this.zzz.dispose();
    }

    flagReset(dirtyFlag = false): this {
        this.zzz.flags[Flag.ClassName] = dirtyFlag;
        return this;
    }
    get id(): string | null {
        return this.#id.get();
    }
    set id(id: string | null) {
        this.#id.set(id);
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
