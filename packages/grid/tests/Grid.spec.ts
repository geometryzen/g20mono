import { initBoard, MockElement, MockViewDOM } from "@g20/mock";
import { Grid } from "../src/lib/Grid";

describe("Grid", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const grid = new Grid(board);
        board.add(grid);
        expect(grid.id).toBe(null);
        expect(grid.opacity).toBe(1);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(grid.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual([]);

                    const children = grid.children;
                    expect(children.length).toBe(18);

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
        const grid = new Grid(board, { id: "grid", opacity: 0.4 });
        board.add(grid);
        expect(grid.id).toBe("grid");
        expect(grid.opacity).toBe(0.4);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(grid.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["id", "opacity"]);
                    expect(viewee.getAttribute("id")).toBe("grid");
                    expect(viewee.getAttribute("opacity")).toBe("0.4");

                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
