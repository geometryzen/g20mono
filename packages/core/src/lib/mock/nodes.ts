export class MockNode {
    parent: MockElement | null = null;
}

export class MockElement extends MockNode {
    readonly style = new Map<string, string>();
    readonly #attributes = new Map<string, string>();
    readonly #children: MockNode[] = [];
    constructor(readonly qualifiedName: string) {
        super();
    }
    get children(): MockNode[] {
        return this.#children;
    }
    set textContent(content: string) {
        this.#children.length = 0;
        this.appendChild(new MockText(content));
    }
    appendChild(child: MockNode) {
        this.#children.push(child);
        child.parent = this;
    }
    getAttribute(qualifiedName: string): string | null {
        if (this.#attributes.has(qualifiedName)) {
            return this.#attributes.get(qualifiedName);
        }
        else {
            return null;
        }
    }
    removeAttribute(qualifiedName: string): void {
        this.#attributes.delete(qualifiedName);
    }
    setAttribute(qualifiedName: string, value: string): void {
        this.#attributes.set(qualifiedName, value);
    }
}

export class MockText extends MockNode {
    constructor(readonly content: string) {
        super();
    }
}
