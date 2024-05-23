import { initBoard } from "../../svg/src/lib/initBoard";

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

    // TODO: NaN values (in the matrix) should cause the Point to vanish (visibility="hidden")?
    const point = board.point([NaN, NaN]);
    // point.hide()

    board.text("Hello, 1234567890", {
        strokeColor: "#FF0000",
        strokeOpacity: 0,
        strokeWidth: 0,
        fontSize: 90,
        // fontFamily: "Lato",
        anchor: "middle",
        baseline: "middle"
    });

    window.onunload = () => {
        board.dispose();
    };
});
