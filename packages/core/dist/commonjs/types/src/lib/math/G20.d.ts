import { Bivector } from './Bivector';
import { Scalar } from './Scalar';
import { Spinor } from './Spinor';
import { Vector } from './Vector';
/**
 * A multivector for two dimensions with a Euclidean metric.
 */
export declare class G20 {
    #private;
    readonly change$: import("../..").Observable<this>;
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
