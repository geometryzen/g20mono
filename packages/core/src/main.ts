import { initBoard } from '../../svg/src/lib/initBoard';

document.addEventListener('DOMContentLoaded', function () {

    const board = initBoard("my-board", {
        // boundingBox: { left: -1, top: 1, right: 1, bottom: -1 } // Cartesian
        // boundingBox: { left: -1, top: -1, right: 1, bottom: 1 } // SVG
        // boundingBox: { left: 1, top: -1, right: -1, bottom: 1 } // crazy
        // boundingBox: { left: 1, top: 1, right: -1, bottom: -1 } // crazy and goofy
    });
    board.point([0, 0])
    board.point([0.5, 0])
    // board.point([0, 0.5])
    // board.point([0.75, 0.75])
    /*

    board.line([0, 0], [0.75, 0.75])

    board.arrow([1, 0])
    board.arrow([0, 1])

    // board.rectangle()

    // board.circle()

    // board.ellipse()

    board.polygon([
        [0, 1],
        [-Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6)],
        [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6)]
    ])

    board.text("Hello, World")

    board.arc(0.45, 0.5, 0, Math.PI / 2)

    board.path(true,
        [
            [0, -0.5],
            [-0.25, -0.75],
            [0, -1],
            [0.25, -0.75]
        ]
    )

    board.curve(true,
        [
            [0, 0],
            [0, 0.8],
            [-0.8, 0],
            [0, -0.8]
        ]
    )
        */
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
