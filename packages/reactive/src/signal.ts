import { Signal as Sp } from "signal-polyfill";
import { Equals, State } from "./types";

/**
 * Creates a signal.
 */
export function signal<T>(initialValue: T, options: { equals?: Equals<T> } = {}): State<T> {
    return new Sp.State(initialValue, options);
}
