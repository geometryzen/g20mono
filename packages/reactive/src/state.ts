import { Signal as Sp } from "signal-polyfill";
import { Equals, State } from "./types";

export function state<T>(initialValue: T, options: { equals?: Equals<T> } = {}): State<T> {
    return new Sp.State(initialValue, options);
}
