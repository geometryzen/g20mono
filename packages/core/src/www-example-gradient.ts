import { LinearGradient } from '../../gradient/src/linear-gradient';
import { RadialGradient } from '../../gradient/src/radial-gradient';
import { Disposable, dispose, initBoard } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const disposables: Disposable[] = [];

    const board = initBoard("my-board", {
        // viewFactory: new CanvasViewFactory(),
        boundingBox: { left: -300, top: 300, right: 300, bottom: -300 }
    });

    const gradLinA = new LinearGradient([-100, 50], [100, -50],
        [[0, "red", 1], [1, "orange", 1]],
        { id: 'LinA' }
    );

    const gradLinB = new LinearGradient([-100, -50], [100, 50],
        [[0.5, "red", 1], [0.5, "orange", 1]],
        { id: 'LinB' }
    );

    const gradLinC = new LinearGradient([100, -50], [-100, 50],
        [[0.14, "violet", 1],
        [0.28, "indigo", 1],
        [0.42, "blue", 1],
        [0.56, "green", 1],
        [0.70, "yellow", 1],
        [0.84, "orange", 1],
        [0.98, "red", 1]],
        { id: 'LinC' }
    );

    const gradRadA = new RadialGradient([0, 0],
        [[0, "red", 1], [1, "black", 1]],
        { id: 'RadA', radius: 100 }
    );

    const gradRadB = new RadialGradient([0, 50],
        [[0, "orange", 1], [1, "red", 1]],
        { id: 'RadB', radius: 100 }
    );

    const gradRadC = new RadialGradient([-100, 50],
        [[0.14, "violet", 1],
        [0.28, "indigo", 1],
        [0.42, "blue", 1],
        [0.56, "green", 1],
        [0.70, "yellow", 1],
        [0.84, "orange", 1],
        [0.98, "red", 1]],
        {
            id: 'RadC', radius: 200
        }
    );

    board.rectangle({
        position: [-200, 50],
        width: 160,
        height: 80,
        fillColor: gradLinA,
        strokeColor: gradLinA
    });

    board.rectangle({
        position: [0, 50],
        width: 160,
        height: 80,
        fillColor: gradLinB,
        strokeColor: gradLinB
    });

    board.rectangle({
        position: [200, 50],
        width: 160,
        height: 80,
        fillColor: gradLinC,
        strokeColor: gradLinC
    });

    board.rectangle({
        position: [-200, -50],
        width: 160,
        height: 80,
        fillColor: gradRadA,
        strokeColor: gradRadA
    });

    board.rectangle({
        position: [0, -50],
        width: 160,
        height: 80,
        fillColor: gradRadB,
        strokeColor: gradRadB
    });

    board.rectangle({
        position: [200, -50],
        width: 160,
        height: 80,
        fillColor: gradRadC,
        strokeColor: gradRadC
    });

    window.onunload = function () {
        dispose(disposables);
        board.dispose();
    };

    function animate() {
        //window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate);
});

