import { initBoard } from "../../svg/src/lib/initBoard";

document.addEventListener("DOMContentLoaded", function () {
    const board = initBoard("my-board", {
        // boundingBox: { left: -1, top: 1, right: 1, bottom: -1 } // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 } // SVG
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 } // crazy
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 } // crazy and goofy
    });
    /*
    board.defaults.reset();
    board.defaults.point.iconKind = "rectangle";
    board.defaults.text.fontFamily = "Lato";
    board.defaults.point.iconColor = "#FF0000";
    board.defaults.point.iconOpacity = 1;
    board.defaults.point.textColor = "#0000FF";
    board.defaults.point.textOpacity = 0.6;
    board.defaults.point.hideIcon = false;
    */

    board.point([0, 0], {
        //    iconColor: "#FF0000",
        text: "Lorem..."
        //    textColor: "#0000FF",
    });

    window.onunload = () => {
        board.dispose();
    };
});
