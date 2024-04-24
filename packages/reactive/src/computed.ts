import { Signal as Sp } from "signal-polyfill";
import { Equals, Readable } from "./types";

export function computed<T>(computation: () => T, options: { equals?: Equals<T> } = {}): Readable<T> {
    return new Sp.Computed(computation, options);
}
