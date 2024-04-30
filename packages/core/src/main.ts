import { G20, initBoard } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        boundingBox: { left: -2, top: 2, right: 2, bottom: -2 }
    });

    const A = board.point(G20.zero);
    const B = board.point(G20.ex.scale(1.5));
    const C = board.point(G20.ey.scale(1.5));

    const AB = board.line(A, B);
    const AC = board.line(A, C);

    // AB.point1.origin.set(-1, 0)
    AB.point2.origin.copyVector(G20.ex);
    AC.point2.origin.copyVector(G20.ey);

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
