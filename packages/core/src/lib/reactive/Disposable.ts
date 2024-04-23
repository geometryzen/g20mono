
/**
 * An object should be Disposable if its lifetime is bounded by the holder.
 * Such objects are normally created by the holding object.
 */
export interface Disposable {
    dispose(): void;
}

/**
 * Calls `dispose()` on each element of `disposables`, traversing the array in reverse order.
 * When all dispose() calls have been made, the length of the disposables is set to zero.
 */
export function dispose<T extends Disposable>(disposables: T[]): void {
    // Our convention is to push disposables onto a $references array.
    // This means that the last disposable pushed is at the end of the array.
    // It is more appropriate to dispose in LIFO (Last In First Out) order.
    // So we iterate the disposables in reverse.
    const length = disposables.length;
    for (let i = length - 1; i >= 0; i--) {
        disposables[i].dispose();
    }
    disposables.length = 0;
}

export function disposable_from_disposables(disposables: Disposable[]): Disposable {
    return disposableFromFunction(() => {
        dispose(disposables);
    });
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function disposableFromFunction(f: Function): Disposable {
    return {
        dispose: () => {
            f();
        },
    };
}
