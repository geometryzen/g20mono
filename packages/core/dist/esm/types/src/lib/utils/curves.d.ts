import { Anchor } from '../anchor.js';
import { Collection } from '../collection.js';
import { G20 } from '../math/G20.js';
export declare const Curve: {
    readonly CollinearityEpsilon: number;
    readonly RecursionLimit: 16;
    readonly CuspLimit: 0;
    readonly Tolerance: {
        readonly distance: 0.25;
        readonly angle: 0;
        readonly epsilon: number;
    };
    readonly abscissas: readonly [readonly [0.5773502691896257], readonly [0, 0.7745966692414834], readonly [0.33998104358485626, 0.8611363115940526], readonly [0, 0.5384693101056831, 0.906179845938664], readonly [0.2386191860831969, 0.6612093864662645, 0.932469514203152], readonly [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585], readonly [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363], readonly [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261], readonly [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717], readonly [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057], readonly [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192], readonly [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881], readonly [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123], readonly [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854], readonly [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]];
    readonly weights: readonly [readonly [1], readonly [0.8888888888888888, 0.5555555555555556], readonly [0.6521451548625461, 0.34785484513745385], readonly [0.5688888888888889, 0.47862867049936647, 0.23692688505618908], readonly [0.46791393457269104, 0.3607615730481386, 0.17132449237917036], readonly [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697], readonly [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626], readonly [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441], readonly [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814], readonly [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366], readonly [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183], readonly [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588], readonly [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186], readonly [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727], readonly [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]];
};
/**
 * @param {Number} t - Zero-to-one value describing what percentage to calculate.
 * @param {Number} a - The firt point's component value.
 * @param {Number} b - The first point's bezier component value.
 * @param {Number} c - The second point's bezier component value.
 * @param {Number} d - The second point's component value.
 * @returns {Number} The coordinate value for a specific component along a cubic bezier curve by `t`.
 */
export declare function getComponentOnCubicBezier(t: number, a: number, b: number, c: number, d: number): number;
/**
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @param limit The amount of vertices to create by subdividing.
 * @returns A list of points ordered in between `x1`, `y1` and `x4`, `y4`
 * @description Given 2 points (a, b) and corresponding control point for each return an array of points that represent points plotted along the curve. The number of returned points is determined by `limit`.
 */
export declare function subdivide<T>(builder: (x: number, y: number) => T, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, limit?: number): T[];
/**
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @param limit The amount of vertices to create by subdividing.
 * @returns {Number} The length of a curve.
 * @description Given 2 points (a, b) and corresponding control point for each, return a float that represents the length of the curve using Gauss-Legendre algorithm. Limit iterations of calculation by `limit`.
 */
export declare function getCurveLength(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, limit: number): number;
/**
 * @param {Number} x1 - x position of first anchor point.
 * @param {Number} y1 - y position of first anchor point.
 * @param {Number} x2 - x position of first anchor point's "right" bezier handle.
 * @param {Number} y2 - y position of first anchor point's "right" bezier handle.
 * @param {Number} x3 - x position of second anchor point's "left" bezier handle.
 * @param {Number} y3 - y position of second anchor point's "left" bezier handle.
 * @param {Number} x4 - x position of second anchor point.
 * @param {Number} y4 - y position of second anchor point.
 * @returns {Object} Object contains min and max `x` / `y` bounds.
 * @see {@link https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js#L856}
 */
export declare function getCurveBoundingBox(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): {
    min: {
        x: number;
        y: number;
    };
    max: {
        x: number;
        y: number;
    };
};
/**
 * @see [Paper.js](@link https://github.com/paperjs/paper.js/blob/master/src/util/Numerical.js#L101)
 */
export declare function integrate(f: (x: number) => number, a: number, b: number, n: number): number;
/**
 * Sets the bezier handles on {@link Anchor}s in the `points` list with estimated values to create a catmull-rom like curve.
 */
export declare function getCurveFromPoints(points: Collection<Anchor>, closed: boolean): void;
/**
 * Given three coordinates set the control points for the middle, b, vertex based on its position with the adjacent points.
 */
export declare function getControlPoints(a: Anchor, b: Anchor, c: Anchor): Anchor;
/**
 * Get the reflection of a point `b` about point `a`. Where `a` is in absolute space and `b` is relative to `a`.
 * @see {@link http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes}
 */
export declare function getReflection(a: G20, b: G20, relative?: boolean): G20;
export declare function getAnchorsFromArcData(center: G20, xAxisRotation: number, rx: number, ry: number, ts: number, td: number, ccw?: boolean): void;
