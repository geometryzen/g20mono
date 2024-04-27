import { G20, IBoard, Shape } from './index';
import { freeBoard, initBoard } from './lib/Board';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        boundingBox: { left: -5, top: 5, right: 5, bottom: -5 }, // Cartesian
        // boundingBox: { left: -5, top: -5, right: 5, bottom: 5 }, // goofy only (SVG)
        // boundingBox: { left: 5, top: 5, right: -5, bottom: -5 }, // crazy
        // boundingBox: { left: 5, top: -5, right: -5, bottom: 5 }, // crazy and goofy
    });

    const A = board.point([0.0, 0.0], { id: 'A', visibility: 'collapse', fill: 'red', stroke: 'red' });
    const B = board.point([8.0, 0.0], { id: 'B', visibility: 'hidden' });
    const C = board.point([8.0, 4.0], { id: 'C', visibility: 'hidden' });

    const AB = B.position.__sub__(A.position);
    const AC = C.position.__sub__(A.position);
    const S = AC.normalize();
    const N = S.__mul__(G20.I);

    const ramp = board.polygon([A, B, C], { id: 'ramp', opacity: 0.8 });
    ramp.fill = 'rgba(0, 191, 168, 0.33)';
    ramp.stroke = 'rgb(0, 191, 168)';
    ramp.strokeWidth = 2;
    ramp.center();

    const box = board.rectangle({ id: 'box', width: 2, height: 1 });
    box.attitude.rotorFromDirections(AB, AC);
    box.position.copyVector(A.position).add(AC.__mul__(0.25)).add(N.__mul__(box.height / 2));
    box.stroke = "#FFCC00";
    box.strokeWidth = 4;
    box.strokeOpacity = 0.6;
    box.fill = "#FFFF00";
    box.fillOpacity = 0.3;

    const textA = board.text("A", {
        id: 'text-A',
        anchor: board.crazy ? 'start' : 'end',
        baseline: 'middle',
        dx: -5,
        fontFamily: 'Lato',
        fontSize: 20,
        opacity: 0.4,
        position: A.X
    });
    rescale(textA, board);

    const textB = board.text("B", {
        id: 'text-B',
        anchor: board.crazy ? 'end' : 'start',
        baseline: 'middle',
        dx: 5,
        fontFamily: 'Lato',
        fontSize: 20,
        opacity: 0.4,
        position: B.X
    });
    rescale(textB, board);

    const textC = board.text("C", {
        id: 'text-C',
        anchor: board.crazy ? 'end' : 'start',
        baseline: 'middle',
        dx: 5,
        fontFamily: 'Lato',
        fontSize: 20,
        opacity: 0.4,
        position: C.X
    });
    rescale(textC, board);

    const textBox = board.text("Box", {
        id: 'text-Box',
        anchor: 'middle',
        baseline: 'middle',
        fontFamily: 'Lato',
        fontSize: 20,
        position: box.X
    });
    textBox.attitude.rotorFromDirections(AB, AC);
    rescale(textBox, board);

    const textRamp = board.text("Ramp", {
        id: 'text-Ramp',
        anchor: 'middle',
        baseline: board.goofy ? 'auto' : 'hanging',
        fontFamily: 'Lato',
        fontSize: 20,
        position: ramp.X
    });
    textRamp.attitude.rotorFromDirections(AB, AC);
    rescale(textRamp, board);

    const Fg = board.arrow(G20.ey.scale(-2), {
        id: 'Fg',
        position: box.X,
        strokeWidth: 2
    });
    Fg.strokeOpacity = 0.4;

    const Fn = board.arrow(N.scale(1.5), {
        id: 'Fn',
        position: box.X,
        strokeOpacity: 0.4
    });
    Fn.strokeWidth = 2;

    const Fs = board.arrow(S.scale(1.5), {
        id: 'Fs',
        position: box.X
    });
    Fs.strokeOpacity = 0.4;
    Fs.strokeWidth = 2;

    const arrow = board.arrow(G20.ey.scale(-1), {
        id: 'arrow',
        strokeWidth: 4
    });
    // arrow.axis = G20.ey.scale(-1);
    arrow.headLength = 0.25;
    arrow.origin = G20.ey.scale(1 / 2);

    window.onunload = function () {
        freeBoard(board);
    };


    function animate() {
        const temp = G20.fromVector(box.X);
        temp.copyVector(A.position).add(AC.__mul__(0.75)).add(N.__mul__(box.height / 2));
        box.X.copyVector(temp);
        // board.update()
        // window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate);
});

function rescale(text: Shape, board: IBoard): void {
    text.scaleXY.set(1 / board.scaleXY.x, 1 / board.scaleXY.y);
}

