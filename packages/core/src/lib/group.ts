import { Children } from './children';
import { Color } from './effects/ColorProvider';
import { Flag } from './Flag';
import { IBoard } from './IBoard';
import { IShape } from './IShape';
import { Disposable, dispose } from './reactive/Disposable';
import { DomContext, svg, SVGAttributes, transform_value_of_matrix } from './renderers/SVGView';
import { Parent, Shape, ShapeAttributes } from './Shape';

export interface IGroup extends Parent {
    remove(...shapes: Shape[]): void;
}

export interface GroupAttributes {
    id: string;
}

export class Group extends Shape {

    #strokeWidth = 1.0;
    #cap: 'butt' | 'round' | 'square' = 'round';
    #join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round' = 'round';
    #miter = 4;
    #closed = true;
    #curved = false;
    /**
     * Determines whether Path plots coordinates base don "closed" and "curved" flags.
     * The presence in Group seems unnecessary.
     */
    #automatic = true;

    /**
     * Number between zero and one to state the beginning of where the path is rendered.
     * a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     */
    #beginning = 0.0;

    /**
     * Number between zero and one to state the ending of where the path is rendered.
     * a percentage value that represents at what percentage into all child shapes should the renderer start drawing.
     */
    #ending = 1.0;

    #length = 0;

    #shapes: Children<Shape>;
    #shapes_insert: Disposable | null = null;
    #shapes_remove: Disposable | null = null;
    #shapes_order: Disposable | null = null;

    /**
     * An automatically updated list of shapes that need to be appended to the renderer's scenegraph.
     */
    readonly additions: Shape[] = [];
    /**
     * An automatically updated list of children that need to be removed from the renderer's scenegraph.
     */
    readonly subtractions: Shape[] = [];

    constructor(board: IBoard, shapes: Shape[] = [], attributes: Partial<GroupAttributes> = {}) {

        super(board, shape_attributes(attributes));

        this.flagReset(true);
        this.zzz.flags[Flag.Additions] = false;
        this.zzz.flags[Flag.Subtractions] = false;
        this.zzz.flags[Flag.Beginning] = false;
        this.zzz.flags[Flag.Ending] = false;
        this.zzz.flags[Flag.Length] = false;
        this.zzz.flags[Flag.Order] = false;
        this.zzz.flags[Flag.ClipPath] = false;

        this.#shapes = new Children(shapes);

        this.#subscribe_to_shapes();
    }

    override dispose() {
        this.#unsubscribe_from_shapes();
        this.#shapes.dispose();
        super.dispose();
    }

    hasBoundingBox(): boolean {
        return false;
    }

    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void {

        this.update();

        if (this.zzz.elem) {
            // It's already defined.
        }
        else {
            this.zzz.elem = svg.createElement('g', { id: this.id });
            domElement.appendChild(this.zzz.elem);
            this.zzz.disposables.push(this.matrix.change$.subscribe(() => {
                this.zzz.elem.setAttribute('transform', transform_value_of_matrix(this.matrix));
            }));

            // opacity
            this.zzz.disposables.push(this.zzz.opacity$.subscribe((opacity) => {
                const change: SVGAttributes = { opacity: `${opacity}` };
                if (opacity === 1) {
                    svg.removeAttributes(this.zzz.elem, change);
                }
                else {
                    svg.setAttributes(this.zzz.elem, change);
                }
                return function () {
                    // No cleanup to be done.
                };
            }));

            // visibility
            this.zzz.disposables.push(this.zzz.visibility$.subscribe((visibility) => {
                switch (visibility) {
                    case 'visible': {
                        const change: SVGAttributes = { visibility };
                        svg.removeAttributes(this.zzz.elem, change);
                        break;
                    }
                    default: {
                        const change: SVGAttributes = { visibility };
                        svg.setAttributes(this.zzz.elem, change);
                        break;
                    }
                }
                return function () {
                    // No cleanup to be done.
                };
            }));
        }

        // _Update styles for the <g>
        const flagMatrix = this.matrix.manual || this.zzz.flags[Flag.Matrix];
        const dom_context: DomContext = {
            domElement: domElement,
            elem: this.zzz.elem
        };

        if (flagMatrix) {
            this.zzz.elem.setAttribute('transform', transform_value_of_matrix(this.matrix));
        }

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            const elem = this.zzz.elem;
            child.render(elem, svgElement);
        }

        if (this.zzz.flags[Flag.ClassName]) {
            this.zzz.elem.setAttribute('class', this.classList.join(' '));
        }

        if (this.zzz.flags[Flag.Additions]) {
            this.additions.forEach((shape) => {
                const childNode = shape.zzz.elem;
                if (!childNode) {
                    return;
                }
                const tag = childNode.nodeName;
                if (!tag || /(radial|linear)gradient/i.test(tag) || shape.zzz.clip) {
                    return;
                }
                dom_context.elem.appendChild(childNode);
            });
        }

