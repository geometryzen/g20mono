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
    get textContent(): string {
        if (this.#children.length === 1) {
            const text = this.#children[0];
            if (text instanceof MockText) {
                return text.content;
            }
        }
        return "";
    }
    set textContent(content: string) {
        this.#children.length = 0;
        this.appendChild(new MockText(content));
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

export class MockText extends MockNode {
    constructor(readonly content: string) {
        super();
    }
}
