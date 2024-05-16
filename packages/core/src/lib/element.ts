import { signal, State } from "@g20/reactive";
import { Disposable } from './reactive/Disposable';
import { ZZZ } from './renderers/ZZZ';

/**
 * The foundational object for the scenegraph.
 */
export abstract class ElementBase implements Disposable {

    parent: unknown;

    readonly zzz: ZZZ = new ZZZ();

    readonly #id: State<string | null> = signal(null);

    constructor(id: string | null) {
        if (typeof id === 'string') {
            this.#id = signal(id);
        }
    }

    dispose(): void {
        this.zzz.dispose();
    }

    get id(): string | null {
        return this.#id.get();
    }
    set id(id: string | null) {
        this.#id.set(id);
    }
}
