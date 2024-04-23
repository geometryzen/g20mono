import { Matrix } from "../matrix";

/**
 * @see https://frederic-wang.fr/decomposition-of-2d-transform-matrices.html
 * @see https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
 * @param matrix 
 * @returns 
 */
export function decompose_2d_3x3_matrix_wang(matrix: Matrix) {

    const a = matrix.a11;
    const c = matrix.a12;
    const x = matrix.a13;

    const b = matrix.a21;
    const d = matrix.a22;
    const y = matrix.a23;

    const Δ = a * d - c * b;

    const result: {
        position: { x: number, y: number },
        rotation: number,
        scale: [scaleX: number, scaleY: number],
        skew: [skewX: number, skewY: number]
    } = {
        position: { x, y },
        rotation: 0,
        scale: [0, 0],
        skew: [0, 0],
    };

    // Apply the QR-like decomposition.
    if (a !== 0 || b !== 0) {
        const r = Math.sqrt(a * a + b * b);
        result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
        result.scale = [r, Δ / r];
        result.skew = [Math.atan((a * c + b * d) / (r * r)), 0];
    }
    else if (c !== 0 || d !== 0) {
        const s = Math.sqrt(c * c + d * d);
        result.rotation = Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
        result.scale = [Δ / s, s];
        result.skew = [0, Math.atan((a * c + b * d) / (s * s))];
    }
    else {
        // a = b = c = d = 0
    }

    return result;
}
