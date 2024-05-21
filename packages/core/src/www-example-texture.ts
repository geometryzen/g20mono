import { Texture } from "../../texture/src/index";
import { Disposable, dispose, initBoard } from "./index";

document.addEventListener("DOMContentLoaded", function () {
    const disposables: Disposable[] = [];

    const image = document.getElementById("my-image") as HTMLImageElement;

    const texture = new Texture(image);

    const board = initBoard("my-board", {
        // boundingBox: { left: -300, top: 300, right: 300, bottom: -300 },    // Cartesian
        boundingBox: { left: -300, top: -300, right: 300, bottom: 300 }, // SVG
        // boundingBox: { left: 5, top: 5, right: -5, bottom: -5 },     // crazy
        // boundingBox: { left: 5, top: -5, right: -5, bottom: 5 },     // crazy and goofy
    });

    const rectangle = board.rectangle();
    rectangle.width = 400;
    rectangle.height = 353;
    // rectangle.origin.x = board.width / 2
    // rectangle.origin.y = board.height / 2

    // rectangle.corner()
    // board.update()

    rectangle.fill = texture;
    // board.update()

    window.onunload = function () {
        dispose(disposables);
        board.dispose();
    };

    function animate() {
        //window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate);
});
