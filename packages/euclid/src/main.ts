import { initBoard } from "@g20/svg";
import { circle_circle_intersection } from "../src/circle_circle_intersection";

document.addEventListener("DOMContentLoaded", function () {
    const board = initBoard("my-board", {
        // boundingBox: { left: -1, top: 1, right: 1, bottom: -1 } // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 } // SVG
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 } // crazy
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 } // crazy and goofy
    });

    board.defaults.reset();
    board.defaults.point.iconKind = "rectangle";
    // board.defaults.text.fontFamily = "sans-serif";
    board.defaults.point.iconColor = "#FF0000";
    board.defaults.point.iconOpacity = 1;
    board.defaults.point.textColor = "#0000FF";
    board.defaults.point.textOpacity = 0.6;
    board.defaults.point.hideIcon = false;

    const c1 = board.circle({ radius: 0.25, position: [-0.1, 0] });
    const c2 = board.circle({ radius: 0.25, position: [+0.1, 0] });
    const [pos1, pos2, cci] = circle_circle_intersection(c1, c2);
    board.point(pos1, { id: "point1" });
    board.point(pos2, { id: "point2" });
    c1.X = [-0.0, 0];
    c2.X = [0.1, 0];

    window.onunload = () => {
        cci.dispose();
        board.dispose();
    };
});
