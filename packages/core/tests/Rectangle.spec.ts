import { G20 } from "../src/lib/math/G20";
import { Rectangle } from "../src/lib/shapes/Rectangle";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Line", function () {
    it("constructor", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);

        // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
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

        board.dispose();
    });
    it("options", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const rectangle = new Rectangle(board, { width: 4, height: 2, id: 'rectangle' });
        board.add(rectangle);
        expect(rectangle.id).toBe("rectangle");
        expect(rectangle.width).toBe(4);
        expect(rectangle.height).toBe(2);

        // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
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

        board.dispose();
    });
    it("height", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);

        expect(rectangle.height).toBe(1);
        rectangle.height = 2;
        expect(rectangle.height).toBe(2);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
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

                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("width", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const rectangle = new Rectangle(board);
        board.add(rectangle);
        expect(rectangle.id).toBe(null);

        expect(rectangle.width).toBe(1);
        rectangle.width = 2;
        expect(rectangle.width).toBe(2);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
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

                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("origin as G20", function () {
        const element = new MockElement('div');
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
                    // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
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
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("origin as [x,y]", function () {
        const element = new MockElement('div');
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
                    // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
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
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
});
