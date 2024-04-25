import { Board, ColorProvider } from './index';

class MockColor implements ColorProvider {
    constructor(readonly id: string) {
    }
    addRef(): void {
    }
    release(): void {
    }
    use(/*svgElement: SVGElement*/): this {
        return this;
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const board = new Board("my-board", {
        boundingBox: { left: -4, top: 4, right: 4, bottom: -4 }
    });

    const rect = board.rectangle();
    rect.strokeWidth = 2;

    const color = new MockColor("foo");

    rect.fill = 'yellow';
    rect.stroke = 'red';
    rect.fill = color;

    // board.update();

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
