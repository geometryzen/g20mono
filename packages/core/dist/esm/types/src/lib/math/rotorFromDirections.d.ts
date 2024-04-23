import { G20 } from './G20';
import { Vector } from './Vector';
/**
 * Sets this multivector to a rotor representing a rotation from a to b.
 * R = (|b||a| + b * a) / sqrt(2 * |b||a|(|b||a| + b << a))
 * Returns undefined (void 0) if the vectors are anti-parallel.
 *
 * @param a The 'from' vector.
 * @param b The 'to' vector.
 * @param m The output multivector.
 */
export declare function rotorFromDirections(a: Readonly<Vector>, b: Readonly<Vector>, m: G20): void;
