import { G20, initBoard } from '../index';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        // boundingBox: { left: -2, top: 2, right: 2, bottom: -2 } // Cartesian
        // boundingBox: { left: -2, top: -2, right: 2, bottom: 2 } // SVG
        // boundingBox: { left: 2, top: -2, right: -2, bottom: 2 } // crazy
        boundingBox: { left: 2, top: 2, right: -2, bottom: -2 } // crazy and goofy
    });

    const A = board.point(G20.zero);
    const B = board.point(G20.ex);
    const C = board.point(G20.ey);

    board.line(A, B);
    board.line(A, C);

    board.rectangle({ fill: 'none', stroke: 'black', width: 1.5, position: [0.75, 0.5] });

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
