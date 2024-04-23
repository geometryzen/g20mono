export declare const TWO_PI: number;
export declare const HALF_PI: number;
/**
 * @param {Number} a - Start value.
 * @param {Number} b - End value.
 * @param {Number} t - Zero-to-one value describing percentage between a and b.
 * @returns {Number}
 * @description Linear interpolation between two values `a` and `b` by an amount `t`.
 */
export declare function lerp(a: number, b: number, t: number): number;
export declare function getPoT(value: number): number;
export declare function mod(v: number, l: number): number;
export declare const NumArray: Float32ArrayConstructor | ArrayConstructor;
/**
 * @param {Number} v - Any float
 * @returns {Number} That float trimmed to the third decimal place.
 * @description A pretty fast toFixed(3) alternative.
 * @see {@link http://jsperf.com/parsefloat-tofixed-vs-math-round/18}
 */
export declare function toFixed(v: number): number;
