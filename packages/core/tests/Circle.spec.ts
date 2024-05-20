import { Circle } from "../src/lib/shapes/Circle";
import { MockViewDOM } from "./dom";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Circle", function () {
    it("constructor", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const circle = new Circle(board);
        board.add(circle);
        expect(circle.id).toBe(null);

        const vertices = circle.zzz.vertices;
        expect(vertices.length).toBe(4);
        {
            const vertex0 = vertices[0];
            const vertex1 = vertices[1];
            const vertex2 = vertices[2];
            const vertex3 = vertices[3];

            expect(vertex0.command).toBe('M');

            expect(vertex0.origin.x).toBe(1);
            expect(vertex0.origin.y).toBe(0);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex0.controls.a.x).toBeCloseTo(0);
            expect(vertex0.controls.a.y).toBe(-0.5522847498307933);
            expect(vertex0.controls.a.a).toBe(0);
            expect(vertex0.controls.a.b).toBe(0);

            expect(vertex0.controls.b.x).toBeCloseTo(0);
            expect(vertex0.controls.b.y).toBe(0.5522847498307933);
            expect(vertex0.controls.b.a).toBe(0);
            expect(vertex0.controls.b.b).toBe(0);

            expect(vertex1.command).toBe('C');

            expect(vertex1.origin.x).toBeCloseTo(0);
            expect(vertex1.origin.y).toBe(1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex1.controls.a.x).toBe(0.5522847498307933);
            expect(vertex1.controls.a.y).toBe(0);
            expect(vertex1.controls.a.a).toBe(0);
            expect(vertex1.controls.a.b).toBe(0);

            expect(vertex1.controls.b.x).toBe(-0.5522847498307933);
            expect(vertex1.controls.b.y).toBeCloseTo(0);
            expect(vertex1.controls.b.a).toBe(0);
            expect(vertex1.controls.b.b).toBe(0);

            expect(vertex2.command).toBe('C');

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex2.controls.a.x).toBeCloseTo(0);
            expect(vertex2.controls.a.y).toBe(0.5522847498307933);
            expect(vertex2.controls.a.a).toBe(0);
            expect(vertex2.controls.a.b).toBe(0);

            expect(vertex2.controls.b.x).toBeCloseTo(0);
            expect(vertex2.controls.b.y).toBe(-0.5522847498307933);
            expect(vertex2.controls.b.a).toBe(0);
            expect(vertex2.controls.b.b).toBe(0);

            expect(vertex3.command).toBe('C');

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-1);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);

            expect(vertex3.controls.a.x).toBe(-0.5522847498307933);
            expect(vertex3.controls.a.y).toBeCloseTo(0);
            expect(vertex3.controls.a.a).toBe(0);
            expect(vertex3.controls.a.b).toBe(0);

            expect(vertex3.controls.b.x).toBe(0.5522847498307933);
            expect(vertex3.controls.b.y).toBeCloseTo(0);
            expect(vertex3.controls.b.a).toBe(0);
            expect(vertex3.controls.b.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(circle.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.552284 1 1 0.552284 1 0 C 1 -0.552285 0.552284 -1 0 -1 C -0.552285 -1 -1 -0.552285 -1 -0.000001 C -1.000001 0.552284 -0.552285 1 0 1 Z");
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
        const board = initBoard(element);
        const circle = new Circle(board, { radius: 1, id: "circle", resolution: 4 });
        board.add(circle);
        expect(circle.id).toBe("circle");

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
