import { Group } from "../group";
import { Matrix } from "../matrix";
import { Shape } from "../Shape";

export function computed_world_matrix(shape: Shape, matrix: Matrix): void {

    matrix = (matrix && matrix.identity()) || new Matrix();
    let parent: Shape | Group = shape;
    const matrices: Matrix[] = [];

    while (parent && parent.matrix) {
        matrices.push(parent.matrix);
        // The parent may not be a Group, it could be a View we have reached the top level.
        // However, the test for a local matrix will exclude the view.
        parent = parent.parent as Group;
    }

    matrices.reverse();

    for (let i = 0; i < matrices.length; i++) {
        const m = matrices[i];
        matrix.multiply(m.a11, m.a12, m.a13, m.a21, m.a22, m.a23, m.a31, m.a32, m.a33);
    }
}
