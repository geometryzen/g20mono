import { Circle } from "../src/lib/shapes/Circle";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Circle", function () {
    it("constructor", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const circle = new Circle(board);
        board.add(circle);
        expect(circle.id).toBe(null);

        // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
        const vertices = circle.zzz.vertices;
        expect(vertices.length).toBe(4);
        {
            const vertex0 = vertices[0];
            const vertex1 = vertices[1];
            const vertex2 = vertices[2];
            const vertex3 = vertices[3];

            expect(vertex0.origin.x).toBe(1);
            expect(vertex0.origin.y).toBe(0);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex1.origin.x).toBeCloseTo(0);
            expect(vertex1.origin.y).toBe(1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-1);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }

        board.dispose();
    });
    it("options", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const circle = new Circle(board, { radius: 1, id: "circle", resolution: 4 });
        board.add(circle);
        expect(circle.id).toBe("circle");

        // The vertices on the zzz property are computed from the vertices defined in the Rectangle (Path).
        const vertices = circle.zzz.vertices;
        expect(vertices.length).toBe(4);
        {
            const vertex0 = vertices[0];
            const vertex1 = vertices[1];
            const vertex2 = vertices[2];
            const vertex3 = vertices[3];

            expect(vertex0.origin.x).toBe(1);
            expect(vertex0.origin.y).toBe(0);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex1.origin.x).toBeCloseTo(0);
            expect(vertex1.origin.y).toBe(1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-1);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }

        board.dispose();
    });
    it("radius", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const circle = new Circle(board);
        board.add(circle);
        expect(circle.id).toBe(null);

        expect(circle.radius).toBe(1);
        circle.radius = 2;
        expect(circle.radius).toBe(2);
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    // The vertices on the zzz property are computed from the vertices defined in the Circle (Path).
                    const vertices = circle.zzz.vertices;
                    expect(vertices.length).toBe(4);
                    {
                        const vertex0 = vertices[0];
                        const vertex1 = vertices[1];
                        const vertex2 = vertices[2];
                        const vertex3 = vertices[3];

                        expect(vertex0.origin.x).toBe(2);
                        expect(vertex0.origin.y).toBe(0);
                        expect(vertex0.origin.a).toBe(0);
                        expect(vertex0.origin.b).toBe(0);

                        expect(vertex1.origin.x).toBeCloseTo(0);
                        expect(vertex1.origin.y).toBe(2);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(-2);
                        expect(vertex2.origin.y).toBeCloseTo(0);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBeCloseTo(0);
                        expect(vertex3.origin.y).toBe(-2);
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