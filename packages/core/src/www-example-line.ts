import { Board, G20 } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const board = new Board("my-board", {
        boundingBox: { left: -2, top: 2, right: 2, bottom: -2 }
    });

    const A = board.point(G20.zero);
    const B = board.point(G20.ex);
    const C = board.point(G20.ey);

    board.line(A, B);
    board.line(A, C);

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
