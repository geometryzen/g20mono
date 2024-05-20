import { initBoard } from '../../svg/src/lib/initBoard';
import { G20 } from './lib/math/G20';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        // boundingBox: { left: -1, top: 1, right: 1, bottom: -1 } // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 } // SVG
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 } // crazy
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 } // crazy and goofy
    });

    const ellipse = board.ellipse({
        fillColor: "#FFFF00",
        fillOpacity: 0.3,
        strokeColor: "#FFCC00",
        strokeOpacity: 0.6,
        strokeWidth: 4 / board.sx,
        // vectorEffect:'non-scaling-stroke'
    });

    const theta = Math.PI / 4;
    ellipse.rx = G20.vector(Math.cos(theta), Math.sin(theta));
    ellipse.ry = G20.vector(-Math.sin(theta), Math.cos(theta)).scale(0.5);

    // rectangle.height.set(0.5, 1);
    // rectangle.width.set(1, 0.5);
    // rectangle.origin = [0, 0];

    /*
    function animate() {
        window.requestAnimationFrame(animate);
    }
    
    window.requestAnimationFrame(animate);
    */
});
