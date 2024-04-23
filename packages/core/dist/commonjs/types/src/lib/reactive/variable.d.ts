import { BehaviorSubject } from "rxjs";
import { Observable } from "./Observable";
import { Equals, State } from "./types";
export interface VariableAttributes<T> {
    equals?: Equals<T>;
}
export declare class Variable<T> implements State<T> {
    #private;
    constructor(bs: BehaviorSubject<T>, attributes?: VariableAttributes<T>);
    get(): T;
    set(newValue: T): void;
    asObservable(): Observable<T>;
}
export declare function variable<T>(initialValue: T, attributes?: VariableAttributes<T>): Variable<T>;
