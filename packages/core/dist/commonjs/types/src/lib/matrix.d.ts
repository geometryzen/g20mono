/**
 * 1st row is [a11,a12,a13], 2nd row is [a21,a22,a23], 3rd row is [a31,a32,a33]
 */
export declare class Matrix {
    #private;
    readonly change$: import("./reactive/Observable.js").Observable<this>;
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
