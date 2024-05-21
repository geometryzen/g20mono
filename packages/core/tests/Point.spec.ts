import { Text } from "../src";
import { Point } from "../src/lib/shapes/Point";
import { MockViewDOM } from "./dom";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Point", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const point = new Point(board, [0, 0]);
        board.add(point);
        expect(point.id).toBe(null);
        expect(point.icon.id).toBe(null);
        expect(point.text).toBe(null);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(point.zzz.viewee);
                    expect(viewee.name).toBe("g");
                    // expect(viewee.getAttributeNames()).toStrictEqual(["transform"]);
                    // expect(viewee.getAttribute("transform")).toBe("none");
                    // expect(viewee.getAttribute("stroke")).toBe("gray");
                    // expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    // expect(viewee.getAttribute("d")).toBe("M -0.5 -0.5 L -0.5 0.5 L 0.5 0.5 L 0.5 -0.5 Z");
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
        const board = initBoard(element);
        const point = new Point(board, [0, 0], { id: "point", withLabel: true });
        board.add(point);
        expect(point.id).toBe("point");
        expect(point.icon.id).toBe("point-icon");
        expect(point.text instanceof Text).toBe(true);
        expect(point.text.id).toBe("point-text");

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(point.zzz.viewee);
                    expect(viewee.name).toBe("g");
                    // expect(viewee.getAttributeNames()).toStrictEqual(["transform"]);
                    // expect(viewee.getAttribute("transform")).toBe("none");
                    // expect(viewee.getAttribute("stroke")).toBe("gray");
                    // expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    // expect(viewee.getAttribute("d")).toBe("M -0.5 -0.5 L -0.5 0.5 L 0.5 0.5 L 0.5 -0.5 Z");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
