import { Collection } from './collection';
import { Disposable } from './reactive/Disposable';

export interface Child {
    readonly id: string;
}

/**
 * A children collection which is accesible both by index and by object `id`.
 */
export class Children<T extends Child> extends Collection<T> {

    readonly ids: { [id: string]: T } = {};

    readonly #insert_subscription: Disposable;
    readonly #remove_subscription: Disposable;

    constructor(children: T[]) {
        super(children);

        this.#attach(children);

        this.#insert_subscription = this.insert$.subscribe((cs: T[]) => {
            this.#attach(cs);
        });

        this.#remove_subscription = this.remove$.subscribe((cs: T[]) => {
            this.#detach(cs);
        });
    }

    dispose(): void {
        this.#insert_subscription.dispose();
        this.#remove_subscription.dispose();
    }

    #attach(children: T[]): this {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child && child.id) {
                this.ids[child.id] = child;
            }
        }
        return this;
    }

    #detach(children: T[]): this {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            delete this.ids[child.id];
        }
        return this;
    }
}
