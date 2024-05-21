import { G20, initBoard } from "./index";

document.addEventListener("DOMContentLoaded", function () {
    const board = initBoard("my-board", {
        boundingBox: { left: -1, top: 1, right: 1, bottom: -1 }
    });

    const A = board.point(G20.zero);
    const B = board.point(G20.ex.scale(0.9));
    const C = board.point(G20.ey.scale(0.9));
    const D = board.point(B.X.clone().add(C.X));

    board.line(A, B);
    board.line(A, C);
    board.line(A, D);

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
