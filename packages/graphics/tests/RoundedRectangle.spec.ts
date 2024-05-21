import { initMockBoard, MockElement, MockViewDOM } from "@g20/mock";
import { RoundedRectangle } from "../src/lib/RoundedRectangle";

describe("RoundedRectangle", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initMockBoard(element);
        const shape = new RoundedRectangle(board);
        board.add(shape);
        expect(shape.id).toBe(null);

        const vertices = shape.zzz.vertices;
        expect(vertices.length).toBe(10);
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(shape.zzz.viewee);
                    // expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe(
                        "M -0.707107 -0.507107 L -0.707107 0.507106 L -0.507107 0.707106 L 0.507106 0.707106 L 0.707106 0.507106 L 0.707106 -0.507107 L 0.507106 -0.707107 L -0.507107 -0.707107 L -0.707107 -0.507107 L -0.707107 -0.507107 Z"
                    );
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options", function () {
        const element = new MockElement("div");
        const board = initMockBoard(element);
        const shape = new RoundedRectangle(board, {
            width: 1,
            height: 1,
            radius: 0.2
        });
        board.add(shape);
        expect(shape.id).toBe(null);

        const vertices = shape.zzz.vertices;
        expect(vertices.length).toBe(10);
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(shape.zzz.viewee);
                    // expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -0.5 -0.3 L -0.5 0.3 L -0.3 0.5 L 0.3 0.5 L 0.5 0.3 L 0.5 -0.3 L 0.3 -0.5 L -0.3 -0.5 L -0.5 -0.3 L -0.5 -0.3 Z");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
