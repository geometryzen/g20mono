import { Observable } from './reactive/Observable';
/**
 * TODO: If this was iterable then there would be less need for the length and getAt.
 */
export declare class Collection<T> {
    #private;
    readonly insert$: Observable<T[]>;
    readonly remove$: Observable<T[]>;
    readonly order$: Observable<void>;
    constructor(items: T[]);
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: unknown): void;
    get length(): number;
    getAt(index: number): T;
    get(): T[];
    ping(): void;
    pop(): T;
    shift(): T;
    push(...items: T[]): number;
    unshift(...items: T[]): number;
    splice(start: number, deleteCount?: number, ...more: T[]): T[];
    sort(compareFn: (a: T, b: T) => number): this;
    reverse(): this;
    indexOf(searchElement: T, fromIndex?: number): number;
    map<X>(callbackfn: (value: T, index: number, array: T[]) => X, thisArg?: any): X[];
}
