import { Matrix } from "../matrix";
/**
 * @see https://frederic-wang.fr/decomposition-of-2d-transform-matrices.html
 * @see https://math.stackexchange.com/questions/13150/extracting-rotation-scale-values-from-2d-transformation-matrix
 * @param matrix
 * @returns
 */
export declare function decompose_2d_3x3_matrix_wang(matrix: Matrix): {
    position: {
        x: number;
        y: number;
    };
    rotation: number;
    scale: [scaleX: number, scaleY: number];
    skew: [skewX: number, skewY: number];
};
