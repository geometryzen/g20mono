import { Board, G20, Text } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const board = new Board("my-board", {
        boundingBox: { left: -5, top: 5, right: 5, bottom: -5 },
    });

    const A = board.point([0.0, 0.0], { id: 'A', visibility: 'hidden' });
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
    box.fill = 'rgba(255, 128, 0, 0.33)';
    box.stroke = 'rgb(255, 128, 0)';
    box.strokeWidth = 2;
    box.position.copyVector(A.position).add(AC.__mul__(0.25)).add(N.__mul__(box.height / 2));

    const textA = board.text("A", {
        id: 'text-A',
        anchor: 'end',
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
        anchor: 'start',
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
        anchor: 'start',
        baseline: 'middle',
        dx: 5,
        fontFamily: 'Lato',
        fontSize: 20,
        opacity: 0.4,
        position: C.X
    });
    rescale(textC, board);

    const textD = board.text("Box", {
        id: 'text-D',
        anchor: 'middle',
        baseline: 'middle',
        fontFamily: 'Lato',
        fontSize: 20,
        position: box.X
    });
    textD.attitude.rotorFromDirections(AB, AC);
    rescale(textD, board);

    const textE = board.text("Ramp", {
        id: 'text-E',
        anchor: 'middle',
        baseline: 'hanging',
        fontFamily: 'Lato',
        fontSize: 20,
        position: ramp.X
    });
    textE.attitude.rotorFromDirections(AB, AC);
    rescale(textE, board);
    board.update();

    board.point([box.position.x, box.position.y], { id: 'D', visibility: 'hidden' });
    board.update();

    box.stroke = "#FFCC00";
    box.strokeWidth = 4;
    box.strokeOpacity = 0.6;
    box.fill = "#FFFF00";
    box.fillOpacity = 0.3;

    const Fg = board.arrow(G20.ey.scale(-2), {
        position: box.X,
        strokeWidth: 2
    });
    Fg.strokeOpacity = 0.4;

    const Fn = board.arrow(N.scale(1.5), {
        position: box.X,
        strokeOpacity: 0.4
    });
    Fn.strokeWidth = 2;

    const Fs = board.arrow(S.scale(1.5), {
        position: box.X
    });
    Fs.strokeOpacity = 0.4;
    Fs.strokeWidth = 2;

    const arrow = board.arrow(G20.ex.scale(1), {
        id: 'arrow',
        strokeWidth: 4
    });
    arrow.axis = G20.ey;
    arrow.headLength = 0.25;
    arrow.origin = G20.ey.scale(1 / 2);

    // Now move the box
    box.position.copyVector(A.position).add(AC.__mul__(0.75)).add(N.__mul__(box.height / 2));

    // board.update()

    window.onunload = function () {
        board.dispose();
    };

    /*
    function animate() {
        // board.update()
        window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate)
    */
});

function rescale(text: Text, board: Board): void {
    text.scaleXY.x = 1 / board.scaleXY.x;
    text.scaleXY.y = 1 / board.scaleXY.y;
}

