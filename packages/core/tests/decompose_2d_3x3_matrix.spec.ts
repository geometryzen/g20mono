import { G20, Matrix } from "../src/index";
import { compose_2d_3x3_transform } from '../src/lib/math/compose_2d_3x3_transform';
import { decompose_2d_3x3_matrix } from "../src/lib/math/decompose_2d_3x3_matrix";
import { decompose_2d_3x3_matrix_wang } from "../src/lib/math/decompose_2d_3x3_matrix_wang";
import { MatrixDecomposition } from "../src/lib/math/MatrixDecomposition";

describe("decompose_2d_3x3_matrix", function () {
    it("compose by matrix multiplication", function () {
        const x = 3;
        const y = 4;
        const sx = Math.PI / 6;
        const sy = Math.PI / 6;
        const angle = Math.PI / 6;
        const skewX = 0;
        const skewY = 0;
        const m = new Matrix();
        m
            .identity()
            .translate({ x, y })
            .scale(sx, sy)
            .rotate(angle)
            .skewX(skewX)
            .skewY(skewY);

        expect(m.a11).toBe(0.4534498453140259);
        expect(m.a12).toBe(-0.2617993950843811);
        expect(m.a13).toBe(3);
        expect(m.a21).toBe(0.2617993950843811);
        expect(m.a22).toBe(0.4534498453140259);
        expect(m.a23).toBe(4);
        expect(m.a31).toBe(0);
        expect(m.a32).toBe(0);
        expect(m.a33).toBe(1);
    });
    it("compose_2d_3x3_transform", function () {
        // const φ = θ / 2;
        const x = 3;
        const y = 4;
        const sx = Math.PI / 6;
        const sy = Math.PI / 6;
        const θ = Math.PI / 6;
        const attitude = G20.zero.clone().rotorFromAngle(θ);
        const skewX = 0;
        const skewY = 0;
        const m = new Matrix();

        compose_2d_3x3_transform(x, y, sx, sy, attitude.a, -attitude.b, skewX, skewY, m);

        expect(m.a11).toBe(0.4534498453140259);
        expect(m.a12).toBe(-0.2617993950843811);
        expect(m.a13).toBe(3);
        expect(m.a21).toBe(0.2617993950843811);
        expect(m.a22).toBe(0.4534498453140259);
        expect(m.a23).toBe(4);
        expect(m.a31).toBe(0);
        expect(m.a32).toBe(0);
        expect(m.a33).toBe(1);
    });
    it("decompose_2d_3x3_matrix", function () {
        const x = 3;
        const y = 4;
        const sx = Math.PI / 6;
        const sy = Math.PI / 6;
        const θ = Math.PI / 6;
        const attitude = G20.zero.clone().rotorFromAngle(θ);
        const skewX = 0;
        const skewY = 0;
        const m = new Matrix();

        compose_2d_3x3_transform(x, y, sx, sy, attitude.a, -attitude.b, skewX, skewY, m);

        const decomposition: MatrixDecomposition = decompose_2d_3x3_matrix(m);

        const numDigits = 6;

        expect(decomposition.translateX).toBe(x);
        expect(decomposition.translateY).toBe(y);
        expect(decomposition.scaleX).toBeCloseTo(sx, numDigits);
        expect(decomposition.scaleY).toBeCloseTo(sy, numDigits);
        expect(decomposition.rotation).toBeCloseTo(θ, numDigits);
        // No values for skewX, skewY.
    });
    it("decompose_2d_3x3_matrix_wang", function () {
        const x = 3;
        const y = 4;
        const sx = Math.PI / 6;
        const sy = Math.PI / 6;
        const θ = Math.PI / 6;
        const attitude = G20.zero.clone().rotorFromAngle(θ);
        const skewX = 0;
        const skewY = 0;
        const m = new Matrix();

        compose_2d_3x3_transform(x, y, sx, sy, attitude.a, -attitude.b, skewX, skewY, m);

        const decomposition = decompose_2d_3x3_matrix_wang(m);

        const numDigits = 6;

        expect(decomposition.position.x).toBe(x);
        expect(decomposition.position.y).toBe(y);
        expect(decomposition.scale[0]).toBeCloseTo(sx, numDigits);
        expect(decomposition.scale[1]).toBeCloseTo(sy, numDigits);
        expect(decomposition.rotation).toBeCloseTo(θ, numDigits);
        expect(decomposition.skew[0]).toBeCloseTo(0, numDigits);
        expect(decomposition.skew[1]).toBeCloseTo(0, numDigits);
    });
});
