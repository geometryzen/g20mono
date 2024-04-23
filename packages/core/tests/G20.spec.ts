import { G20 } from "../src/index";

describe("G20", function () {
    it("constructor", function () {
        const a = Math.random();
        const x = Math.random();
        const y = Math.random();
        const b = Math.random();
        const mv = new G20(x, y, a, b);
        expect(mv.a).toBe(a);
        expect(mv.x).toBe(x);
        expect(mv.y).toBe(y);
        expect(mv.b).toBe(b);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("constructor should default to zero", function () {
        const mv = new G20();
        expect(mv.a).toBe(0);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(0);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("set properties", function () {
        const a = Math.random();
        const x = Math.random();
        const y = Math.random();
        const b = Math.random();
        const mv = new G20();
        mv.a = a;
        mv.x = x;
        mv.y = y;
        mv.b = b;
        expect(mv.a).toBe(a);
        expect(mv.x).toBe(x);
        expect(mv.y).toBe(y);
        expect(mv.b).toBe(b);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("bivector", function () {
        const b = Math.random();
        const mv = G20.bivector(b);
        expect(mv.a).toBe(0);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(b);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("scalar", function () {
        const a = Math.random();
        const mv = G20.scalar(a);
        expect(mv.a).toBe(a);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(0);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("spinor", function () {
        const a = Math.random();
        const b = Math.random();
        const mv = G20.spinor(a, b);
        expect(mv.a).toBe(a);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(b);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("vector", function () {
        const x = Math.random();
        const y = Math.random();
        const mv = G20.vector(x, y);
        expect(mv.a).toBe(0);
        expect(mv.x).toBe(x);
        expect(mv.y).toBe(y);
        expect(mv.b).toBe(0);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("locking", function () {
        const a = Math.random();
        const x = Math.random();
        const y = Math.random();
        const b = Math.random();
        const mv = new G20(x, y, a, b);
        const token = mv.lock();
        expect(mv.isLocked()).toBe(true);
        expect(mv.isMutable()).toBe(false);
        expect(mv.a).toBe(a);
        expect(mv.x).toBe(x);
        expect(mv.y).toBe(y);
        expect(mv.b).toBe(b);
        const X = mv.unlock(token);
        expect(X === mv).toBe(true);
        expect(mv.a).toBe(a);
        expect(mv.x).toBe(x);
        expect(mv.y).toBe(y);
        expect(mv.b).toBe(b);
        expect(mv.isLocked()).toBe(false);
        expect(mv.isMutable()).toBe(true);
    });
    it("double lock should throw already locked", function () {
        const a = Math.random();
        const x = Math.random();
        const y = Math.random();
        const b = Math.random();
        const mv = new G20(x, y, a, b);
        mv.lock();
        expect(() => {
            mv.lock();
        }).toThrow(new Error("already locked"));
    });
    it("unlock not locked should throw not locked", function () {
        const a = Math.random();
        const x = Math.random();
        const y = Math.random();
        const b = Math.random();
        const mv = new G20(x, y, a, b);
        expect(() => {
            mv.unlock(Math.random());
        }).toThrow(new Error("not locked"));
    });
    it("unlock wrong token should throw unlock denied", function () {
        const a = Math.random();
        const x = Math.random();
        const y = Math.random();
        const b = Math.random();
        const mv = new G20(x, y, a, b);
        const token = mv.lock();
        expect(() => {
            mv.unlock(1 - token);
        }).toThrow(new Error("unlock denied"));
    });
    it("static one", function () {
        const mv = G20.one;
        expect(mv.a).toBe(1);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(0);
        expect(mv.isLocked()).toBe(true);
        expect(mv.isMutable()).toBe(false);
    });
    it("static zero", function () {
        const mv = G20.zero;
        expect(mv.a).toBe(0);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(0);
        expect(mv.isLocked()).toBe(true);
        expect(mv.isMutable()).toBe(false);
    });
    it("static ex", function () {
        const mv = G20.ex;
        expect(mv.a).toBe(0);
        expect(mv.x).toBe(1);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(0);
        expect(mv.isLocked()).toBe(true);
        expect(mv.isMutable()).toBe(false);
    });
    it("static ey", function () {
        const mv = G20.ey;
        expect(mv.a).toBe(0);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(1);
        expect(mv.b).toBe(0);
        expect(mv.isLocked()).toBe(true);
        expect(mv.isMutable()).toBe(false);
    });
    it("static I", function () {
        const mv = G20.I;
        expect(mv.a).toBe(0);
        expect(mv.x).toBe(0);
        expect(mv.y).toBe(0);
        expect(mv.b).toBe(1);
        expect(mv.isLocked()).toBe(true);
        expect(mv.isMutable()).toBe(false);
    });
    it("quaditude", function () {
        const mv = new G20(0, 0, 0, 0);
        expect(mv.quaditude()).toBe(0);
    });
});
