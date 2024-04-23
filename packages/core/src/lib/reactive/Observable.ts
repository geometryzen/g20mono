import { Observable as RxjsObservable } from 'rxjs';
import { Disposable } from './Disposable';

export interface Observable<T> {
    subscribe(callback: (value: T) => void): Disposable;
}

export class DisposableObservable<T> implements Observable<T> {
    #rxjs: RxjsObservable<T>;
    constructor(rxjs: RxjsObservable<T>) {
        this.#rxjs = rxjs;
    }
    subscribe(callback: (value: T) => void): Disposable {
        const subscription = this.#rxjs.subscribe(callback);
        const disposable: Disposable = {
            dispose(): void {
                subscription.unsubscribe();
            }
        };
        return disposable;
    }
}