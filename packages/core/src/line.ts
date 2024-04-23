import { Board, G20, Text } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const board = new Board("my-board", {
        boundingBox: { left: -4, top: 4, right: 4, bottom: -4 }
    });

    const A = board.point([-1, 0]);
    const B = board.point([1, 0]);

    const textA = board.text("A", {
        fontFamily: 'Lato',
        fontSize: 20,
        anchor: 'end',
        baseline: 'middle',
        dx: -10,
        position: A
    });
    rescale(textA, board);

    const textB = board.text("B", {
        fontFamily: 'Lato',
        fontSize: 20,
        anchor: 'start',
        baseline: 'middle',
        dx: 10,
        position: B
    });
    rescale(textB, board);

    const textC = board.text("C", {
        fontFamily: 'Lato',
        fontSize: 20,
        anchor: 'middle',
        dy: -10,
        visibility: 'hidden'
    });
    rescale(textC, board);

    const AB = board.line(A, B, {
        stroke: '#999999',
        strokeOpacity: 0.8,
        strokeWidth: 2
    });

    const BCD = board.circle({
        position: A,
        radius: AB.length,
        fill: "none",
        stroke: "#0000ff",
        strokeWidth: 2
    });

    const textD = board.text("D", {
        fontFamily: 'Lato',
        fontSize: 20,
        anchor: 'end',
        baseline: 'middle',
        dx: -5,
        position: G20.vector(A.position.x - BCD.radius, B.position.y)
    });
    rescale(textD, board);

    const ACE = board.circle({
        position: B,
        radius: AB.length,
        fill: "none",
        stroke: "#0000ff",
        strokeWidth: 2
    });

    const textE = board.text("E", {
        fontFamily: 'Lato',
        fontSize: 20,
        anchor: 'start',
        baseline: 'middle',
        dx: 5,
        position: G20.vector(B.position.x + ACE.radius, B.position.y)
    });
    rescale(textE, board);

    function rescale(text: Text, board: Board): void {
        text.scaleXY.x = 1 / board.scaleXY.x;
        text.scaleXY.y = 1 / board.scaleXY.y;
    }

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
