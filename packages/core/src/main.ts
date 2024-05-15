import { initBoard } from '../../svg/src/lib/initBoard';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        // boundingBox: { left: -1, top: 1, right: 1, bottom: -1 } // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 } // SVG
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 } // crazy
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 } // crazy and goofy
    });

    board.rectangle({
        fillColor: "#FFFF00",
        fillOpacity: 0.3,
        strokeColor: "#FFCC00",
        strokeOpacity: 0.6,
        strokeWidth: 4 / board.sx,
        // vectorEffect:'non-scaling-stroke'
    });

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
