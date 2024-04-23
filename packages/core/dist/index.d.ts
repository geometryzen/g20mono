import { BehaviorSubject } from 'rxjs';

interface Bivector {
    b: number;
}

interface Scalar {
    /**
     * The scalar coordinate as a number.
     */
    a: number;
}

interface Spinor extends Scalar, Bivector {
}

interface Vector {
    x: number;
    y: number;
}

/**
 * A multivector for two dimensions with a Euclidean metric.
 */
declare class G20 {
    #private;
    readonly change$: Observable<this>;
    constructor(x?: number, y?: number, a?: number, b?: number);
    static scalar(a: number): G20;
    static bivector(b: number): G20;
    static spinor(a: number, b: number): G20;
    static vector(x: number, y: number): G20;
    /**
     * Determines whether this multivector is locked.
     * If the multivector is in the unlocked state then it is mutable.
     * If the multivector is in the locked state then it is immutable.
     */
    isLocked(): boolean;
    isMutable(): boolean;
    /**
     * Locks this multivector (preventing any further mutation),
     * and returns a token that may be used to unlock it.
     */
    lock(): number;
    /**
     * Unlocks this multivector (allowing mutation),
     * using a token that was obtained from a preceding lock method call.
     */
    unlock(token: number): this;
    get a(): number;
    set a(a: number);
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get b(): number;
    set b(b: number);
    static readonly one: G20;
    static readonly zero: G20;
    static readonly ex: G20;
    static readonly ey: G20;
    static readonly I: G20;
    static add(v1: Readonly<G20>, v2: Readonly<G20>): G20;
    static copy(mv: Readonly<G20>): G20;
    static fromBivector(B: Readonly<Bivector>): G20;
    static fromScalar(alpha: Readonly<Scalar>): G20;
    static fromSpinor(R: Readonly<Spinor>): G20;
    static fromVector(v: Readonly<Vector>): G20;
    static rotorFromDirections(a: Vector, b: Vector): G20;
    static rotorFromVectorToVector(a: Vector, b: Vector): G20;
    static sub(v1: G20, v2: G20): G20;
    static subtract(v1: G20, v2: G20): G20;
    static ratioBetween(v1: Readonly<G20>, v2: Readonly<G20>): number;
    static angleBetween(v1: Readonly<Vector>, v2: Readonly<Vector>): number;
    static distanceBetween(v1: Readonly<Vector>, v2: Readonly<Vector>): number;
    static distanceBetweenSquared(v1: Readonly<Vector>, v2: Readonly<Vector>): number;
    /**
     *
     */
    add2(a: Readonly<G20>, b: Readonly<G20>): G20;
    addPseudo(β: number): G20;
    /**
     * Adds a multiple of a scalar to this multivector.
     * @param a The scalar value to be added to this multivector.
     * @param α The fraction of (a * uom) to be added. Default is 1.
     * @returns this + (a * uom) * α
     */
    addScalar(a: number, α?: number): G20;
    conj(): G20;
    /**
     * A convenience function for set(mv.x, mv.y, mv.a, mv.b).
     * Requires `this` multivector to be mutable.
     */
    copy(mv: Readonly<G20>): this;
    /**
     * A convenience function for set(0, 0, spinor.a, spinor.b).
     * Requires `this` multivector to be mutable.
     */
    copySpinor(spinor: Readonly<Spinor>): this;
    /**
     * A convenience function for set(vector.x, vector.y, 0, 0).
     * Requires `this` multivector to be mutable.
     */
    copyVector(vector: Readonly<Vector>): this;
    /**
     * A convenience function for set(0, 0, 0, 0).
     * Requires `this` multivector to be mutable.
     */
    clear(): this;
    clone(): G20;
    /**
     * @param rhs The multivector dividend.
     * @returns this / m;
     */
    div(rhs: G20): G20;
    /**
     * @param m
     * @returns this ^ m
     */
    ext(m: G20): G20;
    /**
     * Computes the right inverse of this multivector.
     * inv(X) satisfies X * inv(X) = 1.
     * @returns inverse(this)
     */
    inv(): G20;
    lco(rhs: G20): G20;
    add(rhs: G20): G20;
    sub(rhs: G20): G20;
    /**
     * @param rhs
     * @returns this * m
     */
    mul(rhs: G20): G20;
    neg(): G20;
    dot(v: G20): number;
    exp(): G20;
    magnitude(): number;
    quaditude(): number;
    normalize(): G20;
    distanceTo(v: G20): number;
    distanceToSquared(v: G20): number;
    rco(m: G20): G20;
    /**
     * If `this` is mutable, then sets `this` multivector to its reflection in the plane orthogonal to vector n. The result is mutable.
     * If `this` is immutable (locked), a copy of `this` is made, which is then reflected. The result is immutable (locked).
     *
     * i.e. The result is mutable (unlocked) iff `this` is mutable (unlocked).
     *
     * Mathematically,
     *
     * this ⟼ - n * this * n
     *
     * Geometrically,
     *
     * Reflects this multivector in the plane orthogonal to the unit vector, n.
     * This implementation does assume that n is a vector, but does not assume that it is normalized to unity.
     *
     * If n is not a unit vector then the result is scaled by n squared.
     * The scalar component gets an extra minus sign. The pseudoscalar component does not change sign.
     * The units of measure are carried through but in most cases n SHOULD be dimensionless.
     *
     * @param n The unit vector that defines the reflection plane.
     */
    reflect(n: Readonly<Vector>): G20;
    /**
     * <p>
     * Computes a rotor, R, from two unit vectors, where
     * R = (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
     * </p>
     *
     * The result is independent of the magnitudes of a and b.
     *
     * @param a The starting vector
     * @param b The ending vector
     * @returns The rotor representing a rotation from a to b.
     */
    rotorFromDirections(a: Readonly<Vector>, b: Readonly<Vector>): G20;
    /**
     * Sets this multivector to a rotor that rotates through angle θ in the oriented plane defined by I.
     *
     * @param θ The rotation angle in radians when the rotor is applied on both sides as R * M * ~R
     */
    rotorFromAngle(θ: number): G20;
    /**
     * R = sqrt(|b|/|a|) * (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
     *
     * The result is depends  on the magnitudes of a and b.
     */
    rotorFromVectorToVector(a: Readonly<Vector>, b: Readonly<Vector>): G20;
    scale(α: number): G20;
    /**
     * @param m
     * @returns this | m
     */
    scp(m: G20): G20;
    /**
     * Sets the coordinates of `this` multivector.
     * Requires `this` multivector to be mutable.
     * @param x The coordinate along the x-axis.
     * @param y The coordinate along the y-axis.
     * @param a The scalar coordinate.
     * @param b The bivector coordinate.
     */
    set(x: number, y: number, a?: number, b?: number): this;
    equals(v: G20, eps?: number): boolean;
    lerp(v: G20, t: number): G20;
    /**
     * Determines whether this multivector is exactly 0 (zero).
     */
    isZero(eps?: number): boolean;
    toString(): string;
    /**
     * reverse has a ++-- structure on the grades.
     * The scalar component, a, will not change.
     * The vector components, x and y, will not change.
     * The bivector component, b, will change sign.
     */
    rev(): G20;
    rotate(radians: number): G20;
    /**
     * Subtracts a multiple of a scalar from this multivector.
     * @param a The scalar value to be subtracted from this multivector.
     * @param α The fraction of (a * uom) to be subtracted. Default is 1.
     * @returns this - (a * uom) * α
     */
    subScalar(a: number, α?: number): G20;
    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * Sets this Geometric2 to the geometric product a * b of the vector arguments.
     */
    versor(a: Vector, b: Vector): G20;
    /**
     *
     */
    __div__(rhs: G20 | number): G20;
    /**
     *
     */
    __rdiv__(lhs: number | G20): G20;
    /**
     *
     */
    __vbar__(rhs: number | G20): G20;
    /**
     *
     */
    __rvbar__(lhs: number | G20): G20;
    /**
     *
     */
    __wedge__(rhs: number | G20): G20;
    /**
     *
     */
    __rwedge__(lhs: number | G20): G20;
    /**
     *
     */
    __lshift__(rhs: number | G20): G20;
    /**
     *
     */
    __rlshift__(lhs: number | G20): G20;
    /**
     *
     */
    __rshift__(rhs: number | G20): G20;
    /**
     *
     */
    __rrshift__(lhs: number | G20): G20;
    /**
     *
     */
    __bang__(): G20;
    /**
     *
     */
    __eq__(rhs: G20 | number): boolean;
    /**
     *
     */
    __ne__(rhs: G20 | number): boolean;
    /**
     *
     */
    __tilde__(): G20;
    /**
     *
     */
    __add__(rhs: G20 | number): G20;
    /**
     *
     */
    __radd__(lhs: G20 | number): G20;
    /**
     *
     */
    __sub__(rhs: G20 | number): G20;
    /**
     *
     */
    __rsub__(lhs: G20 | number): G20;
    /**
     *
     */
    __pos__(): G20;
    /**
     *
     */
    __neg__(): G20;
    /**
     *
     */
    __mul__(rhs: G20 | number): G20;
    /**
     *
     */
    __rmul__(lhs: G20 | number): G20;
}

