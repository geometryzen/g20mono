import { initBoard } from '../../svg/src/lib/initBoard';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
    });

    const L = board.line([0, 0], [1, 0]);

    // FIXME: This does not trigger 
    L.point1 = [-0.9, -0.9];
    L.point2 = [0.9, 0.9];

    board.dispose();
});
