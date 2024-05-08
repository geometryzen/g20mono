import { state } from "g2o-reactive";
import { Group } from "../group";
import { ViewDOM } from "../Shape";
import { sizeEquals } from "./Size";
import { View } from "./View";

export interface TreeViewParams<T> {
    domElement?: T;
}

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

    readonly #size = state({ width: 0, height: 0 }, { equals: sizeEquals });

    readonly #viewDOM: ViewDOM<T>;

    constructor(viewDOM: ViewDOM<T>, viewBox: Group, containerId: string, params: TreeViewParams<T> = {}) {
        this.#viewDOM = viewDOM;
        if (viewBox instanceof Group) {
            this.viewBox = viewBox;
            this.viewBox.parent = null;
        }
        else {
            throw new Error("viewBox must be a Group");
        }
        if (params.domElement) {
            this.domElement = params.domElement;
        }
        else {
            this.domElement = this.#viewDOM.createSVGElement('svg', { id: `${containerId}-svg` });
        }

        this.#defs = this.#viewDOM.createSVGElement('defs', {});
        // set_defs_dirty_flag(this.#defs, false);
        this.#viewDOM.appendChild(this.domElement, this.#defs);
        this.#viewDOM.setStyle(this.domElement, 'overflow', 'hidden');
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
    setSize(size: { width: number, height: number }, ratio: number): this {
        this.width = size.width;
        this.height = size.height;
        this.#viewDOM.setAttributes(this.domElement, { width: `${size.width}px`, height: `${size.height}px` });
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
