import { initBoard } from "./index";

document.addEventListener("DOMContentLoaded", function () {
    const board = initBoard("my-board", {
        boundingBox: { left: 0, top: 0, right: 30, bottom: 12 },
    });

    board.line([0, 1], [30, 1], { vectorEffect: "none" });

    board.line([0, 3], [30, 3], { dashes: [4], vectorEffect: "none" });

    board.line([0, 5], [30, 5], { dashes: [4, 1], vectorEffect: "none" });

    board.line([0, 7], [30, 7], { dashes: [4, 1, 2], vectorEffect: "none" });

    board.line([0, 9], [30, 9], { dashes: [4, 1, 2, 3], vectorEffect: "none" });

    board.line([0, 11], [30, 11], { dashes: [0, 4, 0], vectorEffect: "none" });

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
