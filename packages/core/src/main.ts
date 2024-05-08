import { initBoard } from '../../svg/src/lib/initBoard';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
    });

    board.circle();
    /*
    board.path(false,
        [
            new Anchor([10, 10], 'M'),
            G20.vector(90,90),
            [90, 10],
            [50, 10]
        ],
        {
            strokeWidth: 2,
            vectorEffect: 'non-scaling-stroke'
        }
    );
    */
    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
