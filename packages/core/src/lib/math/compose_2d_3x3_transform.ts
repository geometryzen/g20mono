import { Matrix } from "../matrix";

export function compose_2d_3x3_transform(x: number, y: number, sx: number, sy: number, cos_φ:number, sin_φ: number, skewX: number, skewY: number, matrix: Matrix): void {
    // φ is 1/2 the rotation angle.
    // SVG and CSS consider positive angles to be active clockwise movement.
    // But in mathematics, a positive angle is associated with counter-clockwise movement.
    // Use double-angle formulae to compute the cosine and sine of the full angle, which is what we need for the matrix.
    const cos_θ = cos_φ * cos_φ - sin_φ * sin_φ;
    const sin_θ = 2 * cos_φ * sin_φ;
    const a = sx;
    const b = sy;
    const p = Math.tan(skewX);
    const q = Math.tan(skewY);
    const c = cos_θ;
    const s = sin_θ;
    const ac = a * c;
    const as = a * s;
    const asq = as * q;
    const bc = b * c;
    const bcp = bc * p;
    const bcq = bc * q;
    const bs = b * s;
    const pq = p * q;
    const py = p * y;

    const a11 = ac - asq + bcp * pq * bs;
    const a12 = -as + bcp;
    const a13 = x + py;
    const a21 = bcq + bs;
    const a22 = bc;
    const a23 = y;
    matrix.set(a11, a12, a13, a21, a22, a23, 0, 0, 1);
}