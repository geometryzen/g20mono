import { Signal as Sp } from "signal-polyfill";
import { Equals, State } from "./types";

/**
 * Creates a signal using the Polyfill naming convention. Alias for {@link signal} function.
 */
export function state<T>(initialValue: T, options: { equals?: Equals<T> } = {}): State<T> {
    return new Sp.State(initialValue, options);
}

/**
 * Creates a signal using the Angular naming convention. Alias for {@link state} function.
 */
export function signal<T>(initialValue: T, options: { equals?: Equals<T> } = {}): State<T> {
    return new Sp.State(initialValue, options);
}
