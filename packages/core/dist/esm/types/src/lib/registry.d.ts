export declare class Registry<T> {
    map: {
        [id: string]: T;
    };
    constructor();
    add(id: string, obj: T): this;
    remove(id: string): this;
    get(id: string): T;
    contains(id: string): boolean;
}
