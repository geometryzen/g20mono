import { G20 } from "../src/lib/math/G20";
import { Rectangle } from "../src/lib/shapes/Rectangle";
import { MockViewDOM } from "./dom";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Rectangle", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);

        const vertices = rectangle.zzz.vertices;
        expect(vertices.length).toBe(4);
        {
            const vertex0 = vertices[0];
            const vertex1 = vertices[1];
            const vertex2 = vertices[2];
            const vertex3 = vertices[3];

            expect(vertex0.origin.x).toBe(-0.5);
            expect(vertex0.origin.y).toBe(-0.5);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex1.origin.x).toBe(0.5);
            expect(vertex1.origin.y).toBe(-0.5);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(0.5);
            expect(vertex2.origin.y).toBe(0.5);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBe(-0.5);
            expect(vertex3.origin.y).toBe(0.5);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -0.5 -0.5 L -0.5 0.5 L 0.5 0.5 L 0.5 -0.5 Z");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options I", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const rectangle = new Rectangle(board, {
            width: 4,
            height: 2,
            id: "rectangle"
        });
        board.add(rectangle);
        expect(rectangle.id).toBe("rectangle");
        expect(rectangle.width.magnitude()).toBe(4);
        expect(rectangle.height.magnitude()).toBe(2);

        const vertices = rectangle.zzz.vertices;
        expect(vertices.length).toBe(4);
        {
            const vertex0 = vertices[0];
            const vertex1 = vertices[1];
            const vertex2 = vertices[2];
            const vertex3 = vertices[3];

            expect(vertex0.origin.x).toBe(-2);
            expect(vertex0.origin.y).toBe(-1);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex1.origin.x).toBe(2);
            expect(vertex1.origin.y).toBe(-1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(2);
            expect(vertex2.origin.y).toBe(1);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBe(-2);
            expect(vertex3.origin.y).toBe(1);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -1 -2 L -1 2 L 1 2 L 1 -2 Z");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options II", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const rectangle = new Rectangle(board, {
            width: [4, 0],
            height: [0, 2],
            id: "rectangle"
        });
        board.add(rectangle);
        expect(rectangle.id).toBe("rectangle");
        expect(rectangle.width.magnitude()).toBe(4);
        expect(rectangle.height.magnitude()).toBe(2);

        const vertices = rectangle.zzz.vertices;
        expect(vertices.length).toBe(4);
        {
            const vertex0 = vertices[0];
            const vertex1 = vertices[1];
            const vertex2 = vertices[2];
            const vertex3 = vertices[3];

            expect(vertex0.origin.x).toBe(-2);
            expect(vertex0.origin.y).toBe(-1);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex1.origin.x).toBe(2);
            expect(vertex1.origin.y).toBe(-1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(2);
            expect(vertex2.origin.y).toBe(1);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBe(-2);
            expect(vertex3.origin.y).toBe(1);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -1 -2 L -1 2 L 1 2 L 1 -2 Z");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options III", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const width = G20.ex.clone();
        const height = G20.ey.clone();
        const rectangle = new Rectangle(board, { width, height, id: "rectangle" });
        board.add(rectangle);
        expect(rectangle.id).toBe("rectangle");

        width.scale(4);
        height.scale(2);

        expect(rectangle.width.magnitude()).toBe(4);
        expect(rectangle.height.magnitude()).toBe(2);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const vertices = rectangle.zzz.vertices;
                    expect(vertices.length).toBe(4);
                    {
                        const vertex0 = vertices[0];
                        const vertex1 = vertices[1];
                        const vertex2 = vertices[2];
                        const vertex3 = vertices[3];

                        expect(vertex0.origin.x).toBe(-2);
                        expect(vertex0.origin.y).toBe(-1);
                        expect(vertex0.origin.a).toBe(0);
                        expect(vertex0.origin.b).toBe(0);

                        expect(vertex1.origin.x).toBe(2);
                        expect(vertex1.origin.y).toBe(-1);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(2);
                        expect(vertex2.origin.y).toBe(1);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBe(-2);
                        expect(vertex3.origin.y).toBe(1);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -1 -2 L -1 2 L 1 2 L 1 -2 Z");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("height", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);

        expect(rectangle.height.magnitude()).toBe(1);
        rectangle.height = 2;
        expect(rectangle.height.x).toBe(0);
        expect(rectangle.height.y).toBe(2);
        expect(rectangle.height.a).toBe(0);
        expect(rectangle.height.b).toBe(0);
        rectangle.height = [1, 3];
        expect(rectangle.height.x).toBe(1);
        expect(rectangle.height.y).toBe(3);
        expect(rectangle.height.a).toBe(0);
        expect(rectangle.height.b).toBe(0);
        rectangle.height = G20.vector(0, 2);
        expect(rectangle.height.x).toBe(0);
        expect(rectangle.height.y).toBe(2);
        expect(rectangle.height.a).toBe(0);
        expect(rectangle.height.b).toBe(0);
        expect(rectangle.height.magnitude()).toBe(2);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const vertices = rectangle.zzz.vertices;
                    expect(vertices.length).toBe(4);
                    {
                        const vertex0 = vertices[0];
                        const vertex1 = vertices[1];
                        const vertex2 = vertices[2];
                        const vertex3 = vertices[3];

                        expect(vertex0.origin.x).toBe(-0.5);
                        expect(vertex0.origin.y).toBe(-1);
                        expect(vertex0.origin.a).toBe(0);
                        expect(vertex0.origin.b).toBe(0);

                        expect(vertex1.origin.x).toBe(0.5);
                        expect(vertex1.origin.y).toBe(-1);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(0.5);
                        expect(vertex2.origin.y).toBe(1);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBe(-0.5);
                        expect(vertex3.origin.y).toBe(1);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }

                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -1 -0.5 L -1 0.5 L 1 0.5 L 1 -0.5 Z");

                    board.dispose();

                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("width", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);

        expect(rectangle.width.magnitude()).toBe(1);
        rectangle.width = 2;
        expect(rectangle.width.x).toBe(2);
        expect(rectangle.width.y).toBe(0);
        expect(rectangle.width.a).toBe(0);
        expect(rectangle.width.b).toBe(0);
        rectangle.width = [3, 1];
        expect(rectangle.width.x).toBe(3);
        expect(rectangle.width.y).toBe(1);
        expect(rectangle.width.a).toBe(0);
        expect(rectangle.width.b).toBe(0);
        rectangle.width = G20.vector(2, 0);
        expect(rectangle.width.x).toBe(2);
        expect(rectangle.width.y).toBe(0);
        expect(rectangle.width.a).toBe(0);
        expect(rectangle.width.b).toBe(0);
        expect(rectangle.width.magnitude()).toBe(2);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const vertices = rectangle.zzz.vertices;
                    expect(vertices.length).toBe(4);
                    {
                        const vertex0 = vertices[0];
                        const vertex1 = vertices[1];
                        const vertex2 = vertices[2];
                        const vertex3 = vertices[3];

                        expect(vertex0.origin.x).toBe(-1);
                        expect(vertex0.origin.y).toBe(-0.5);
                        expect(vertex0.origin.a).toBe(0);
                        expect(vertex0.origin.b).toBe(0);

                        expect(vertex1.origin.x).toBe(1);
                        expect(vertex1.origin.y).toBe(-0.5);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(1);
                        expect(vertex2.origin.y).toBe(0.5);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBe(-1);
                        expect(vertex3.origin.y).toBe(0.5);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }

                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -0.5 -1 L -0.5 1 L 0.5 1 L 0.5 -1 Z");

                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("origin as G20", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);
        expect(rectangle.origin.x).toBe(0);
        expect(rectangle.origin.y).toBe(0);
        expect(rectangle.origin.a).toBe(0);
        expect(rectangle.origin.b).toBe(0);

        rectangle.origin = G20.vector(0.5, 0.5);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const vertices = rectangle.zzz.vertices;
                    expect(vertices.length).toBe(4);
                    {
                        const vertex0 = vertices[0];
                        const vertex1 = vertices[1];
                        const vertex2 = vertices[2];
                        const vertex3 = vertices[3];

                        expect(vertex0.origin.x).toBe(-1);
                        expect(vertex0.origin.y).toBe(-1);
                        expect(vertex0.origin.a).toBe(0);
                        expect(vertex0.origin.b).toBe(0);

                        expect(vertex1.origin.x).toBe(0);
                        expect(vertex1.origin.y).toBe(-1);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(0);
                        expect(vertex2.origin.y).toBe(0);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBe(-1);
                        expect(vertex3.origin.y).toBe(0);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }

                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M -1 -1 L -1 0 L 0 0 L 0 -1 Z");

                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("origin as [x,y]", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);
        expect(rectangle.origin.x).toBe(0);
        expect(rectangle.origin.y).toBe(0);
        expect(rectangle.origin.a).toBe(0);
        expect(rectangle.origin.b).toBe(0);

        rectangle.origin = [0.5, 0.5];

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const vertices = rectangle.zzz.vertices;
                    expect(vertices.length).toBe(4);
                    {
                        const vertex0 = vertices[0];
                        const vertex1 = vertices[1];
                        const vertex2 = vertices[2];
                        const vertex3 = vertices[3];

                        expect(vertex0.origin.x).toBe(-1);
                        expect(vertex0.origin.y).toBe(-1);
                        expect(vertex0.origin.a).toBe(0);
                        expect(vertex0.origin.b).toBe(0);

                        expect(vertex1.origin.x).toBe(0);
                        expect(vertex1.origin.y).toBe(-1);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(0);
                        expect(vertex2.origin.y).toBe(0);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBe(-1);
                        expect(vertex3.origin.y).toBe(0);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }

                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
