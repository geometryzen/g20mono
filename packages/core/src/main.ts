import { RegularPolygon } from '../../graphics/src/lib/RegularPolygon';
import { RoundedRectangle } from '../../graphics/src/lib/RoundedRectangle';
import { Star } from '../../graphics/src/lib/Star';
import { Disposable, dispose, initBoard, Path } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const disposables: Disposable[] = [];

    const size = 1

    const board = initBoard("my-board", {
        boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },    // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 },     // SVG
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 },     // crazy     
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 },     // crazy and goofy       
    });

    // Unfortunately, some casting required because TypeScript is getting hung up on private (#) properties.
    // Here it's not the Board itself, but the classes that it refers to.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rectangle = new RoundedRectangle(board as any, {
        id: 'rectangle',
        width: Math.SQRT2 * size / 5,
        height: Math.SQRT2 * size / 5,
        position: [-2 * size / 5, 2 * size / 5],
        fillColor: "#FFFF00",
        fillOpacity: 0.3,
        strokeColor: "#FFCC00",
        strokeOpacity: 0.6,
        strokeWidth: 4 / board.sx
    });
    board.add(rectangle as unknown as Path);

    // Unfortunately, some casting required because TypeScript is getting hung up on private (#) properties.
    // Here it's not the Board itself, but the classes that it refers to.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const polygon = new RegularPolygon(board as any, {
        id: 'polygon',
        position: [2 * size / 5, 2 * size / 5],
        fillColor: "#FFFF00",
        fillOpacity: 0.3,
        radius: 1 * size / 5,
        sides: 6,
        strokeColor: "#FFCC00",
        strokeOpacity: 0.6,
        strokeWidth: 4 / board.sx,
        twist: Math.PI / 2
    });

    board.add(polygon as unknown as Path);

    // Unfortunately, some casting required because TypeScript is getting hung up on private (#) properties.
    // Here it's not the Board itself, but the classes that it refers to.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const star = new Star(board as any, {
        id: 'star',
        points: 6,
        innerRadius: 0.5 * size / 5,
        outerRadius: 1 * size / 5,
        position: [-2 * size / 5, -2 * size / 5],
        fillColor: "#FFFF00",
        fillOpacity: 0.3,
        strokeColor: "#FFCC00",
        strokeOpacity: 0.6,
        strokeWidth: 4 / board.sx,
        twist: Math.PI / 2
    });
    board.add(star as unknown as Path);

    window.onunload = function () {
        dispose(disposables);
        board.dispose();
    };

    function animate() {
        //window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate);
});

