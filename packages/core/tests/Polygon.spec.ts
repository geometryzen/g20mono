import { Anchor } from "../src/lib/Anchor";
import { Polygon } from "../src/lib/shapes/Polygon";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Polygon", function () {
    it("constructor", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const polygon = new Polygon(board);
        board.add(polygon);
        expect(polygon.id).toBe(null);

        const vertices = polygon.zzz.vertices;
        expect(vertices.length).toBe(0);
        {
            /*
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
            */
        }

        board.dispose();
    });
    it("points", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const polygon = new Polygon(board, [[0, 0], [4, 0], [4, 3]]);
        board.add(polygon);
        expect(polygon.id).toBe(null);

        const vertices = polygon.zzz.vertices;
        expect(vertices.length).toBe(3);
        {
            const vertex0: Anchor = vertices[0];
            const vertex1: Anchor = vertices[1];
            const vertex2: Anchor = vertices[2];

            expect(vertex0.command).toBe("M");
            expect(vertex0.origin.x).toBe(0);
            expect(vertex0.origin.y).toBe(0);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex1.command).toBe("L");
            expect(vertex1.origin.x).toBe(4);
            expect(vertex1.origin.y).toBe(0);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.command).toBe("L");
            expect(vertex2.origin.x).toBe(4);
            expect(vertex2.origin.y).toBe(3);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);
        }

        board.dispose();
    });
});