/**
 * An object should be Disposable if its lifetime is bounded by the holder.
 * Such objects are normally created by the holding object.
 */
interface Disposable {
    dispose(): void;
}
/**
 * Calls `dispose()` on each element of `disposables`, traversing the array in reverse order.
 * When all dispose() calls have been made, the length of the disposables is set to zero.
 */
declare function dispose<T extends Disposable>(disposables: T[]): void;

interface Observable<T> {
    subscribe(callback: (value: T) => void): Disposable;
}

declare class Anchor {
    #private;
    /**
     * default is zero.
     */
    readonly origin: G20;
    readonly controls: {
        a: G20;
        b: G20;
    };
    readonly change$: Observable<this>;
    /**
     * @param origin
     * @param ax The x position of the left handle point.
     * @param ay The y position of the left handle point.
     * @param bx The x position of the right handle point.
     * @param by The y position of the right handle point.
     * @param command The command to describe how to render. Applicable commands are {@link Commands}
     */
    constructor(origin: G20, command?: 'M' | 'L' | 'C' | 'A' | 'Z', ax?: number, ay?: number, bx?: number, by?: number);
    dispose(): void;
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get t(): number;
    set t(t: number);
    copy(v: Anchor): this;
    /**
     * Invoked when the path is automatic (not manual).
     */
    ignore(): void;
    /**
     * Invoked when the path is manual (not automatic).
     */
    listen(): void;
    /**
     * default is 'M'.
     */
    get command(): 'M' | 'L' | 'C' | 'A' | 'Z';
    set command(command: 'M' | 'L' | 'C' | 'A' | 'Z');
    /**
     * default is true.
     */
    get relative(): boolean;
    set relative(relative: boolean);
    /**
     * default is zero.
     */
    get rx(): number;
    set rx(rx: number);
    /**
     * default is zero.
     */
    get ry(): number;
    set ry(ry: number);
    /**
     * default is zero.
     */
    get xAxisRotation(): number;
    set xAxisRotation(xAxisRotation: number);
    /**
     * default is zero.
     */
    get largeArcFlag(): number;
    set largeArcFlag(largeArcFlag: number);
    /**
     * default is one.
     */
    get sweepFlag(): number;
    set sweepFlag(sweepFlag: number);
}

