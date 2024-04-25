import { Signal as Sp } from "signal-polyfill";

export function untrack<T>(cb: () => T) {
    return Sp.subtle.untrack(cb);
}