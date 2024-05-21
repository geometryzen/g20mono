import { Arrow, G20 } from "../src";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Arrow", () => {
    it("constructor", () => {
        const element = new MockElement("div");
        const board = initBoard(element);
        const arrow = new Arrow(board, [1, 0]);
        arrow.show();
        expect(arrow.X.x).toBe(0);
        expect(arrow.X.y).toBe(0);
        expect(arrow.R.a).toBe(1);
        expect(arrow.R.b).toBe(0);
        expect(arrow.headLength).toBe(0.2);
        board.add(arrow);
        board.dispose();
    });
    it("axis", () => {
        const element = new MockElement("div");
        const board = initBoard(element);
        const axis = G20.vector(Math.random(), Math.random()).normalize();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const arrow = new Arrow(board as any, [axis.x, axis.y]);
        arrow.show();
        expect(arrow.axis.x).toBe(axis.x);
        expect(arrow.axis.y).toBe(axis.y);
        expect(arrow.axis.a).toBe(0);
        expect(arrow.axis.b).toBe(0);

        arrow.axis = [0, 1];
        expect(arrow.axis.x).toBe(0);
        expect(arrow.axis.y).toBe(1);
        expect(arrow.axis.a).toBe(0);
        expect(arrow.axis.b).toBe(0);

        arrow.axis = axis;
        expect(arrow.axis.x).toBe(axis.x);
        expect(arrow.axis.y).toBe(axis.y);
        expect(arrow.axis.a).toBe(0);
        expect(arrow.axis.b).toBe(0);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        board.add(arrow as any);
        board.dispose();
    });
    it("headLength", () => {
        const element = new MockElement("div");
        const board = initBoard(element);
        const headLength = Math.random();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const arrow = new Arrow(board as any, [1, 0], { headLength });
        arrow.show();
        expect(arrow.headLength).toBe(headLength);

        arrow.headLength = 0.1;
        expect(arrow.headLength).toBe(0.1);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        board.add(arrow as any);
        board.dispose();
    });
    it("origin", () => {
        const element = new MockElement("div");
        const board = initBoard(element);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const arrow = new Arrow(board as any, [0, 1]);
        arrow.show();
        expect(arrow.origin.x).toBe(0);
        expect(arrow.origin.y).toBe(0);
        expect(arrow.origin.a).toBe(0);
        expect(arrow.origin.b).toBe(0);

        arrow.origin = G20.vector(0, 0.5);
        expect(arrow.origin.x).toBe(0);
        expect(arrow.origin.y).toBe(0.5);
        expect(arrow.origin.a).toBe(0);
        expect(arrow.origin.b).toBe(0);

        const origin = G20.vector(Math.random(), Math.random());
        arrow.origin = [origin.x, origin.y];
        expect(arrow.origin.x).toBe(origin.x);
        expect(arrow.origin.y).toBe(origin.y);
        expect(arrow.origin.a).toBe(0);
        expect(arrow.origin.b).toBe(0);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        board.add(arrow as any);
        board.dispose();
    });
});
