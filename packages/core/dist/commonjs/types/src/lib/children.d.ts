import { Collection } from './collection';
export interface Child {
    readonly id: string;
}
/**
 * A children collection which is accesible both by index and by object `id`.
 */
export declare class Children<T extends Child> extends Collection<T> {
    #private;
    readonly ids: {
        [id: string]: T;
    };
    constructor(children: T[]);
    dispose(): void;
}
