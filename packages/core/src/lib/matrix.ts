import { State, state } from 'g2o-reactive';

const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;

type ELEMENTS = [a11: number, a12: number, a13: number, a21: number, a22: number, a23: number, a31: number, a32: number, a33: number];

function equals(P: ELEMENTS, Q: ELEMENTS): boolean {
    return P[0] === Q[0] &&
        P[1] === Q[1] &&
        P[2] === Q[2] &&
        P[3] === Q[3] &&
        P[4] === Q[4] &&
        P[5] === Q[5] &&
        P[6] === Q[6] &&
        P[7] === Q[7] &&
        P[8] === Q[8];
}

/**
 * 1st row is [a11,a12,a13], 2nd row is [a21,a22,a23], 3rd row is [a31,a32,a33]
 */
export class Matrix {
    // Keep two arrays and flip-flop between them so that...
    // 1. We don't tax the garbage collector.
    // 2. The signal library can compare old and new values.
    readonly #elements1: ELEMENTS = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    readonly #elements2: ELEMENTS = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    /**
     * 1st row is [0,1,2], 2nd row is [3,4,5], 3rd row is [6,7,8]
     */
    readonly #elements: State<ELEMENTS> = state(this.#elements1, { equals });

    constructor(a11 = 1, a12 = 0, a13 = 0, a21 = 0, a22 = 1, a23 = 0, a31 = 0, a32 = 0, a33 = 1) {
        this.set(a11, a12, a13, a21, a22, a23, a31, a32, a33);
    }
    get a(): number {
        return this.#elements.get()[0];
    }
    get b(): number {
        return this.#elements.get()[3];
    }
    get c(): number {
        return this.#elements.get()[1];
    }
    get d(): number {
        return this.#elements.get()[4];
    }
    get e(): number {
        return this.#elements.get()[2];
    }
    get f(): number {
        return this.#elements.get()[5];
    }
    get a11(): number {
        return this.#elements.get()[0];
    }
    get a12(): number {
        return this.#elements.get()[1];
    }
    get a13(): number {
        return this.#elements.get()[2];
    }
    get a21(): number {
        return this.#elements.get()[3];
    }
    get a22(): number {
        return this.#elements.get()[4];
    }
    get a23(): number {
        return this.#elements.get()[5];
    }
    get a31(): number {
        return this.#elements.get()[6];
    }
    get a32(): number {
        return this.#elements.get()[7];
    }
    get a33(): number {
        return this.#elements.get()[8];
    }

