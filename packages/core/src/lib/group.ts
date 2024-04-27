import { State, state } from 'g2o-reactive';
import { Flag } from './Flag';
import { Board } from './IBoard';
import { IShape } from './IShape';
import { svg, transform_value_of_matrix } from './renderers/SVGView';
import { Parent, Shape, ShapeAttributes } from './Shape';

export interface IGroup extends Parent {
    remove(...shapes: Shape[]): void;
}

export interface GroupAttributes {
    id: string;
}

export class Group extends Shape {

    readonly #shapes: State<Shape[]>;

    constructor(board: Board, shapes: Shape[] = [], attributes: Partial<GroupAttributes> = {}) {

        super(board, shape_attributes(attributes));

        this.flagReset(true);
        this.zzz.flags[Flag.Beginning] = false;
        this.zzz.flags[Flag.Ending] = false;
        this.zzz.flags[Flag.Length] = false;
        this.zzz.flags[Flag.ClipPath] = false;

        this.#shapes = state(shapes);
    }

    override dispose() {
        super.dispose();
    }

    hasBoundingBox(): boolean {
        return false;
    }

    render(parentElement: HTMLElement | SVGElement, svgElement: SVGElement): void {

        this.update();

        if (this.zzz.elem) {
            // Why is this needed when Shape has already created an effect?
            this.zzz.elem.setAttribute('transform', transform_value_of_matrix(this.matrix));
        }
        else {
            this.zzz.elem = svg.createElement('g', { id: this.id });
            parentElement.appendChild(this.zzz.elem);
            super.render(parentElement, svgElement);
        }

        /*
        const dom_context: DomContext = {
            domElement: domElement,
            elem: this.zzz.elem
        };
        */

        // dom_context.elem.appendChild(child.zzz.elem);
        // dom_context.elem.removeChild(child.zzz.elem);

        const children = this.children;
        const N = children.length;
        for (let i = 0; i < N; i++) {
            const child = children[i];
            const elem = this.zzz.elem;
            child.render(elem, svgElement);
        }

        // TODO: Why are we doing this here and why isn't it reactive?
        if (this.zzz.flags[Flag.ClassName]) {
            if (this.classList.length > 0) {
                this.zzz.elem.setAttribute('class', this.classList.join(' '));
            }
            else {
                this.zzz.elem.removeAttribute('class');
            }
        }

        // Commented two-way functionality of clips / masks with groups and
        // polygons. Uncomment when this bug is fixed:
        // https://code.google.com/p/chromium/issues/detail?id=370951

        // if (this._flagClip) {

        //   clip = svg.getClip(this, domElement);
        //   elem = this._renderer.elem;

        //   if (this.clip) {
        //     elem.removeAttribute('id');
        //     clip.setAttribute('id', this.id);
        //     clip.appendChild(elem);
        //   }
        else {
            //     clip.removeAttribute('id');
            //     elem.setAttribute('id', this.id);
            //     this.parent._renderer.elem.appendChild(elem); // TODO: should be insertBefore
            //   }

            // }

            // This code is a candidate for being put in Shape?
            if (this.zzz.flags[Flag.ClipPath]) {
                if (this.clipPath) {
                    this.clipPath.render(parentElement, svgElement);
                    this.zzz.elem.setAttribute('clip-path', 'url(#' + this.clipPath.id + ')');
                }
                else {
                    this.zzz.elem.removeAttribute('clip-path');
                }
            }
        }

        this.flagReset();
    }

    /**
     * Orient the children of the group to the upper left-hand corner of that group.
     */
    corner(): this {
        const bbox = this.getBoundingBox(true);

        const children = this.children;
        const N = children.length;
        for (let i = 0; i < N; i++) {
            const child = children[i];
            child.position.x -= bbox.left;
            child.position.y -= bbox.top;
        }

        if (this.clipPath) {
            this.clipPath.position.x -= bbox.left;
            this.clipPath.position.y -= bbox.top;
        }

        return this;
    }

    /**
     * Orient the children of the group to the center of that group.
     */
    center(): this {
        const bbox = this.getBoundingBox(true);
        const cx = (bbox.left + bbox.right) / 2 - this.position.x;
        const cy = (bbox.top + bbox.bottom) / 2 - this.position.y;
        const children = this.children;
        const N = children.length;
        for (let i = 0; i < N; i++) {
            const child = children[i];
            child.position.x -= cx;
            child.position.y -= cy;
        }
        if (this.clipPath) {
            this.clipPath.position.x -= cx;
            this.clipPath.position.y -= cy;
        }
        return this;
    }

    getById(id: string): IShape<unknown> {
        let found = null;
        function search(node: IShape<unknown>): IShape<unknown> {
            if (node.id === id) {
                return node;
            }
            else if (node instanceof Group && node.children) {
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

    getByClassName(className: string): IShape<unknown>[] {
        const found: IShape<unknown>[] = [];
        function search(node: IShape<unknown>) {
            if (Array.prototype.indexOf.call(node.classList, className) >= 0) {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getByType(type: any): IShape<unknown>[] {
        const found: IShape<unknown>[] = [];
        function search(node: IShape<unknown>) {
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
            if (!(child && child.id)) {
                continue;
            }
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

    getBoundingBox(shallow = false): { top: number; left: number; right: number; bottom: number; } {

        this.update();

        // Variables need to be defined here, because of nested nature of groups.
        let left = Infinity, right = -Infinity,
            top = Infinity, bottom = -Infinity;

        const matrix = shallow ? this.matrix : this.worldMatrix;

        for (let i = 0; i < this.children.length; i++) {

            const child = this.children[i];

            if (!(child.visibility === 'visible') || child.hasBoundingBox()) {
                continue;
            }

            const rect = child.getBoundingBox(shallow);

            const tc = typeof rect.top !== 'number' || isNaN(rect.top) || !isFinite(rect.top);
            const lc = typeof rect.left !== 'number' || isNaN(rect.left) || !isFinite(rect.left);
            const rc = typeof rect.right !== 'number' || isNaN(rect.right) || !isFinite(rect.right);
            const bc = typeof rect.bottom !== 'number' || isNaN(rect.bottom) || !isFinite(rect.bottom);

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
            }
            else {
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

    override flagReset(dirtyFlag = false) {
        this.zzz.flags[Flag.ClipPath] = dirtyFlag;
        this.zzz.flags[Flag.Beginning] = dirtyFlag;
        this.zzz.flags[Flag.Ending] = dirtyFlag;

        super.flagReset(dirtyFlag);

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

function shape_attributes(attributes: Partial<GroupAttributes>): ShapeAttributes {
    const retval: ShapeAttributes = {
        id: attributes.id
    };
    return retval;
}
