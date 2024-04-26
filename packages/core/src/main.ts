import { Board, Shape } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const board = new Board("my-board", {
        // viewFactory: new CanvasViewFactory(),
        boundingBox: { left: -2, top: 2, right: 2, bottom: -2 } // regular (y increases upwards)
        // boundingBox: { left: -2, top: -2, right: 2, bottom: 2 } // goofy (y increases downwards)
        // boundingBox: { left: 2, top: 2, right: -2, bottom: -2 } // regular, crazy (x increases leftwards)
        // boundingBox: { left: 2, top: -2, right: -2, bottom: 2 } // goofy, crazy (x increases leftwards)
    });

    const origin = board.point([0.0, 0.0], { id: 'origin' });
    const unitX = board.point([1.0, 0.0], { id: 'unitX' });
    const unitY = board.point([0.0, 1.0], { id: 'unitY' });

    const ex = board.arrow(unitX, {
        id: 'ex',
        position: origin,
        stroke: 'red',
        strokeWidth: 4
    });

    const ey = board.arrow(unitY, {
        id: 'ey',
        position: origin,
        stroke: 'blue',
        strokeWidth: 4
    });

    const textX = board.text("ex (red)", {
        id: 'text-ex',
        position: ex.axis,
        opacity: 0.5,
        fillOpacity: 0.5,
        strokeOpacity: 0.5,
        strokeWidth: 1
    });
    rescale(textX, board);

    const textY = board.text("ey (blue)", {
        id: 'text-ey',
        position: ey.axis,
        opacity: 0.5,
        fillOpacity: 0.5,
        strokeOpacity: 0.5,
        strokeWidth: 1
    });
    rescale(textY, board);

    // board.update(); // Needed for CanvasView

    function rescale(shape: Shape, board: Board): void {
        shape.scaleXY.set(2 / board.scaleXY.x, 2 / board.scaleXY.y);
    }

    window.onunload = function () {
        board.dispose();
    };
});

