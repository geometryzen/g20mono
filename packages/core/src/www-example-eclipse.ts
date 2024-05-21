import { Board, initBoard, Shape } from "./index";

document.addEventListener("DOMContentLoaded", function () {
    const board = initBoard("my-board", {
        boundingBox: { left: -2, top: 2, right: 2, bottom: -2 } // regular (y increases upwards)
        // boundingBox: { left: -2, top: -2, right: 2, bottom: 2 } // goofy (y increases downwards)
        // boundingBox: { left: 2, top: 2, right: -2, bottom: -2 } // regular, crazy (x increases leftwards)
        // boundingBox: { left: 2, top: -2, right: -2, bottom: 2 } // goofy, crazy (x increases leftwards)
    });

    const ellipse = board.ellipse({
        id: "ellipse",
        rx: 1.0,
        ry: 0.5,
        strokeColor: "lightgreen",
        strokeWidth: 4
    });
    ellipse.R.rotorFromAngle(Math.PI / 4);
    ellipse.X.x += 1.0;

    const origin = board.point([0.0, 0.0], {
        id: "origin",
        visibility: "hidden"
    });
    const unitX = board.point([1.0, 0.0], { id: "unitX", visibility: "hidden" });
    const unitY = board.point([0.0, 1.0], { id: "unitY", visibility: "hidden" });

    const ex = board.arrow(unitX.X, {
        id: "ex",
        position: origin.X,
        strokeColor: "red",
        strokeWidth: 4
    });

    const ey = board.arrow(unitY.X, {
        id: "ey",
        position: origin.X,
        strokeColor: "blue",
        strokeWidth: 4
    });

    const textX = board.text("ex", {
        id: "text-A",
        anchor: "middle",
        baseline: "middle",
        position: ex.axis,
        opacity: 0.5,
        fillOpacity: 0.5,
        fontSize: 20,
        strokeOpacity: 0.5,
        strokeWidth: 1,
        dx: 20
    });
    rescale(textX, board);

    const textY = board.text("ey", {
        id: "text-B",
        anchor: "middle",
        baseline: "middle",
        position: ey.axis,
        opacity: 0.5,
        fillOpacity: 0.5,
        fontSize: 20,
        strokeOpacity: 0.5,
        strokeWidth: 1,
        dy: 20
    });
    rescale(textY, board);

    ellipse.rx = 1;
    ellipse.ry = 1;

    function rescale(shape: Shape, board: Board): void {
        shape.sx = 1 / board.sx;
        shape.sy = 1 / board.sy;
    }

    window.onunload = function () {
        board.dispose();
    };
});
