import { ArcSegment } from "../src/lib/shapes/ArcSegment";
import { MockViewDOM } from "./dom";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("ArcSegement", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const arc = new ArcSegment(board);
        board.add(arc);
        expect(arc.id).toBe(null);
        expect(arc.innerRadius).toBe(0);
        expect(arc.outerRadius).toBe(0);
        expect(arc.startAngle).toBe(0);
        expect(arc.endAngle).toBe(2 * Math.PI);

        const vertices = arc.zzz.vertices;
        expect(vertices.length).toBe(1);
        {
            const vertex0 = vertices[0];

            expect(vertex0.command).toBe("M");

            expect(vertex0.origin.x).toBe(0);
            expect(vertex0.origin.y).toBe(0);
            expect(vertex0.origin.a).toBe(0);
            expect(vertex0.origin.b).toBe(0);

            expect(vertex0.controls.a.x).toBe(0);
            expect(vertex0.controls.a.y).toBe(0);
            expect(vertex0.controls.a.a).toBe(0);
            expect(vertex0.controls.a.b).toBe(0);

            expect(vertex0.controls.b.x).toBe(0);
            expect(vertex0.controls.b.y).toBe(0);
            expect(vertex0.controls.b.a).toBe(0);
            expect(vertex0.controls.b.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(arc.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M 0 0 Z");
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
        const arc = new ArcSegment(board, {
            innerRadius: 0.5,
            outerRadius: 1,
            startAngle: 0,
            endAngle: Math.PI / 2,
            resolution: 36,
        });
        board.add(arc);
        expect(arc.id).toBe(null);
        expect(arc.innerRadius).toBe(0.5);
        expect(arc.outerRadius).toBe(1);
        expect(arc.startAngle).toBe(0);
        expect(arc.endAngle).toBe(Math.PI / 2);

        const vertices = arc.zzz.vertices;
        expect(vertices.length).toBe(36);
        {
            const vertex = vertices[0];

            expect(vertex.command).toBe("M");

            expect(vertex.origin.x).toBe(1);
            expect(vertex.origin.y).toBe(0);
            expect(vertex.origin.a).toBe(0);
            expect(vertex.origin.b).toBe(0);

            expect(vertex.controls.a.x).toBe(0);
            expect(vertex.controls.a.y).toBe(0);
            expect(vertex.controls.a.a).toBe(0);
            expect(vertex.controls.a.b).toBe(0);

            expect(vertex.controls.b.x).toBe(0);
            expect(vertex.controls.b.y).toBe(0);
            expect(vertex.controls.b.a).toBe(0);
            expect(vertex.controls.b.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(arc.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe(
                        "M 0 1 C 0 1 0.036949 1.00086 0.092268 0.995734 C 0.119927 0.993171 0.156444 0.988077 0.183749 0.982973 C 0.211054 0.977868 0.246945 0.969427 0.273662 0.961825 C 0.30038 0.954223 0.335339 0.942506 0.361241 0.932472 C 0.387143 0.922437 0.420872 0.907544 0.445738 0.895163 C 0.470604 0.882781 0.502815 0.86484 0.526432 0.850217 C 0.550049 0.835594 0.580467 0.814757 0.602634 0.798017 C 0.624801 0.781277 0.653167 0.757722 0.673695 0.739008 C 0.694223 0.720295 0.720295 0.694223 0.739008 0.673695 C 0.757722 0.653167 0.781277 0.624801 0.798017 0.602634 C 0.814757 0.580467 0.835594 0.550049 0.850217 0.526432 C 0.86484 0.502815 0.882781 0.470604 0.895163 0.445738 C 0.907544 0.420872 0.922437 0.387143 0.932472 0.361241 C 0.942506 0.335339 0.954223 0.30038 0.961825 0.273662 C 0.969427 0.246945 0.977868 0.211054 0.982973 0.183749 C 0.988077 0.156444 0.993171 0.119927 0.995734 0.092268 C 0.998297 0.064609 1 0.027777 1 0 L 0.5 0 C 0.5 0 0.500475 0.019738 0.497592 0.049008 C 0.49615 0.063643 0.493261 0.083121 0.490392 0.097545 C 0.487523 0.111968 0.482739 0.131069 0.47847 0.145142 C 0.474201 0.159214 0.467567 0.177755 0.461939 0.191341 C 0.456312 0.204928 0.447892 0.222728 0.44096 0.235698 C 0.434028 0.248667 0.423904 0.265557 0.415734 0.277785 C 0.407564 0.290012 0.395834 0.305828 0.386505 0.317196 C 0.377175 0.328564 0.363952 0.343154 0.353553 0.353553 C 0.343154 0.363952 0.328564 0.377175 0.317196 0.386505 C 0.305828 0.395834 0.290012 0.407564 0.277785 0.415734 C 0.265557 0.423904 0.248667 0.434028 0.235698 0.44096 C 0.222728 0.447892 0.204928 0.456312 0.191341 0.461939 C 0.177755 0.467567 0.159214 0.474201 0.145142 0.47847 C 0.131069 0.482739 0.111968 0.487523 0.097545 0.490392 C 0.083121 0.493261 0.063643 0.49615 0.049008 0.497592 C 0.034373 0.499033 0.014705 0.5 0 0.5 L 0 1 Z"
                    );
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
