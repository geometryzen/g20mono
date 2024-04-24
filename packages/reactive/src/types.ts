
export type Equals<T> = (a: T, b: T) => boolean;

export interface Readable<T> {
    get(): T;
}

export interface Writable<T> {
    set(newValue: T): void;
}

export interface State<T> extends Readable<T>, Writable<T> {
}
