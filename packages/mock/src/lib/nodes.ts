export class MockNode {
    parent: MockElement | null = null;
}

export class MockElement extends MockNode {
    readonly style = new Map<string, string>();
    readonly #attributes = new Map<string, string>();
    readonly #children: MockNode[] = [];
    constructor(readonly name: string) {
        super();
    }
    get children(): MockNode[] {
        return this.#children;
    }
    appendChild(child: MockNode) {
        this.#children.push(child);
        child.parent = this;
    }
    getAttribute(name: string): string | null {
        if (this.#attributes.has(name)) {
            return this.#attributes.get(name);
        } else {
            return null;
        }
    }
    getAttributeNames(): string[] {
        return [...this.#attributes.keys()].sort();
    }
    removeAttribute(name: string): void {
        this.#attributes.delete(name);
    }
    setAttribute(name: string, value: string): void {
        this.#attributes.set(name, value);
    }
}
