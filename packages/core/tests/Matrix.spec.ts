import { Matrix } from "../src/index";

/**
 * Number of digits when checking floating points are close to each other.
 */
const numDigits = 6;

describe("Matrix", function () {
    it("constructor", function () {
        const m = new Matrix();
        expect(m.a11).toBe(1);
        expect(m.a12).toBe(0);
        expect(m.a13).toBe(0);
        expect(m.a21).toBe(0);
        expect(m.a22).toBe(1);
        expect(m.a23).toBe(0);
        expect(m.a31).toBe(0);
        expect(m.a32).toBe(0);
        expect(m.a33).toBe(1);
    });
    it("set", function () {
        const a = Math.random();
        const b = Math.random();
        const c = Math.random();
        const d = Math.random();
        const e = Math.random();
        const f = Math.random();
        const g = Math.random();
        const h = Math.random();
        const i = Math.random();
        const m = new Matrix();
        m.set(a, b, c, d, e, f, g, h, i);
        expect(m.a11).toBeCloseTo(a, numDigits);
        expect(m.a12).toBeCloseTo(b, numDigits);
        expect(m.a13).toBeCloseTo(c, numDigits);
        expect(m.a21).toBeCloseTo(d, numDigits);
        expect(m.a22).toBeCloseTo(e, numDigits);
        expect(m.a23).toBeCloseTo(f, numDigits);
        expect(m.a31).toBeCloseTo(g, numDigits);
        expect(m.a32).toBeCloseTo(h, numDigits);
        expect(m.a33).toBeCloseTo(i, numDigits);
    });
    it("set_from_matrix", function () {
        const a = Math.random();
        const b = Math.random();
        const c = Math.random();
        const d = Math.random();
        const e = Math.random();
        const f = Math.random();
        const g = Math.random();
        const h = Math.random();
        const i = Math.random();
        const source = new Matrix();
        source.set(a, b, c, d, e, f, g, h, i);
        const m = new Matrix();
        m.set_from_matrix(source);
        expect(m.a11).toBeCloseTo(a, numDigits);
        expect(m.a12).toBeCloseTo(b, numDigits);
        expect(m.a13).toBeCloseTo(c, numDigits);
        expect(m.a21).toBeCloseTo(d, numDigits);
        expect(m.a22).toBeCloseTo(e, numDigits);
        expect(m.a23).toBeCloseTo(f, numDigits);
        expect(m.a31).toBeCloseTo(g, numDigits);
        expect(m.a32).toBeCloseTo(h, numDigits);
        expect(m.a33).toBeCloseTo(i, numDigits);
    });
    it("copy", function () {
        const a = Math.random();
        const b = Math.random();
        const c = Math.random();
        const d = Math.random();
        const e = Math.random();
        const f = Math.random();
        const g = Math.random();
        const h = Math.random();
        const i = Math.random();
        const source = new Matrix();
        source.set(a, b, c, d, e, f, g, h, i);
        const m = new Matrix();
        m.copy(source);
        expect(m.a11).toBeCloseTo(a, numDigits);
        expect(m.a12).toBeCloseTo(b, numDigits);
        expect(m.a13).toBeCloseTo(c, numDigits);
        expect(m.a21).toBeCloseTo(d, numDigits);
        expect(m.a22).toBeCloseTo(e, numDigits);
        expect(m.a23).toBeCloseTo(f, numDigits);
        expect(m.a31).toBeCloseTo(g, numDigits);
        expect(m.a32).toBeCloseTo(h, numDigits);
        expect(m.a33).toBeCloseTo(i, numDigits);
    });
    it("identity", function () {
        const a = Math.random();
        const b = Math.random();
        const c = Math.random();
        const d = Math.random();
        const e = Math.random();
        const f = Math.random();
        const g = Math.random();
        const h = Math.random();
        const i = Math.random();
        const m = new Matrix();
        m.set(a, b, c, d, e, f, g, h, i);
        m.identity();
        expect(m.a11).toBe(1);
        expect(m.a12).toBe(0);
        expect(m.a13).toBe(0);
        expect(m.a21).toBe(0);
        expect(m.a22).toBe(1);
        expect(m.a23).toBe(0);
        expect(m.a31).toBe(0);
        expect(m.a32).toBe(0);
        expect(m.a33).toBe(1);
    });
});
