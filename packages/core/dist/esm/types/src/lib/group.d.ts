import { Children } from './children';
import { Color } from './effects/ColorProvider';
import { IBoard } from './IBoard';
import { IShape } from './IShape';
import { Parent, Shape } from './Shape';
export interface IGroup extends Parent {
    remove(...shapes: Shape[]): void;
}
export interface GroupAttributes {
    id: string;
}
export declare class Group extends Shape {
    #private;
    /**
     * An automatically updated list of shapes that need to be appended to the renderer's scenegraph.
     */
    readonly additions: Shape[];
    /**
     * An automatically updated list of children that need to be removed from the renderer's scenegraph.
     */
    readonly subtractions: Shape[];
    constructor(board: IBoard, shapes?: Shape[], attributes?: Partial<GroupAttributes>);
    dispose(): void;
    hasBoundingBox(): boolean;
    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
    /**
     * Orient the children of the group to the upper left-hand corner of that group.
     */
    corner(): this;
    /**
     * Orient the children of the group to the center of that group.
     */
    center(): this;
    getById(id: string): IShape<unknown>;
    getByClassName(className: string): IShape<unknown>[];
    getByType(type: any): IShape<unknown>[];
    add(...shapes: Shape[]): this;
    remove(...shapes: Shape[]): this;
    getBoundingBox(shallow?: boolean): {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    /**
     * Apply `noFill` method to all child shapes.
     */
    noFill(): this;
    /**
     * Apply `noStroke` method to all child shapes.
     */
    noStroke(): this;
    /**
     * Apply `subdivide` method to all child shapes.
     */
    subdivide(limit: number): this;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get automatic(): boolean;
    set automatic(automatic: boolean);
    get beginning(): number;
    set beginning(beginning: number);
    get cap(): 'butt' | 'round' | 'square';
    set cap(cap: 'butt' | 'round' | 'square');
    /**
     * A list of all the children in the scenegraph.
     */
    get children(): Children<Shape>;
    set children(children: Children<Shape>);
    get closed(): boolean;
    set closed(v: boolean);
    get curved(): boolean;
    set curved(v: boolean);
    get ending(): number;
    set ending(ending: number);
    get fill(): Color;
    set fill(fill: Color);
    get join(): 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    set join(v: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round');
    get length(): number;
    get strokeWidth(): number;
    set strokeWidth(strokeWidth: number);
    get miter(): number;
    set miter(v: number);
    get stroke(): Color;
    set stroke(stroke: Color);
}
export declare function update_shape_group(child: Shape, parent?: Group): void;
