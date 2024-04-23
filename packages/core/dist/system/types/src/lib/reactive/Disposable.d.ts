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
export declare function dispose<T extends Disposable>(disposables: T[]): void;
export declare function disposable_from_disposables(disposables: Disposable[]): Disposable;
export declare function disposableFromFunction(f: Function): Disposable;
