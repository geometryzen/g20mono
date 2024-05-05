import { G20, initBoard } from './index';
import { Anchor } from './lib/anchor';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        boundingBox: { left: -1, top: 1, right: 1, bottom: -1 }
    });

    const A = board.point(G20.zero);
    const B = board.point(G20.ex);
    const C = board.point(G20.ey);
    const D = board.point(B.X.clone().add(C.X));

    board.line(A, D);

    board.arrow(G20.ex);
    board.arrow(G20.ey);

    board.rectangle();
    board.circle();
    board.ellipse();
    board.polygon([[0, 1], [-Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6)], [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6)]]);
    board.text("Hello, World");
    board.arc(0, 0, 0.45, 0.5, 0, Math.PI / 2);
    board.path(false, [new Anchor(G20.zero, 'M'), new Anchor(G20.ey.scale(-1), 'L')]);
    board.curve(true, [
        new Anchor(G20.zero, 'M'),
        new Anchor(G20.ey, 'L'),
        new Anchor(G20.ex.scale(-1), 'L'),
        new Anchor(G20.ey.scale(-1), 'L')]
    );

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