/**
 * TODO: If this was iterable then there would be less need for the length and getAt.
 */
declare class Collection<T> {
    #private;
    readonly insert$: Observable<T[]>;
    readonly remove$: Observable<T[]>;
    readonly order$: Observable<void>;
    constructor(items: T[]);
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: unknown): void;
    get length(): number;
    getAt(index: number): T;
    get(): T[];
    ping(): void;
    pop(): T;
    shift(): T;
    push(...items: T[]): number;
    unshift(...items: T[]): number;
    splice(start: number, deleteCount?: number, ...more: T[]): T[];
    sort(compareFn: (a: T, b: T) => number): this;
    reverse(): this;
    indexOf(searchElement: T, fromIndex?: number): number;
    map<X>(callbackfn: (value: T, index: number, array: T[]) => X, thisArg?: any): X[];
}

interface Child {
    readonly id: string;
}
/**
 * A children collection which is accesible both by index and by object `id`.
 */
declare class Children<T extends Child> extends Collection<T> {
    #private;
    readonly ids: {
        [id: string]: T;
    };
    constructor(children: T[]);
    dispose(): void;
}

interface ColorProvider {
    readonly id: string;
    readonly change$: Observable<unknown>;
    render(svgElement: SVGElement): this;
}
type Color = string | ColorProvider;

