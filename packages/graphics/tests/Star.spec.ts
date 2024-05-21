import { initMockBoard, MockElement, MockViewDOM } from "@g20/mock";
import { Star } from "../src/lib/Star";

describe("Star", function () {
    it("constructor", function () {
        const element = new MockElement('div');
        const board = initMockBoard(element);
        const shape = new Star(board);
        board.add(shape);
        expect(shape.id).toBe(null);

        const vertices = shape.zzz.vertices;
        expect(vertices.length).toBe(17);
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(shape.zzz.viewee);
                    // expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 L 0.191341 0.461939 L 0.707106 0.707106 L 0.461939 0.191341 L 1 0 L 0.461939 -0.191342 L 0.707106 -0.707107 L 0.191341 -0.46194 L 0 -1 L -0.191342 -0.46194 L -0.707107 -0.707107 L -0.46194 -0.191342 L -1 -0.000001 L -0.46194 0.191341 L -0.707107 0.707106 L -0.191342 0.461939 L -0.000001 1 Z");
                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options", function () {
        const element = new MockElement('div');
        const board = initMockBoard(element);
        const shape = new Star(board, { radius: 1 });
        board.add(shape);
        expect(shape.id).toBe(null);

        const vertices = shape.zzz.vertices;
        expect(vertices.length).toBe(17);
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(shape.zzz.viewee);
                    // expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 L 0.191341 0.461939 L 0.707106 0.707106 L 0.461939 0.191341 L 1 0 L 0.461939 -0.191342 L 0.707106 -0.707107 L 0.191341 -0.46194 L 0 -1 L -0.191342 -0.46194 L -0.707107 -0.707107 L -0.46194 -0.191342 L -1 -0.000001 L -0.46194 0.191341 L -0.707107 0.707106 L -0.191342 0.461939 L -0.000001 1 Z");
                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
});
