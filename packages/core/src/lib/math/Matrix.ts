import { signal, State } from "@g20/reactive";

const cos = Math.cos;
const sin = Math.sin;
const tan = Math.tan;

type ELEMENTS = [a11: number, a12: number, a13: number, a21: number, a22: number, a23: number, a31: number, a32: number, a33: number];

function equalsValue(P: ELEMENTS, Q: ELEMENTS): boolean {
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
    /**
     * Contains the value that is currently stored in the signal (in the zeroth index of this array).
     * This backing store exists because 1) the signal implementation we are using does not support
     * mutation, and 2) we (may) want this multivector to also be observable with events that only happen on
     * changes, and 3) we want to avoid taxing the Garbage Collector.
     */
    readonly #signalValue: [ELEMENTS, ELEMENTS] = [[1, 0, 0, 0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 0, 0, 1]];

    /**
     * 1st row is [0,1,2], 2nd row is [3,4,5], 3rd row is [6,7,8]
     * The underlying data that makes this multivector into a signal.
     * The get method fo this signal MUST be called when accessing the coordinates (a, x, y, and b),
     * and MUST NOT be called when mutating this multivector.
     */
    readonly #signal: State<ELEMENTS> = signal(this.#signalValue[0], { equals: equalsValue });

    // readonly #change = variable(this);
    // readonly change$ = this.#change.asObservable();

    constructor(a11 = 1, a12 = 0, a13 = 0, a21 = 0, a22 = 1, a23 = 0, a31 = 0, a32 = 0, a33 = 1) {
        this.set(a11, a12, a13, a21, a22, a23, a31, a32, a33);
    }
    get a(): number {
        return this.#signal.get()[0];   // a11
    }
    get b(): number {
        return this.#signal.get()[3];   // a21
    }
    get c(): number {
        return this.#signal.get()[1];   // a12
    }
    get d(): number {
        return this.#signal.get()[4];   // a22
    }
    get e(): number {
        return this.#signal.get()[2];   // a13
    }
    get f(): number {
        return this.#signal.get()[5];   // a23
    }
    get a11(): number {
        return this.#signal.get()[0];
    }
    get a12(): number {
        return this.#signal.get()[1];
    }
    get a13(): number {
        return this.#signal.get()[2];
    }
    get a21(): number {
        return this.#signal.get()[3];
    }
    get a22(): number {
        return this.#signal.get()[4];
    }
    get a23(): number {
        return this.#signal.get()[5];
    }
    get a31(): number {
        return this.#signal.get()[6];
    }
    get a32(): number {
        return this.#signal.get()[7];
    }
    get a33(): number {
        return this.#signal.get()[8];
    }
    toString(): string {
        return JSON.stringify([[this.a11, this.a12, this.a13], [this.a21, this.a22, this.a23], [this.a31, this.a32, this.a33]]);
    }

    set(a11: number, a12: number, a13: number, a21: number, a22: number, a23: number, a31: number, a32: number, a33: number): this {
        const olds: ELEMENTS = this.#signalValue[0];
        const news: ELEMENTS = this.#signalValue[1];
        news[0] = a11;
        news[1] = a12;
        news[2] = a13;
        news[3] = a21;
        news[4] = a22;
        news[5] = a23;
        news[6] = a31;
        news[7] = a32;
        news[8] = a33;
        if (equalsValue(news, olds)) {
            // Do nothing
        }
        else {
            this.#signalValue[0] = news;
            this.#signalValue[1] = olds;
            this.#signal.set(news);
            // this.#change.set(this);
        }
        return this;
    }

    /**
     * Copy the matrix of one to the current instance.
     */
    copy(m: Matrix): this {
        return this.set(m.a11, m.a12, m.a13, m.a21, m.a22, m.a23, m.a31, m.a32, m.a33);
    }

    /**
     * Sets matrix to the identity, like resetting.
     */
    identity(): this {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    isOne(): boolean {
        return this.a11 === 1 && this.a12 === 0 && this.a13 == 0 &&
            this.a21 === 0 && this.a22 === 1 && this.a23 === 0 &&
            this.a31 === 0 && this.a32 === 0 && this.a33 === 1;
    }

    multiply(b11: number, b12: number, b13: number, b21: number, b22: number, b23: number, b31: number, b32: number, b33: number): this {

        const elements: ELEMENTS = this.#signalValue[0];

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
        const elements: ELEMENTS = this.#signalValue[0];
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

    scale(sx: number, sy: number): this {
        if (sx === 1 && sy === 1) {
            return this;
        }
        else {
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
            return this.multiply(c, -s, 0, s, c, 0, 0, 0, 1);
        }
    }

    translate(translation: { x: number, y: number }): this {
        if (translation.x === 0 && translation.y === 0) {
            return this;
        }
        else {
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
            return this.multiply(1, 0, 0, a, 1, 0, 0, 0, 1);
        }

    }
}

export function inverse(m: Matrix, out: Matrix): Matrix | null {

    // Changing notation here because it makes the Laplacian
    // development of determinants by minors manifest.
    const a1 = m.a11;
    const b1 = m.a12;
    const c1 = m.a13;
    const a2 = m.a21;
    const b2 = m.a22;
    const c2 = m.a23;
    const a3 = m.a31;
    const b3 = m.a32;
    const c3 = m.a33;

    const b01 = c3 * b2 - c2 * b3;
    const b11 = -c3 * a2 + c2 * a3;
    const b21 = b3 * a2 - b2 * a3;

    /**
     * Determinant.
     */
    const D = a1 * b01 + b1 * b11 + c1 * b21;

    if (!D) {
        return null;
    }

    const c11 = b01 / D;
    const c12 = (-c3 * b1 + c1 * b3) / D;
    const c13 = (c2 * b1 - c1 * b2) / D;
    const c21 = b11 / D;
    const c22 = (c3 * a1 - c1 * a3) / D;
    const c23 = (-c2 * a1 + c1 * a2) / D;
    const c31 = b21 / D;
    const c32 = (-b3 * a1 + b1 * a3) / D;
    const c33 = (b2 * a1 - b1 * a2) / D;
    out.set(c11, c12, c13, c21, c22, c23, c31, c32, c33);
    return out;
}

