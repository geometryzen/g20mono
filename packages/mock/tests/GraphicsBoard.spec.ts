import { Shape } from "@g20/core";
import { GraphicsBoard } from "../../core/src/index";
import { initBoard, MockElement, MockViewDOM } from "../src/index";

describe("GraphicsBoard", function () {
    it("constructor", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const board = initBoard(element, {});

        board.rectangle();
    });
    it("point", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 }
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const P: Shape = board.point([x, y]);
        expect(P.X.x).toBe(x);
        expect(P.X.y).toBe(y);
        const viewee = viewDOM.downcast(P.viewee());
        expect(viewee.getAttribute("id")).toBe(null);

        P.id = "P";
        expect(P.id).toBe("P");
        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    expect(viewee.getAttribute("transform")).toBe("matrix(1 0 0 1 3 2)");
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
