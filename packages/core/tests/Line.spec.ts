import { G20 } from "../src/lib/math/G20";
import { Line } from "../src/lib/shapes/Line";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Line", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const x1 = Math.random();
        const y1 = Math.random();
        const x2 = Math.random();
        const y2 = Math.random();
        const line = new Line(board, [x1, y1], [x2, y2]);
        board.add(line);
        expect(line.id).toBe(null);

        const vertices = line.zzz.vertices;
        expect(vertices.length).toBe(2);
        {
            const vertex1 = vertices[0];
            const vertex2 = vertices[1];

            expect(vertex1.origin.x).toBe(x1);
            expect(vertex1.origin.y).toBe(y1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(x2);
            expect(vertex2.origin.y).toBe(y2);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);
        }

        const point1 = line.point1;
        point1.set(2, 3);
        {
            expect(vertices.length).toBe(2);
            const vertex1 = vertices[0];
            const vertex2 = vertices[1];

            expect(vertex1.origin.x).toBe(2);
            expect(vertex1.origin.y).toBe(3);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(x2);
            expect(vertex2.origin.y).toBe(y2);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);
        }

        const point2 = line.point2;
        point2.set(5, 7);
        {
            expect(vertices.length).toBe(2);
            const vertex1 = vertices[0];
            const vertex2 = vertices[1];

            expect(vertex1.origin.x).toBe(2);
            expect(vertex1.origin.y).toBe(3);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(5);
            expect(vertex2.origin.y).toBe(7);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);
        }

        board.dispose();
    });
    it("options", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const x1 = Math.random();
        const y1 = Math.random();
        const x2 = Math.random();
        const y2 = Math.random();
        const line = new Line(board, [x1, y1], [x2, y2], { id: "line" });
        board.add(line);
        expect(line.id).toBe("line");

        board.dispose();
    });
    it("point1", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const x1 = Math.random();
        const y1 = Math.random();
        const x2 = Math.random();
        const y2 = Math.random();
        const line = new Line(board, [x1, y1], [x2, y2]);
        board.add(line);

        const point1: G20 = line.point1;
        expect(point1.x).toBe(x1);
        expect(point1.y).toBe(y1);

        const x = Math.random();
        const y = Math.random();
        line.point1 = [x, y];
        expect(line.point1.x).toBe(x);
        expect(line.point1.y).toBe(y);

        const v = G20.vector(Math.random(), Math.random());
        line.point1 = v;
        expect(line.point1.x).toBe(v.x);
        expect(line.point1.y).toBe(v.y);

        board.dispose();
    });
    it("point2", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const x1 = Math.random();
        const y1 = Math.random();
        const x2 = Math.random();
        const y2 = Math.random();
        const line = new Line(board, [x1, y1], [x2, y2]);
        board.add(line);

        const point2: G20 = line.point2;
        expect(point2.x).toBe(x2);
        expect(point2.y).toBe(y2);

        const x = Math.random();
        const y = Math.random();
        line.point2 = [x, y];
        expect(line.point2.x).toBe(x);
        expect(line.point2.y).toBe(y);

        const v = G20.vector(Math.random(), Math.random());
        line.point2 = v;
        expect(line.point2.x).toBe(v.x);
        expect(line.point2.y).toBe(v.y);

        board.dispose();
    });
});