interface IBoard {
    getBoundingBox(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    /**
     * When the coordinate system (CSS or SVG) is such that a counter-clockwise rotation of 90 degrees moves the y-axis
     * into alignment with the x-axis, the coordinate system is said to be "goofy". In mathematics, a counter-clockwise
     * rotation of 90 degrees moves the x-axis into alignment with the y-axis.
     */
    get goofy(): boolean;
    width: number;
    height: number;
}

/**
 * TODO: rename to Shape when the hierarchy has been flattened.
 */
interface IShape<P> extends Child {
    automatic: boolean;
    beginning: number;
    cap: 'butt' | 'round' | 'square';
    classList: string[];
    closed: boolean;
    curved: boolean;
    ending: number;
    fill: Color;
    join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    length: number;
    strokeWidth: number;
    miter: number;
    parent: P;
    position: G20;
    stroke: Color;
    visibility: 'visible' | 'hidden' | 'collapse';
    getBoundingBox(shallow?: boolean): {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    hasBoundingBox(): boolean;
    noFill(): this;
    noStroke(): this;
    subdivide(limit: number): this;
}

type Equals<T> = (a: T, b: T) => boolean;
interface Readable<T> {
    get(): T;
}
interface Writable<T> {
    set(newValue: T): void;
}
interface State<T> extends Readable<T>, Writable<T> {
}

interface VariableAttributes<T> {
    equals?: Equals<T>;
}
declare class Variable<T> implements State<T> {
    #private;
    constructor(bs: BehaviorSubject<T>, attributes?: VariableAttributes<T>);
    get(): T;
    set(newValue: T): void;
    asObservable(): Observable<T>;
}
declare function variable<T>(initialValue: T, attributes?: VariableAttributes<T>): Variable<T>;

type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';
interface TextAttributes {
    anchor: 'start' | 'middle' | 'end';
    baseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    decoration: TextDecoration[];
    direction: 'ltr' | 'rtl';
    dx: number | string;
    dy: number | string;
    fontFamily: string;
    fill: Color;
    id: string;
    strokeWidth: number;
    opacity: number;
    position: PositionLike;
    fontSize: number;
    stroke: Color;
    fontStyle: 'normal' | 'italic' | 'oblique';
    value: string;
    visibility: 'visible' | 'hidden' | 'collapse';
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
}
interface TextProperties {
    anchor: 'start' | 'middle' | 'end';
    baseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    decoration: TextDecoration[];
    direction: 'ltr' | 'rtl';
    dx: number | string;
    dy: number | string;
    fontFamily: string;
    fill: Color;
    id: string;
    strokeWidth: number;
    opacity: number;
    fontSize: number;
    stroke: Color;
    fontStyle: 'normal' | 'italic' | 'oblique';
    value: string;
    visibility: 'visible' | 'hidden' | 'collapse';
    fontWeight: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
}
declare class Text extends Shape implements TextProperties {
    #private;
    automatic: boolean;
    beginning: number;
    cap: 'butt' | 'round' | 'square';
    closed: boolean;
    curved: boolean;
    ending: number;
    join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    length: number;
    miter: number;
    readonly fontFamily$: Observable<string>;
    readonly fontSize$: Observable<number>;
    constructor(board: IBoard, value: string, attributes?: Partial<TextAttributes>);
    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
    static Measure(text: Text): {
        width: number;
        height: number;
    };
    /**
     * Convenience method to set fill to `none`.
     */
    noFill(): this;
    /**
     * Convenience method to set stroke to `none`.
     */
    noStroke(): this;
    getBoundingBox(shallow?: boolean): {
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    hasBoundingBox(): boolean;
    subdivide(limit: number): this;
    flagReset(dirtyFlag?: boolean): this;
    get anchor(): 'start' | 'middle' | 'end';
    set anchor(anchor: 'start' | 'middle' | 'end');
    get baseline(): 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';
    set baseline(baseline: 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top');
    get dashes(): number[];
    set dashes(v: number[]);
    get decoration(): TextDecoration[];
    set decoration(v: TextDecoration[]);
    get direction(): 'ltr' | 'rtl';
    set direction(direction: 'ltr' | 'rtl');
    get dx(): number | string;
    set dx(dx: number | string);
    get dy(): number | string;
    set dy(dy: number | string);
    get fontFamily(): string;
    set fontFamily(family: string);
    get fill(): Color;
    set fill(fill: Color);
    get strokeWidth(): number;
    set strokeWidth(strokeWidth: number);
    get fontSize(): number;
    set fontSize(size: number);
    get stroke(): Color;
    set stroke(stroke: Color);
    get fontStyle(): 'normal' | 'italic' | 'oblique';
    set fontStyle(fontStyle: 'normal' | 'italic' | 'oblique');
    get value(): string;
    set value(value: string);
    get fontWeight(): number | "normal" | "bold" | "bolder" | "lighter";
    set fontWeight(fontWeight: number | "normal" | "bold" | "bolder" | "lighter");
}

/**
 * Information that is shared between the model and the view.
 */
declare class ZZZ implements Disposable {
    #private;
    /**
     *
     */
    readonly disposables: Disposable[];
    readonly flags: {
        [flag: number]: boolean;
    };
    appended?: boolean;
    anchor$?: Observable<'start' | 'middle' | 'end'>;
    baseline$?: Observable<'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top'>;
    readonly clip$: Observable<boolean>;
    clipPath?: SVGClipPathElement;
    context?: {
        ctx?: CanvasRenderingContext2D;
    };
    decoration$?: Observable<TextDecoration[]>;
    direction$?: Observable<'ltr' | 'rtl'>;
    dx$?: Observable<number | string>;
    dy$?: Observable<number | string>;
    /**
     * Used by the CanvasRenderer.
     */
    effect?: CanvasPattern;
    /**
     * The element corresponding to some Shape and used by the SVG renderer. It will share the same identifier.
     */
    elem?: HTMLElement | SVGElement;
    fill$?: Observable<Color>;
    fillOpacity$?: Observable<number>;
    fontStyle$?: Observable<'normal' | 'italic' | 'oblique'>;
    fontWeight$?: Observable<'normal' | 'bold' | 'bolder' | 'lighter' | number>;
    /**
     * DGH: Something strange in use.
     */
    hasFillEffect?: boolean;
    /**
     * DGH: Something strange in use.
     */
    hasStrokeEffect?: boolean;
    height$?: Observable<number>;
    image?: SVGImageElement;
    offset?: G20;
    opacity$?: Observable<number>;
    radius$?: Observable<number>;
    scale?: G20;
    spreadMethod$: Observable<'pad' | 'reflect' | 'repeat'>;
    stroke$?: Observable<Color>;
    strokeOpacity$?: Observable<number>;
    strokeWidth$?: Observable<number>;
    textContent$?: Observable<string>;
    units$?: Observable<'userSpaceOnUse' | 'objectBoundingBox'>;
    vertices?: Anchor[];
    vertices_subject?: Variable<number>;
    vertices$?: Observable<number>;
    visibility$?: Observable<'visible' | 'hidden' | 'collapse'>;
    width$?: Observable<number>;
    dispose(): void;
    get clip(): boolean;
    set clip(clip: boolean);
}

/**
 * The foundational object for the scenegraph.
 */
declare abstract class ElementBase<P> implements Child, Disposable {
    #private;
    /**
     *
     */
    parent: P;
    /**
     *
     */
    readonly zzz: ZZZ;
    classList: string[];
    constructor(id: string);
    dispose(): void;
    flagReset(dirtyFlag?: boolean): this;
    get id(): string;
    get className(): string;
    set className(className: string);
}

/**
 * 1st row is [a11,a12,a13], 2nd row is [a21,a22,a23], 3rd row is [a31,a32,a33]
 */
declare class Matrix {
    #private;
    readonly change$: Observable<this>;
    /**
     * Determines whether we automatically calculate the values for the matrix or if the developer intends to manage the matrix.
     */
    manual: boolean;
    constructor(a11?: number, a12?: number, a13?: number, a21?: number, a22?: number, a23?: number, a31?: number, a32?: number, a33?: number);
    get a(): number;
    get b(): number;
    get c(): number;
    get d(): number;
    get e(): number;
    get f(): number;
    get a11(): number;
    get a12(): number;
    get a13(): number;
    get a21(): number;
    get a22(): number;
    get a23(): number;
    get a31(): number;
    get a32(): number;
    get a33(): number;
    set(a11: number, a12: number, a13: number, a21: number, a22: number, a23: number, a31: number, a32: number, a33: number): this;
    set_from_matrix(m: Matrix): this;
    /**
     * Copy the matrix of one to the current instance.
     */
    copy(m: Matrix): this;
    /**
     * Sets matrix to the identity, like resetting.
     */
    identity(): this;
    multiply(b11: number, b12: number, b13: number, b21: number, b22: number, b23: number, b31: number, b32: number, b33: number): this;
    multiply_vector(x?: number, y?: number, z?: number): [number, number, number];
    multiply_by_scalar(s: number): this;
    /**
     * @param out The optional matrix to apply the inversion to.
     * Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
     */
    inverse(out?: Matrix): Matrix;
    scale(sx: number, sy: number): this;
    /**
     * @param angle The rotation angle in radians.
     * @returns
     */
    rotate(angle: number): this;
    translate(translation: {
        x: number;
        y: number;
    }): this;
    /**
     * Skew the matrix by an angle in the x axis direction.
     *
     * @param skewX The skew angle in radians.
     */
    skewX(skewX: number): this;
    /**
     * Skew the matrix by an angle in the y axis direction.
     *
     * @param skewY The skew angle in radians.
     */
    skewY(skewY: number): this;
    silence(): this;
    touch(): this;
}

type PositionLike = Anchor | G20 | Shape | [x: number, y: number];
declare function position_from_like(like: PositionLike): G20 | null;
interface Parent {
    update?(): void;
}
interface ShapeAttributes {
    id: string;
    opacity: number;
    position: PositionLike;
    attitude: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
    compensate: boolean;
}
interface ShapeProperties {
    id: string;
    opacity: number;
    /**
     * alias for the position property.
     */
    X: G20;
    position: G20;
    /**
     * alias for the attitude property.
     */
    R: G20;
    attitude: G20;
    visibility: 'visible' | 'hidden' | 'collapse';
}
declare abstract class Shape extends ElementBase<unknown> implements IShape<unknown>, ShapeProperties {
    #private;
    readonly board: IBoard;
    abstract automatic: boolean;
    abstract beginning: number;
    abstract cap: 'butt' | 'round' | 'square';
    abstract closed: boolean;
    abstract curved: boolean;
    abstract ending: number;
    abstract fill: Color;
    abstract join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    abstract length: number;
    abstract strokeWidth: number;
    abstract miter: number;
    abstract stroke: Color;
    abstract getBoundingBox(shallow?: boolean): {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    abstract hasBoundingBox(): boolean;
    abstract noFill(): this;
    abstract noStroke(): this;
    abstract subdivide(limit: number): this;
    abstract render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
    constructor(board: IBoard, attributes?: Partial<ShapeAttributes>);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    useAttitude(attitude: G20): void;
    usePosition(position: G20): void;
    get X(): G20;
    set X(pos: G20);
    get position(): G20;
    set position(position: G20);
    get R(): G20;
    set R(attitude: G20);
    get attitude(): G20;
    set attitude(attitude: G20);
    get scale(): number;
    set scale(scale: number);
    get scaleXY(): G20;
    set scaleXY(scale: G20);
    get skewX(): number;
    set skewX(skewX: number);
    get skewY(): number;
    set skewY(skewY: number);
    get clipPath(): Shape | null;
    set clipPath(clipPath: Shape | null);
    get matrix(): Matrix;
    set matrix(matrix: Matrix);
    get opacity(): number;
    set opacity(opacity: number);
    get visibility(): 'visible' | 'hidden' | 'collapse';
    set visibility(visible: 'visible' | 'hidden' | 'collapse');
    show(): this;
    hide(): this;
    collapse(): this;
    get worldMatrix(): Matrix;
    set worldMatrix(worldMatrix: Matrix);
}

interface GroupAttributes {
    id: string;
}
declare class Group extends Shape {
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

interface PathAttributes {
    attitude: G20;
    id: string;
    opacity: number;
    position: PositionLike;
    visibility: 'visible' | 'hidden' | 'collapse';
    /**
     * The value of what the path should be filled in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    fill: Color;
    fillOpacity: number;
    /**
     * The value of what the path should be outlined in with.
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value} for more information on CSS's colors as `String`.
     */
    stroke: Color;
    strokeWidth: number;
    strokeOpacity: number;
}
declare class Path extends Shape implements PathAttributes {
    #private;
    /**
     * @param vertices A list of {@link Anchor}s that represent the order and coordinates to construct the rendered shape.
     * @param closed Describes whether the path is closed or open.
     * @param curved Describes whether the path automatically calculates bezier handles for each vertex.
     * @param manual Describes whether the developer controls how vertices are plotted.
     */
    constructor(board: IBoard, vertices?: Anchor[], closed?: boolean, curved?: boolean, manual?: boolean, attributes?: Partial<PathAttributes>);
    render(domElement: HTMLElement | SVGElement, svgElement: SVGElement): void;
    /**
     * A convenience method for setting the `fill` attribute to "none".
     */
    noFill(): this;
    /**
     * A convenience method for setting the `stroke` attribute to "none".
     */
    noStroke(): this;
    corner(): this;
    center(): this;
    getBoundingBox(shallow?: boolean): {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    hasBoundingBox(): boolean;
    /**
     * TODO: Bad name. This function is called for its side effects which are to modify the Anchor.
     * Originally the function appears to promote a Vector and return an Anchor, but this is not used
     * and the call always involves an Anchor.
     * There is a return value but it is not being used.
     * @param t Percentage value describing where on the {@link Path} to estimate and assign coordinate values.
     * @param anchor - Object to apply calculated x, y to. If none available returns new `Object`.
     * @description Given a float `t` from 0 to 1, return a point or assign a passed `obj`'s coordinates to that percentage on this {@link Path}'s curve.
     */
    getPointAt(t: number, anchor: Anchor): Anchor;
    /**
     * Based on closed / curved and sorting of vertices plot where all points should be and where the respective handles should be too.
     */
    plot(): this;
    /**
     * Insert an anchor at the midpoint between every vertex.
     * @param limit - How many times to recurse subdivisions.
     */
    subdivide(limit: number): this;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get automatic(): boolean;
    set automatic(automatic: boolean);
    get beginning(): number;
    set beginning(beginning: number);
    /**
     * Defines the shape to be used at the end of open subpaths when they are stroked.
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
     */
    get cap(): 'butt' | 'round' | 'square';
    set cap(cap: 'butt' | 'round' | 'square');
    get closed(): boolean;
    set closed(closed: boolean);
    get curved(): boolean;
    set curved(curved: boolean);
    get dashes(): number[];
    set dashes(dashes: number[]);
    get ending(): number;
    set ending(ending: number);
    get fill(): Color;
    set fill(fill: Color);
    get fillOpacity(): number;
    set fillOpacity(fillOpacity: number);
    get join(): 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
    set join(join: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round');
    get length(): number;
    get lengths(): number[];
    get strokeWidth(): number;
    set strokeWidth(stroeWidth: number);
    get miter(): number;
    set miter(miter: number);
    get stroke(): Color;
    set stroke(stroke: Color);
    get strokeOpacity(): number;
    set strokeOpacity(strokeOpacity: number);
    get vertices(): Collection<Anchor>;
    set vertices(vertices: Collection<Anchor>);
    get vectorEffect(): 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position';
    set vectorEffect(vectorEffect: 'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position');
}

interface View {
    /**
     *
     */
    domElement: HTMLCanvasElement | SVGElement;
    height?: number;
    size$: Observable<{
        width: number;
        height: number;
    }>;
    width?: number;
    render(): void;
    setSize(size: {
        width: number;
        height: number;
    }, ratio: number): void;
}

interface ViewFactory {
    /**
     *
     * @param viewBox The topmost group that contains the scene group.
     * @param containerId The HTML id property of the element that contains the view.
     */
    createView(viewBox: Group, containerId: string): View;
}

/**
 * @param {Number} [x=0] - The x position of the arc segment.
 * @param {Number} [y=0] - The y position of the arc segment.
 * @param {Number} [innerRadius=0] - The inner radius value of the arc segment.
 * @param {Number} [outerRadius=0] - The outer radius value of the arc segment.
 * @param {Number} [startAngle=0] - The start angle of the arc segment in Number.
 * @param {Number} [endAngle=6.2831] - The end angle of the arc segment in Number.
 * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
 */
declare class ArcSegment extends Path {
    /**
     * @name ArcSegment#_flagStartAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#startAngle} needs updating.
     */
    _flagStartAngle: boolean;
    /**
     * @name ArcSegment#_flagEndAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#endAngle} needs updating.
     */
    _flagEndAngle: boolean;
    /**
     * @name ArcSegment#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#innerRadius} needs updating.
     */
    _flagInnerRadius: boolean;
    /**
     * @name ArcSegment#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#outerRadius} needs updating.
     */
    _flagOuterRadius: boolean;
    /**
     * @name ArcSegment#_startAngle
     * @private
     * @see {@link ArcSegment#startAngle}
     */
    _startAngle: number;
    /**
     * @name ArcSegment#_endAngle
     * @private
     * @see {@link ArcSegment#endAngle}
     */
    _endAngle: number;
    /**
     * @name ArcSegment#_innerRadius
     * @private
     * @see {@link ArcSegment#innerRadius}
     */
    _innerRadius: number;
    /**
     * @name ArcSegment#_outerRadius
     * @private
     * @see {@link ArcSegment#outerRadius}
     */
    _outerRadius: number;
    constructor(board: IBoard, x?: number, y?: number, ir?: number, or?: number, sa?: number, ea?: number, res?: number);
    static Properties: string[];
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get startAngle(): number;
    set startAngle(v: number);
    get endAngle(): number;
    set endAngle(v: number);
    get innerRadius(): number;
    set innerRadius(v: number);
    get outerRadius(): number;
    set outerRadius(v: number);
}

interface ArrowAttributes {
    id?: string;
    headLength?: number;
    position?: PositionLike;
    strokeOpacity?: number;
    strokeWidth?: number;
}
interface ArrowProperties {
    X: G20;
    position: G20;
    R: G20;
    attitude: G20;
    axis: G20;
    headLength: number;
    strokeOpacity: number;
    strokeWidth: number;
}
declare class Arrow extends Path implements ArrowProperties {
    #private;
    constructor(board: IBoard, axis: PositionLike, attributes?: ArrowAttributes);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get axis(): G20;
    set axis(axis: G20);
    get headLength(): number;
    set headLength(headLength: number);
    get origin(): G20;
    set origin(origin: G20);
}

interface CircleAPI<X> {
    position: X;
    attitude: G20;
    radius: number;
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}
interface CircleAttributes extends Partial<CircleAPI<PositionLike>> {
    position?: PositionLike;
    attitude?: G20;
    radius?: number;
    resolution?: number;
}
interface CircleProperties extends CircleAPI<G20> {
    position: G20;
    attitude: G20;
    radius: number;
}
declare class Circle extends Path implements CircleProperties {
    #private;
    constructor(board: IBoard, options?: CircleAttributes);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get radius(): number;
    set radius(radius: number);
}

interface EllipseAttributes {
    id: string;
    position: PositionLike;
    attitude: G20;
    rx: number;
    ry: number;
    resolution: number;
    visibility: 'visible' | 'hidden' | 'collapse';
}
declare class Ellipse extends Path {
    _flagWidth: boolean;
    _flagHeight: boolean;
    _width: number;
    _height: number;
    constructor(board: IBoard, options?: Partial<EllipseAttributes>);
    static Properties: string[];
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get height(): number;
    set height(v: number);
    get width(): number;
    set width(v: number);
}

interface LineAttributes {
    id?: string;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}
interface LineProperties {
    id?: string;
    stroke?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}
declare class Line extends Path implements LineProperties {
    constructor(board: IBoard, point1: PositionLike, point2: PositionLike, attributes?: LineAttributes);
    get point1(): Anchor;
    set point1(point1: Anchor);
    get point2(): Anchor;
    set point2(point2: Anchor);
}

interface PolygonAttributes {
    id: string;
    opacity: number;
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}
declare class Polygon extends Path implements PolygonAttributes {
    constructor(board: IBoard, points?: PositionLike[], attributes?: Partial<PolygonAttributes>);
}

interface RectangleAPI<X> {
    id: string;
    opacity: number;
    position: X;
    attitude: G20;
    width: number;
    height: number;
    visibility: 'visible' | 'hidden' | 'collapse';
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
}
interface RectangleAttributes extends Partial<RectangleAPI<PositionLike>> {
    id?: string;
    opacity?: number;
    position?: PositionLike;
    attitude?: G20;
    width?: number;
    height?: number;
    visibility?: 'visible' | 'hidden' | 'collapse';
}
interface RectangleProperties extends RectangleAPI<G20> {
    id: string;
    opacity: number;
    position: G20;
    attitude: G20;
    width: number;
    height: number;
    visibility: 'visible' | 'hidden' | 'collapse';
}
declare class Rectangle extends Path implements RectangleProperties, Disposable {
    #private;
    constructor(board: IBoard, attributes?: RectangleAttributes);
    dispose(): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get height(): number;
    set height(height: number);
    get origin(): G20;
    set origin(origin: G20);
    get width(): number;
    set width(width: number);
}

interface BoardAttributes {
    boundingBox?: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    resizeTo?: Element;
    scene?: Group;
    size?: {
        width: number;
        height: number;
    };
    viewFactory?: ViewFactory;
}
interface PointAttributes {
    id: string;
    visibility: 'visible' | 'hidden' | 'collapse';
}
declare class Board implements IBoard {
    #private;
    /**
     * The width of the instance's dom element.
     */
    width: number;
    /**
     * The height of the instance's dom element.
     */
    height: number;
    readonly size$: Observable<{
        width: number;
        height: number;
    }>;
    /**
     *
     */
    ratio: number | undefined;
    readonly frameCount$: Observable<number>;
    readonly goofy: boolean;
    constructor(elementOrId: string | HTMLElement, options?: BoardAttributes);
    dispose(): void;
    get scaleXY(): G20;
    get scene(): Group;
    appendTo(container: Element): this;
    getBoundingBox(): {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    /**
     * A number representing how much time has elapsed since the last frame in milliseconds.
     */
    getElapsedTime(fractionalDigits?: number): number | null;
    /**
     * Update positions and calculations in one pass before rendering.
     */
    update(): void;
    add(...shapes: Shape[]): this;
    remove(...shapes: Shape[]): this;
    circle(options?: CircleAttributes): Circle;
    ellipse(options?: Partial<EllipseAttributes>): Ellipse;
    line(point1: PositionLike, point2: PositionLike, attributes?: LineAttributes): Line;
    path(closed: boolean, ...points: Anchor[]): Path;
    point(position: PositionLike, attributes?: Partial<PointAttributes>): Shape;
    polygon(points?: PositionLike[], attributes?: Partial<PolygonAttributes>): Polygon;
    rectangle(attributes: RectangleAttributes): Rectangle;
    text(message: string, attributes?: Partial<TextAttributes>): Text;
    arrow(axis: PositionLike, attributes?: ArrowAttributes): Arrow;
    curve(closed: boolean, ...anchors: Anchor[]): Path;
    arc(x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, resolution?: number): ArcSegment;
    group(...shapes: Shape[]): Group;
}

interface SVGViewParams {
    domElement?: SVGElement;
}

declare class SVGViewFactory implements ViewFactory {
    readonly params?: SVGViewParams;
    constructor(params?: SVGViewParams);
    createView(viewBox: Group, containerId: string): View;
}

export { Anchor, ArcSegment, Arrow, type ArrowAttributes, type ArrowProperties, type Bivector, Board, type BoardAttributes, type Child, Children, Circle, type CircleAttributes, type CircleProperties, Collection, type Color, type ColorProvider, type Disposable, ElementBase, Ellipse, type EllipseAttributes, G20, Group, type GroupAttributes, type IBoard, type IShape, Line, type LineAttributes, type LineProperties, Matrix, type Observable, type Parent, Path, type PathAttributes, type PointAttributes, Polygon, type PolygonAttributes, type PositionLike, Rectangle, type RectangleAttributes, type RectangleProperties, SVGViewFactory, type SVGViewParams, type Scalar, Shape, type ShapeAttributes, type ShapeProperties, type Spinor, type State, Text, type TextAttributes, type TextDecoration, type TextProperties, Variable, type Vector, type View, type ViewFactory, ZZZ, dispose, position_from_like, variable };