    #newElements(olds: ELEMENTS): ELEMENTS {
        if (olds === this.#elements1) {
            return this.#elements2;
        }
        else if (olds === this.#elements2) {
            return this.#elements1;
        }
        else {
            throw new Error();
        }
    }

    set(a11: number, a12: number, a13: number, a21: number, a22: number, a23: number, a31: number, a32: number, a33: number): this {
        const olds = this.#elements.get();
        const news = this.#newElements(olds);
        news[0] = a11;
        news[1] = a12;
        news[2] = a13;
        news[3] = a21;
        news[4] = a22;
        news[5] = a23;
        news[6] = a31;
        news[7] = a32;
        news[8] = a33;
        this.#elements.set(news);
        return this;
    }

    /**
     * Copy the matrix of one to the current instance.
     */
    copy(m: Matrix): this {
        const s = m.#elements.get();
        return this.set(s[0], s[1], s[2], s[3], s[4], s[5], s[6], s[7], s[8]);
    }

    /**
     * Sets matrix to the identity, like resetting.
     */
    identity(): this {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    multiply(b11: number, b12: number, b13: number, b21: number, b22: number, b23: number, b31: number, b32: number, b33: number): this {

        const elements = this.#elements.get();

        const a11 = elements[0];
        const a12 = elements[1];
        const a13 = elements[2];
        const a21 = elements[3];
        const a22 = elements[4];
        const a23 = elements[5];
        const a31 = elements[6];
        const a32 = elements[7];
        const a33 = elements[8];

        const c11 = a11 * b11 + a12 * b21 + a13 * b31;
        const c12 = a11 * b12 + a12 * b22 + a13 * b32;
        const c13 = a11 * b13 + a12 * b23 + a13 * b33;

        const c21 = a21 * b11 + a22 * b21 + a23 * b31;
        const c22 = a21 * b12 + a22 * b22 + a23 * b32;
        const c23 = a21 * b13 + a22 * b23 + a23 * b33;

        const c31 = a31 * b11 + a32 * b21 + a33 * b31;
        const c32 = a31 * b12 + a32 * b22 + a33 * b32;
        const c33 = a31 * b13 + a32 * b23 + a33 * b33;

        return this.set(c11, c12, c13, c21, c22, c23, c31, c32, c33);
    }

    multiply_vector(x: number = 0, y: number = 0, z: number = 1): [number, number, number] {

        const x1 = this.a11 * x + this.a12 * y + this.a13 * z;
        const x2 = this.a21 * x + this.a22 * y + this.a23 * z;
        const x3 = this.a31 * x + this.a32 * y + this.a33 * z;

        return [x1, x2, x3];
    }

    multiply_by_scalar(s: number): this {
        const elements = this.#elements.get();
        const a11 = elements[0] * s;
        const a12 = elements[1] * s;
        const a13 = elements[2] * s;
        const a21 = elements[3] * s;
        const a22 = elements[4] * s;
        const a23 = elements[5] * s;
        const a31 = elements[6] * s;
        const a32 = elements[7] * s;
        const a33 = elements[8] * s;
        return this.set(a11, a12, a13, a21, a22, a23, a31, a32, a33);
    }

    /**
     * @param out The optional matrix to apply the inversion to.
     * Return an inverted version of the matrix. If no optional one is passed a new matrix is created and returned.
     */
    inverse(out?: Matrix): Matrix {

        const a = this.#elements.get();
        out = out || new Matrix();

        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];

        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
            return null;
        }

        det = 1.0 / det;

        const c11 = b01 * det;
        const c12 = (-a22 * a01 + a02 * a21) * det;
        const c13 = (a12 * a01 - a02 * a11) * det;
        const c21 = b11 * det;
        const c22 = (a22 * a00 - a02 * a20) * det;
        const c23 = (-a12 * a00 + a02 * a10) * det;
        const c31 = b21 * det;
        const c32 = (-a21 * a00 + a01 * a20) * det;
        const c33 = (a11 * a00 - a01 * a10) * det;
        out.set(c11, c12, c13, c21, c22, c23, c31, c32, c33);

        return out;
    }

    scale(sx: number, sy: number): this {
        if (sx === 1 && sy === 1) {
            return this;
        }
        else {
            // console.lg("Matrix.scale", "sx", sx, "sy", sy);
            return this.multiply(sx, 0, 0, 0, sy, 0, 0, 0, 1);
        }
    }

    /**
     * @param angle The rotation angle in radians.
     * @returns 
     */
    rotate(angle: number): this {
        const c = cos(angle);
        const s = sin(angle);
        if (c === 1 && s === 0) {
            return this;
        }
        else {
            // console.lg("Matrix.rotate", "angle", angle, "cos", c, "sin", s);
            return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);
        }
    }

    translate(translation: { x: number, y: number }): this {
        if (translation.x === 0 && translation.y === 0) {
            return this;
        }
        else {
            // console.lg("Matrix.translate", translation.x, translation.y);
            return this.multiply(1, 0, translation.x, 0, 1, translation.y, 0, 0, 1);
        }
    }

    /**
     * Skew the matrix by an angle in the x axis direction.
     * 
     * @param skewX The skew angle in radians.
     */
    skewX(skewX: number): this {
        if (skewX === 0) {
            return this;
        }
        else {
            const a = tan(skewX);
            // console.lg("Matrix.skewX", "angle", angle, "a", a);
            return this.multiply(1, a, 0, 0, 1, 0, 0, 0, 1);
        }
    }

    /**
     * Skew the matrix by an angle in the y axis direction.
     * 
     * @param skewY The skew angle in radians.
     */
    skewY(skewY: number): this {
        if (skewY === 0) {
            return this;
        }
        else {
            const a = tan(skewY);
            // console.lg("Matrix.skewY", "angle", angle, "a", a);
            return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);
        }

    }
}
// TODO
/*
export function multiply(A: Matrix, B, C) {

    if (B.length <= 3) { // Multiply G20

        const e = A;
        let x, y, z;

        const a = B[0] || 0,
            b = B[1] || 0,
            c = B[2] || 0;

        // Go down rows first
        // a, d, g, b, e, h, c, f, i

        x = e[0] * a + e[1] * b + e[2] * c;
        y = e[3] * a + e[4] * b + e[5] * c;
        z = e[6] * a + e[7] * b + e[8] * c;

        return [x, y, z];

    }

    const A0 = A[0], A1 = A[1], A2 = A[2];
    const A3 = A[3], A4 = A[4], A5 = A[5];
    const A6 = A[6], A7 = A[7], A8 = A[8];

    const B0 = B[0], B1 = B[1], B2 = B[2];
    const B3 = B[3], B4 = B[4], B5 = B[5];
    const B6 = B[6], B7 = B[7], B8 = B[8];

    C = C || new Array<number>(9);

    C[0] = A0 * B0 + A1 * B3 + A2 * B6;
    C[1] = A0 * B1 + A1 * B4 + A2 * B7;
    C[2] = A0 * B2 + A1 * B5 + A2 * B8;
    C[3] = A3 * B0 + A4 * B3 + A5 * B6;
    C[4] = A3 * B1 + A4 * B4 + A5 * B7;
    C[5] = A3 * B2 + A4 * B5 + A5 * B8;
    C[6] = A6 * B0 + A7 * B3 + A8 * B6;
    C[7] = A6 * B1 + A7 * B4 + A8 * B7;
    C[8] = A6 * B2 + A7 * B5 + A8 * B8;

    return C;

}
*/