import { Observable as RxjsObservable } from 'rxjs';
import { Disposable } from './Disposable';
export interface Observable<T> {
    subscribe(callback: (value: T) => void): Disposable;
}
export declare class DisposableObservable<T> implements Observable<T> {
    #private;
    constructor(rxjs: RxjsObservable<T>);
    subscribe(callback: (value: T) => void): Disposable;
}
