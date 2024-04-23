export class Registry<T> {

    map: { [id: string]: T } = {};

    constructor() { }

    add(id: string, obj: T): this {
        this.map[id] = obj;
        return this;
    }

    remove(id: string): this {
        delete this.map[id];
        return this;
    }

    get(id: string): T {
        return this.map[id];
    }

    contains(id: string): boolean {
        return id in this.map;
    }
}
