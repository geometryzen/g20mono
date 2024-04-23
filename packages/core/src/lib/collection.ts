import { Subject } from 'rxjs';
import { DisposableObservable, Observable } from './reactive/Observable';

/**
 * TODO: If this was iterable then there would be less need for the length and getAt.
 */
export class Collection<T> {

    readonly #insert: Subject<T[]>;
    readonly insert$: Observable<T[]>;

    readonly #remove: Subject<T[]>;
    readonly remove$: Observable<T[]>;

    readonly #order: Subject<void>;
    readonly order$: Observable<void>;

    #items: T[];

    constructor(items: T[]) {

        this.#items = items;

        this.#insert = new Subject();
        this.insert$ = new DisposableObservable(this.#insert.asObservable());

        this.#remove = new Subject();
        this.remove$ = new DisposableObservable(this.#remove.asObservable());

        this.#order = new Subject();
        this.order$ = new DisposableObservable(this.#order.asObservable());
    }

    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: unknown): void {
        this.#items.forEach(callbackfn, thisArg);
    }

    get length(): number {
        return this.#items.length;
    }

    getAt(index: number): T {
        return this.#items[index];
    }

    get(): T[] {
        return this.#items;
    }

    ping(): void {
        this.#insert.next(this.#items);
    }

    pop(): T {
        const x = this.#items.pop();
        this.#remove.next([x]);
        return x;
    }

    shift(): T {
        const x = this.#items.shift();
        this.#remove.next([x]);
        return x;
    }

    push(...items: T[]): number {
        const new_length = this.#items.push(...items);
        this.#insert.next(items);
        return new_length;
    }

    unshift(...items: T[]): number {
        const new_length = this.#items.unshift();
        this.#insert.next(items);
        return new_length;
    }

    splice(start: number, deleteCount?: number, ...more: T[]): T[] {
        // TODO: This needs some care because the behavior dependes on ...
        if (typeof deleteCount === 'number') {
            const xs = this.#items.splice(start, deleteCount, ...more);
            this.#remove.next(xs);
            return xs;
        }
        else {
            const xs = this.#items.splice(start);
            this.#remove.next(xs);
            return xs;
        }
        /*
        const spliced = super.splice.apply(this, arguments);
        this.trigger(Events.Types.remove, spliced);
        if (arguments.length > 2) {
            const inserted = this.slice(arguments[0], arguments[0] + arguments.length - 2);
            this.trigger(Events.Types.insert, inserted);
            this.trigger(Events.Types.order);
        }
        return spliced;
        */
    }

    sort(compareFn: (a: T, b: T) => number): this {
        this.#items.sort(compareFn);
        this.#order.next();
        return this;
    }

    reverse(): this {
        this.#items.reverse();
        this.#order.next();
        return this;
    }

    indexOf(searchElement: T, fromIndex?: number): number {
        return this.#items.indexOf(searchElement, fromIndex);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map<X>(callbackfn: (value: T, index: number, array: T[]) => X, thisArg?: any): X[] {
        return this.#items.map(callbackfn, thisArg);
    }
}
