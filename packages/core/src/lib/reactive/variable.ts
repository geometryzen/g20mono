import { BehaviorSubject } from "rxjs";
import { DisposableObservable, Observable } from "./Observable";
import { Equals, State } from "./types";

export interface VariableAttributes<T> {
    equals?: Equals<T>;
}

export class Variable<T> implements State<T> {
    readonly #bs: BehaviorSubject<T>;
    // readonly #attributes: VariableAttributes<T>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(bs: BehaviorSubject<T>, attributes: VariableAttributes<T> = {}) {
        this.#bs = bs;
        // this.#attributes = attributes;
    }
    get(): T {
        return this.#bs.getValue();
    }
    set(newValue: T): void {
        // It appears that we need the first value for initialization.
        this.#bs.next(newValue);
        /*
        const oldValue = this.#bs.getValue();
        if (newValue !== oldValue) {
            this.#bs.next(newValue);
        }
        else {
            if (this.#attributes.equals) {
                if (this.#attributes.equals(newValue, oldValue)) {
                    // Do nothing.
                }
                else {
                    this.#bs.next(newValue);
                }
            }
        }
        */
    }
    asObservable(): Observable<T> {
        return new DisposableObservable(this.#bs.asObservable());
    }
}


export function variable<T>(initialValue: T, attributes: VariableAttributes<T> = {}): Variable<T> {
    const bs = new BehaviorSubject(initialValue);
    return new Variable(bs, attributes);
}