        if (this.zzz.flags[Flag.Subtractions]) {
            this.subtractions.forEach((shape) => {
                const childNode = shape.zzz.elem;
                if (!childNode || childNode.parentNode != dom_context.elem) {
                    return;
                }
                const tag = childNode.nodeName;
                if (!tag) {
                    return;
                }
                // Defer subtractions while clipping.
                if (shape.zzz.clip) {
                    return;
                }
                dispose(shape.zzz.disposables);
                dom_context.elem.removeChild(childNode);
            });
        }

        if (this.zzz.flags[Flag.Order]) {
            this.children.forEach((child) => {
                dom_context.elem.appendChild(child.zzz.elem);
            });
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

            if (this.zzz.flags[Flag.ClipPath]) {
                if (this.clipPath) {
                    this.clipPath.render(domElement, svgElement);
                    this.zzz.elem.setAttribute('clip-path', 'url(#' + this.clipPath.id + ')');
                }
                else {
                    this.zzz.elem.removeAttribute('clip-path');
                }
            }

            this.flagReset();
        }
    }

    #subscribe_to_shapes(): void {
        this.#shapes_insert = this.#shapes.insert$.subscribe((inserts: Shape[]) => {
            for (const shape of inserts) {
                update_shape_group(shape, this);
            }
        });

        this.#shapes_remove = this.#shapes.remove$.subscribe((removes: Shape[]) => {
            for (const shape of removes) {
                update_shape_group(shape, null);
            }
        });

        this.#shapes_order = this.#shapes.order$.subscribe(() => {
            this.zzz.flags[Flag.Order] = true;
        });
    }

    #unsubscribe_from_shapes(): void {
        if (this.#shapes_insert) {
            this.#shapes_insert.dispose();
            this.#shapes_insert = null;
        }
        if (this.#shapes_remove) {
            this.#shapes_remove.dispose();
            this.#shapes_remove = null;
        }
        if (this.#shapes_order) {
            this.#shapes_order.dispose();
            this.#shapes_order = null;
        }
    }

    /**
     * Orient the children of the group to the upper left-hand corner of that group.
     */
    corner(): this {
        const bbox = this.getBoundingBox(true);

        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
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
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
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
                    found = search(node.children.getAt(i));
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
                    const child = node.children.getAt(i);
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
                    const child = node.children.getAt(i);
                    search(child);
                }
            }
            return found;
        }
        return search(this);
    }

    add(...shapes: Shape[]) {
        for (let i = 0; i < shapes.length; i++) {
            const child = shapes[i];
            if (!(child && child.id)) {
                continue;
            }
            const index = this.children.indexOf(child);
            if (index >= 0) {
                this.children.splice(index, 1);
            }
            this.children.push(child);
        }
        return this;
    }

    remove(...shapes: Shape[]) {
        for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i];
            shape.dispose();
            const index = this.children.indexOf(shape);
            if (index >= 0) {
                this.children.splice(index, 1);
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

            const child = this.children.getAt(i);

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

    /**
     * Apply `noFill` method to all child shapes.
     */
    noFill() {
        this.children.forEach(function (child) {
            child.noFill();
        });
        return this;
    }

    /**
     * Apply `noStroke` method to all child shapes.
     */
    noStroke() {
        this.children.forEach(function (child) {
            child.noStroke();
        });
        return this;
    }

    /**
     * Apply `subdivide` method to all child shapes.
     */
    subdivide(limit: number) {
        this.children.forEach(function (child) {
            child.subdivide(limit);
        });
        return this;
    }

    update(): this {
        if (this.zzz.flags[Flag.Beginning] || this.zzz.flags[Flag.Ending]) {

            const beginning = Math.min(this.beginning, this.ending);
            const ending = Math.max(this.beginning, this.ending);
            const length = this.length;
            let sum = 0;

            const bd = beginning * length;
            const ed = ending * length;

            for (let i = 0; i < this.children.length; i++) {
                const child = this.children.getAt(i);
                const l = child.length;

                if (bd > sum + l) {
                    child.beginning = 1;
                    child.ending = 1;
                }
                else if (ed < sum) {
                    child.beginning = 0;
                    child.ending = 0;
                }
                else if (bd > sum && bd < sum + l) {
                    child.beginning = (bd - sum) / l;
                    child.ending = 1;
                }
                else if (ed > sum && ed < sum + l) {
                    child.beginning = 0;
                    child.ending = (ed - sum) / l;
                }
                else {
                    child.beginning = 0;
                    child.ending = 1;
                }
                sum += l;
            }
        }
        return super.update();
    }

    override flagReset(dirtyFlag = false) {
        if (this.zzz.flags[Flag.Additions]) {
            this.additions.length = 0;
            this.zzz.flags[Flag.Additions] = dirtyFlag;
        }

        if (this.zzz.flags[Flag.Subtractions]) {
            this.subtractions.length = 0;
            this.zzz.flags[Flag.Subtractions] = false;
        }

        this.zzz.flags[Flag.Order] = dirtyFlag;
        this.zzz.flags[Flag.ClipPath] = dirtyFlag;

        this.zzz.flags[Flag.Beginning] = dirtyFlag;
        this.zzz.flags[Flag.Ending] = dirtyFlag;

        super.flagReset(dirtyFlag);

        return this;

    }
    get automatic(): boolean {
        return this.#automatic;
    }
    set automatic(automatic: boolean) {
        this.#automatic = automatic;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.automatic = automatic;
        }
    }
    get beginning(): number {
        return this.#beginning;
    }
    set beginning(beginning: number) {
        if (typeof beginning === 'number') {
            if (this.beginning !== beginning) {
                this.#beginning = beginning;
                this.zzz.flags[Flag.Beginning] = true;
            }
        }
    }
    get cap(): 'butt' | 'round' | 'square' {
        return this.#cap;
    }
    set cap(cap: 'butt' | 'round' | 'square') {
        this.#cap = cap;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.cap = cap;
        }
    }
    /**
     * A list of all the children in the scenegraph.
     */
    get children(): Children<Shape> {
        return this.#shapes;
    }
    set children(children) {

        this.#unsubscribe_from_shapes();
        this.#shapes.dispose();

        this.#shapes = children;
        this.#subscribe_to_shapes();

        for (let i = 0; i < children.length; i++) {
            const shape = children.getAt(i);
            update_shape_group(shape, this);
        }
    }
    get closed(): boolean {
        return this.#closed;
    }
    set closed(v: boolean) {
        this.#closed = v;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.closed = v;
        }
    }
    get curved(): boolean {
        return this.#curved;
    }
    set curved(v: boolean) {
        this.#curved = v;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.curved = v;
        }
    }
    get ending(): number {
        return this.#ending;
    }
    set ending(ending: number) {
        if (typeof ending === 'number') {
            if (this.ending !== ending) {
                this.#ending = ending;
                this.zzz.flags[Flag.Ending] = true;
            }
        }
    }
    get fill(): Color {
        throw new Error();
    }
    set fill(fill: Color) {
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.fill = fill;
        }
    }
    get join(): 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round' {
        return this.#join;
    }
    set join(v: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round') {
        this.#join = v;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.join = v;
        }
    }
    get length(): number {
        if (this.zzz.flags[Flag.Length] || this.#length <= 0) {
            this.#length = 0;
            if (!this.children) {
                return this.#length;
            }
            for (let i = 0; i < this.children.length; i++) {
                const child = this.children.getAt(i);
                this.#length += child.length;
            }
        }
        return this.#length;
    }
    get strokeWidth(): number {
        return this.#strokeWidth;
    }
    set strokeWidth(strokeWidth: number) {
        this.#strokeWidth = strokeWidth;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.strokeWidth = strokeWidth;
        }
    }
    get miter(): number {
        return this.#miter;
    }
    set miter(v: number) {
        this.#miter = v;
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.miter = v;
        }
    }
    get stroke(): Color {
        throw new Error();
    }
    set stroke(stroke: Color) {
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children.getAt(i);
            child.stroke = stroke;
        }
    }
}

