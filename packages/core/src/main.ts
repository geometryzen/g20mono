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
    board.defaults.text.fontFamily = "Lato";

    board.point([0.5, 0.5], { name: "A", id: "point" });

    window.onunload = () => {
        board.dispose();
    };
});
