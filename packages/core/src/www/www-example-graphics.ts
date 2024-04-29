import { RegularPolygon } from '../../../graphics/src/lib/RegularPolygon';
import { Disposable, dispose, initBoard } from '../index';
import { Path } from '../lib/Path';
import { Rectangle } from '../lib/shapes/Rectangle';

document.addEventListener('DOMContentLoaded', function () {

    const disposables: Disposable[] = [];

    const board = initBoard("my-board", {
        // boundingBox: { left: -5, top: 5, right: 5, bottom: -5 },    // Cartesian
        // boundingBox: { left: -5, top: -5, right: 5, bottom: 5 },     // SVG
        // boundingBox: { left: 5, top: 5, right: -5, bottom: -5 },     // crazy     
        // boundingBox: { left: 5, top: -5, right: -5, bottom: 5 },     // crazy and goofy       
    });

    const rectangle = new Rectangle(board, { fill: 'none', strokeWidth: 4 });
    board.add(rectangle);

    // Unfortunately, some casting required because TypeScript is getting hung up on private (#) properties.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const polygon = new RegularPolygon(board as any, {
        id: 'polygon',
        fill: "#FFFF00",
        fillOpacity: 0.3,
        radius: 3,
        stroke: "#FFCC00",
        strokeOpacity: 0.6,
        strokeWidth: 4
    }) as unknown as Path;

    board.add(polygon);

    window.onunload = function () {
        dispose(disposables);
        board.dispose();
    };

    function animate() {
        //window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate);
});

