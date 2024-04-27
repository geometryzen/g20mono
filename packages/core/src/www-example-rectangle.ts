import { Board } from './index';

document.addEventListener('DOMContentLoaded', function () {

    const board = new Board("my-board", {
        boundingBox: { left: -5, top: 5, right: 5, bottom: -5 } // Cartesian
        // boundingBox: { left: -5, top: -5, right: 5, bottom: 5 } // goofy (SVG)
        // boundingBox: { left: 5, top: 5, right: -5, bottom: -5 } // crazy
        // boundingBox: { left: 5, top: -5, right: -5, bottom: 5 } // crazy, goofy
    });

    //    const A = board.point(G20.zero);
    //    const B = board.point(G20.ex);
    //    const C = board.point(G20.ey);

    const rect = board.rectangle({
        id: 'rectangle',
        fill: 'red'
    });
    rect.width = 2;
    rect.height = 1;
    rect.attitude.rotorFromAngle(Math.PI / 4);
    rect.position.x += 1;

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
