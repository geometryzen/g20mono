import { Matrix } from "../matrix";
import { MatrixDecomposition } from "./MatrixDecomposition";

/**
 * Decompose a 2D 3x3 Matrix to find the skew.
 * 
 */
export function decompose_2d_3x3_matrix(m: Matrix): MatrixDecomposition {

    const a = m.a11;
    const c = m.a12;
    const x = m.a13;

    const b = m.a21;
    const d = m.a22;
    const y = m.a23;

    // M =
    //
    // | sx * cos φ, -sx * sin φ, tx |
    // | sy * sin φ,  sy * cos φ, ty |
    // | 0,           0,          1  |

    // S =
    //
    // | sx, 0,  0 |
    // | 0,  sy, 0 |
    // | 0,  0,  1 |

    // R =
    //
    // | cos φ, - sin φ, 0 |
    // | sin φ,   cos φ, 0 |
    // | 0,       0,     1 |

    // T =
    //
    // | 1, 0, tx |
    // | 0, 1, ty |
    // | 0, 0, 1  |

    // M = S * R * T

    // TODO: Include skewX, skewY
    // It's much more complicated
    // https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
    // https://math.stackexchange.com/questions/237369/given-this-transformation-matrix-how-do-i-decompose-it-into-translation-rotati/417813
    // https://stackoverflow.com/questions/45159314/decompose-2d-transformation-matrix
    // https://stackoverflow.com/questions/28075743/how-do-i-compose-a-rotation-matrix-with-human-readable-angles-from-scratch/28084380#28084380

    // For a working example using symbolic math...
    // https://www.stemcstudio.com/gists/5c0bc63b847e3df02e57f0548ecce7a3

    return {
        position: { x, y },
        translateX: x,
        translateY: y,
        scaleX: Math.sqrt(a * a + c * c),   // should be multiplied by sign(a)
        scaleY: Math.sqrt(b * b + d * d),   // should be multiplied by sign(d)
        // TODO: rotation is being reported in degrees.
        // tan(φ) = -b/a = c/d
        rotation: Math.atan2(b, a)
    };

}
