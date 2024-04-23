import { G20 } from './G20';
import { Vector } from './Vector';

const sqrt = Math.sqrt;

/**
 * Sets this multivector to a rotor representing a rotation from a to b.
 * R = (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
 * Returns undefined (void 0) if the vectors are anti-parallel.
 * 
 * @param a The 'from' vector. 
 * @param b The 'to' vector.
 * @param m The output multivector.
 */
export function rotorFromDirections(a: Readonly<Vector>, b: Readonly<Vector>, m: G20): void {
    const ax = a.x;
    const ay = a.y;
    const bx = b.x;
    const by = b.y;
    const aa = ax * ax + ay * ay;
    const absA = sqrt(aa);
    const bb = bx * bx + by * by;
    const absB = sqrt(bb);
    const BA = absB * absA;
    const dotBA = ax * bx + ay * by;
    const denom = sqrt(2 * (bb * aa + BA * dotBA));
    if (denom !== 0) {
        const B = ay * bx - ax * by;
        m.set(0, 0, (BA + dotBA) / denom, B / denom);
    }
    else {
        // The denominator is zero when |a||b| + a << b = 0.
        // If θ is the angle between a and b, then  cos(θ) = (a << b) /|a||b| = -1
        // Then a and b are anti-parallel.
        // The plane of the rotation is ambiguous.
    }
}
