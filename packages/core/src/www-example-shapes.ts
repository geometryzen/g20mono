import { G20, initBoard } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard('my-board', { boundingBox: { left: -300, top: 300, right: 300, bottom: -300 } });

    const circle = board.circle({ radius: 50 });
    circle.radius = 100;
    circle.position = G20.vector(-70, 0);
    circle.fill = '#FF8000';

    const rect = board.rectangle({ position: [70, 0], width: 10, height: 100 });
    rect.width = 100;
    rect.height = 300;
    // origin is not yet supported by the Rectangle (was supported in the Path-based implementation)
    // rect.origin = G20.vector(0, 100);
    rect.fill = 'rgba(0, 200, 255, 0.75)';

    window.onunload = function () {
        board.dispose();
    };


    function animate() {
        // board.update()
        // window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate);
});
