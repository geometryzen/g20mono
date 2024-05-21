import { State, signal } from "@g20/reactive";
import { Board } from "./Board";
import { Flag } from "./Flag";
import { transform_value_of_matrix } from "./renderers/SVGViewDOM";
import { Shape, ViewDOM } from "./Shape";
import { ShapeBase, ShapeOptions } from "./ShapeBase";

export interface GroupOptions extends ShapeOptions {
    id?: string;
}

export class Group extends ShapeBase {
    readonly #shapes: State<Shape[]>;

    constructor(owner: Board, shapes: Shape[] = [], options: GroupOptions = {}) {
        super(owner, shape_attributes(options));

        this.flagReset(true);
        this.zzz.flags[Flag.Beginning] = false;
        this.zzz.flags[Flag.Ending] = false;
        this.zzz.flags[Flag.ClipPath] = false;

        this.#shapes = signal(shapes);
    }

    override dispose() {
        for (const child of this.children) {
            child.dispose();
        }
        super.dispose();
    }

    hasBoundingBox(): boolean {
        return false;
    }

    override render<T>(viewDOM: ViewDOM<T>, parentElement: T, svgElement: T): void {
        this.update();

        if (this.zzz.viewee) {
            // Why is this needed when Shape has already created an effect?
            viewDOM.setAttribute(this.zzz.viewee as T, "transform", transform_value_of_matrix(this.matrix));
        } else {
            if (viewDOM) {
                const g = viewDOM.createSVGElement("g", { id: this.id });
                this.zzz.viewee = g;
                if (parentElement) {
                    viewDOM.appendChild(parentElement, g);
                    super.render(viewDOM, parentElement, svgElement);
                } else {
                    throw new Error("parentElement must be defined");
                }
            } else {
                throw new Error("viewDOM must be defined");
            }
        }

        const children = this.children;
        const N = children.length;
        const childParentElement = this.zzz.viewee;
        for (let i = 0; i < N; i++) {
            const child = children[i];
            child.render(viewDOM, childParentElement, svgElement);
        }

        this.flagReset();
    }

    /**
     * Orient the children of the group to the center of that group.
     */
    center(): this {
        const bbox = this.getBoundingBox(true);
        const cx = (bbox.left + bbox.right) / 2 - this.X.x;
        const cy = (bbox.top + bbox.bottom) / 2 - this.X.y;
        const children = this.children;
        const N = children.length;
        for (let i = 0; i < N; i++) {
            const child = children[i];
            child.X.x -= cx;
            child.X.y -= cy;
        }
        if (this.mask) {
            this.mask.X.x -= cx;
            this.mask.X.y -= cy;
        }
        return this;
    }

    getById(id: string): Shape {
        let found = null;
        function search(node: Shape): Shape {
            if (node.id === id) {
                return node;
            } else if (node instanceof Group && node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    found = search(node.children[i]);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        }
        return search(this);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getByType(type: any): Shape[] {
        const found: Shape[] = [];
        function search(node: Shape) {
            if (node instanceof type) {
                found.push(node);
            }
            if (node instanceof Group && node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    const child = node.children[i];
                    search(child);
                }
            }
            return found;
        }
        return search(this);
    }

    add(...shapes: Shape[]) {
        const children = this.children;
        for (let i = 0; i < shapes.length; i++) {
            const child = shapes[i];
            const index = children.indexOf(child);
            if (index >= 0) {
                children.splice(index, 1);
            }
            children.push(child);
        }
        return this;
    }

    remove(...shapes: Shape[]) {
        const children = this.children;
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            shape.dispose();
            const index = children.indexOf(shape);
            if (index >= 0) {
                children.splice(index, 1);
            }
        }
        return this;
    }

    getBoundingBox(shallow = false): {
        top: number;
        left: number;
        right: number;
        bottom: number;
    } {
        this.update();

        // Variables need to be defined here, because of nested nature of groups.
        let left = Infinity,
            right = -Infinity,
            top = Infinity,
            bottom = -Infinity;

        const matrix = shallow ? this.matrix : this.worldMatrix;

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];

            if (!(child.visibility === "visible") || child.hasBoundingBox()) {
                continue;
            }

            const rect = child.getBoundingBox(shallow);

            const tc = typeof rect.top !== "number" || isNaN(rect.top) || !isFinite(rect.top);
            const lc = typeof rect.left !== "number" || isNaN(rect.left) || !isFinite(rect.left);
            const rc = typeof rect.right !== "number" || isNaN(rect.right) || !isFinite(rect.right);
            const bc = typeof rect.bottom !== "number" || isNaN(rect.bottom) || !isFinite(rect.bottom);

            if (tc || lc || rc || bc) {
                continue;
            }

            if (shallow) {
                const [ax, ay] = matrix.multiply_vector(rect.left, rect.top);
                const [bx, by] = matrix.multiply_vector(rect.right, rect.top);
                const [cx, cy] = matrix.multiply_vector(rect.left, rect.bottom);
                const [dx, dy] = matrix.multiply_vector(rect.right, rect.bottom);

                top = Math.min(ay, by, cy, dy);
                left = Math.min(ax, bx, cx, dx);
                right = Math.max(ax, bx, cx, dx);
                bottom = Math.max(ay, by, cy, dy);
            } else {
                top = Math.min(rect.top, top);
                left = Math.min(rect.left, left);
                right = Math.max(rect.right, right);
                bottom = Math.max(rect.bottom, bottom);
            }
        }

        return { top, left, right, bottom };
    }

    update(): this {
        return super.update();
    }

    flagReset(dirtyFlag = false) {
        this.zzz.flags[Flag.ClipPath] = dirtyFlag;
        this.zzz.flags[Flag.Beginning] = dirtyFlag;
        this.zzz.flags[Flag.Ending] = dirtyFlag;
        return this;
    }
    /**
     * A list of all the children in the scenegraph.
     */
    get children(): Shape[] {
        return this.#shapes.get();
    }
    set children(children: Shape[]) {
        this.#shapes.set(children);

        for (let i = 0; i < children.length; i++) {
            const shape = children[i];
            update_shape_group(shape, this);
        }
    }
}

export function update_shape_group(child: Shape, parent?: Group) {
    const previous_parent = child.parent;

    if (previous_parent === parent) {
        return;
    }

    if (previous_parent && previous_parent instanceof Group) {
        const index = previous_parent.children.indexOf(child);
        previous_parent.children.splice(index, 1);
    }

    if (parent) {
        child.parent = parent;
        return;
    }

    delete child.parent;
}

function shape_attributes(options: Partial<GroupOptions>): ShapeOptions {
    const retval: ShapeOptions = {
        id: options.id,
        position: options.position
    };
    return retval;
}
