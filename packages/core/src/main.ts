import { initBoard } from '../../svg/src/lib/initBoard';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        // boundingBox: { left: -1, top: 1, right: 1, bottom: -1 } // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 } // SVG
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 } // crazy
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 } // crazy and goofy
    });

    const arc = board.arc({
        innerRadius: 0.5,
        outerRadius: 1,
        startAngle: 0,
        endAngle: Math.PI / 2,
        fillColor: "#FFFF00",
        fillOpacity: 0.3,
        strokeColor: "#FFCC00",
        strokeOpacity: 0.6,
        resolution: 36
    });

    arc.startAngle = Math.PI / 4;
    arc.endAngle = Math.PI / 3;
    arc.innerRadius = 0.1
    arc.outerRadius = 0.3

    window.onunload = () => {
        board.dispose();
    };
});