export function update_shape_group(child: Shape, parent?: Group) {

    const previous_parent = child.parent;

    if (previous_parent === parent) {
        add();
        return;
    }

    if (previous_parent && previous_parent instanceof Group && previous_parent.children.ids[child.id]) {
        const index = Array.prototype.indexOf.call(previous_parent.children, child);
        previous_parent.children.splice(index, 1);
        splice();
    }

    if (parent) {
        add();
        return;
    }

    splice();

    if (previous_parent && previous_parent instanceof Group) {
        if (previous_parent.zzz.flags[Flag.Additions] && previous_parent.additions.length === 0) {
            previous_parent.zzz.flags[Flag.Additions] = false;
        }
        if (previous_parent.zzz.flags[Flag.Subtractions] && previous_parent.subtractions.length === 0) {
            previous_parent.zzz.flags[Flag.Subtractions] = false;
        }
    }

    delete child.parent;

    function add() {

        if (parent.subtractions.length > 0) {
            const index = Array.prototype.indexOf.call(parent.subtractions, child);
            if (index >= 0) {
                parent.subtractions.splice(index, 1);
            }
        }

        if (parent.additions.length > 0) {
            const index = Array.prototype.indexOf.call(parent.additions, child);
            if (index >= 0) {
                parent.additions.splice(index, 1);
            }
        }

        child.parent = parent;
        parent.additions.push(child);
        parent.zzz.flags[Flag.Additions] = true;
    }

    function splice() {

        if (previous_parent && previous_parent instanceof Group) {
            const indexAdd = previous_parent.additions.indexOf(child);
            if (indexAdd >= 0) {
                previous_parent.additions.splice(indexAdd, 1);
            }

            const indexSub = previous_parent.subtractions.indexOf(child);
            if (indexSub < 0) {
                previous_parent.subtractions.push(child);
                previous_parent.zzz.flags[Flag.Subtractions] = true;
            }
        }
    }
}

function shape_attributes(attributes: Partial<GroupAttributes>): Partial<ShapeAttributes> {
    const retval: Partial<ShapeAttributes> = {
        id: attributes.id
    };
    return retval;
}
