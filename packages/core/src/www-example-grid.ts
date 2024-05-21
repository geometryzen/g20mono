import { Grid } from "../../grid/src/lib/Grid";
import { Disposable, dispose, initBoard, Path } from "./index";

document.addEventListener("DOMContentLoaded", function () {
    const disposables: Disposable[] = [];

    const board = initBoard("my-board", {
        boundingBox: { left: -1, top: 1, right: 1, bottom: -1 } // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 },     // SVG
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 },     // crazy
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 },     // crazy and goofy
    });

    // Unfortunately, some casting required because TypeScript is getting hung up on private (#) properties.
    // Here it's not the Board itself, but the classes that it refers to.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gridA = new Grid(board as any, {
        id: "gridA"
    });
    board.add(gridA as unknown as Path);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gridB = new Grid(board as any, {
        id: "gridB"
    });
    board.add(gridB as unknown as Path);
    gridB.xAxis.strokeOpacity = 0.5;
    gridB.xAxis.stroke = "blue";
    gridB.xLabel.strokeOpacity = 1;
    gridB.xLabel.stroke = "blue";
    gridB.yAxis.strokeOpacity = 0.5;
    gridB.yAxis.stroke = "blue";
    gridB.yLabel.strokeOpacity = 1;
    gridB.yLabel.stroke = "blue";

    gridB.attitude.rotorFromAngle(Math.PI / 12);

    window.onunload = function () {
        dispose(disposables);
        board.dispose();
    };

    function animate() {
        //window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate);
});
