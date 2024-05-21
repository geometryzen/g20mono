import { initMockBoard, MockElement, MockViewDOM } from "@g20/mock";
import { RegularPolygon } from "../src/lib/RegularPolygon";

describe("RegularPolygon", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initMockBoard(element);
        const shape = new RegularPolygon(board);
        board.add(shape);
        expect(shape.id).toBe(null);

        const vertices = shape.zzz.vertices;
        expect(vertices.length).toBe(7);
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(shape.zzz.viewee);
                    // expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M 0 1 L 0.866025 0.5 L 0.866025 -0.5 L 0 -1 L -0.866026 -0.500001 L -0.866026 0.5 L -0.000001 1 Z");
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
        const shape = new RegularPolygon(board, { radius: 1 });
        board.add(shape);
        expect(shape.id).toBe(null);

        const vertices = shape.zzz.vertices;
        expect(vertices.length).toBe(7);
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(shape.zzz.viewee);
                    // expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M 0 1 L 0.866025 0.5 L 0.866025 -0.5 L 0 -1 L -0.866026 -0.500001 L -0.866026 0.5 L -0.000001 1 Z");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
