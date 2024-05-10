import { signal, State } from "g2o-reactive";
import { Disposable } from './reactive/Disposable';
import { ZZZ } from './renderers/ZZZ';

/**
 * The foundational object for the scenegraph.
 */
export abstract class ElementBase implements Disposable {

    parent: unknown;

    readonly zzz: ZZZ = new ZZZ();

    readonly #id: State<string | null>;

    constructor(id: string | null) {
        this.#id = signal(id);
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
