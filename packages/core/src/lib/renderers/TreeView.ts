import { signal } from "@g20/reactive";
import { Group } from "../Group";
import { ViewDOM } from "../Shape";
import { sizeEquals } from "./Size";
import { View } from "./View";

/**
 *
 */
export class TreeView<T> implements View<T> {
    /**
     * The topmost svg element.
     */
    readonly domElement: T;
    readonly viewBox: Group;
    readonly #defs: T;

    readonly #size = signal({ width: 0, height: 0 }, { equals: sizeEquals });

    readonly #viewDOM: ViewDOM<T>;

    constructor(viewDOM: ViewDOM<T>, viewBox: Group, containerId: string) {
        this.#viewDOM = viewDOM;
        this.viewBox = viewBox;
        this.viewBox.parent = null;
        this.domElement = this.#viewDOM.createSVGElement("svg", {
            id: `${containerId}-svg`
        });

        this.#defs = this.#viewDOM.createSVGElement("defs", {});
        // set_defs_dirty_flag(this.#defs, false);
        this.#viewDOM.appendChild(this.domElement, this.#defs);
        this.#viewDOM.setStyle(this.domElement, "overflow", "hidden");
    }

    get width(): number {
        return this.#size.get().width;
    }
    set width(width: number) {
        const size = this.#size.get();
        size.width = width;
        this.#size.set(size);
    }

    get height(): number {
        return this.#size.get().height;
    }
    set height(height: number) {
        const size = this.#size.get();
        size.height = height;
        this.#size.set(size);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSize(size: { width: number; height: number }, ratio: number): this {
        this.width = size.width;
        this.height = size.height;
        this.#viewDOM.setAttributes(this.domElement, {
            width: `${size.width}px`,
            height: `${size.height}px`
        });
        this.#size.set(size);
        return this;
    }

    render(): this {
        const svgElement = this.domElement;
        this.viewBox.render(this.#viewDOM, this.domElement, svgElement);
        // svg.defs.update(svgElement, this.#defs);
        return this;
    }
}
