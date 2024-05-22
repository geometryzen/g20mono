import { initBoard, MockElement, MockViewDOM } from "@g20/mock";
import { Axes } from "../src/lib/Axes";

describe("Grid", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const axes = new Axes(board);
        board.add(axes);
        expect(axes.id).toBe(null);
        expect(axes.opacity).toBe(1);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(axes.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual([]);

                    const children = axes.children;
                    expect(children.length).toBe(4);

                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
