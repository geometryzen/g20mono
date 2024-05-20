import { G20 } from "../src/lib/math/G20";
import { Ellipse } from "../src/lib/shapes/Ellipse";
import { MockViewDOM } from "./dom";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Ellipse", function () {
    it("constructor", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const ellipse = new Ellipse(board);
        board.add(ellipse);
        expect(ellipse.id).toBe(null);

        // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
        const vertices = ellipse.zzz.vertices;
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

            expect(vertex0.controls.a.x).toBeCloseTo(0);
            expect(vertex0.controls.a.y).toBe(-0.27614237491539667);
            expect(vertex0.controls.b.x).toBeCloseTo(0);
            expect(vertex0.controls.b.y).toBe(0.27614237491539667);

            expect(vertex1.origin.x).toBeCloseTo(0);
            expect(vertex1.origin.y).toBe(0.5);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex1.controls.a.x).toBe(0.5522847498307933);
            expect(vertex1.controls.a.y).toBe(0);
            expect(vertex1.controls.b.x).toBe(-0.5522847498307933);
            expect(vertex1.controls.b.y).toBeCloseTo(0);

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex2.controls.a.x).toBeCloseTo(0);
            expect(vertex2.controls.a.y).toBe(0.27614237491539667);
            expect(vertex2.controls.b.x).toBeCloseTo(0);
            expect(vertex2.controls.b.y).toBe(-0.27614237491539667);

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-0.5);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);

            expect(vertex3.controls.a.x).toBe(-0.5522847498307933);
            expect(vertex3.controls.a.y).toBeCloseTo(0);
            expect(vertex3.controls.b.x).toBe(0.5522847498307933);
            expect(vertex3.controls.b.y).toBeCloseTo(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.276142 1 0.5 0.552284 0.5 0 C 0.5 -0.552285 0.276142 -1 0 -1 C -0.276143 -1 -0.5 -0.552285 -0.5 -0.000001 C -0.500001 0.552284 -0.276143 1 0 1 Z");
                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("resolution", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const ellipse = new Ellipse(board, { id: 'ellipse', resolution: 4 });
        board.add(ellipse);
        expect(ellipse.id).toBe("ellipse");
        // expect(rectangle.width.magnitude()).toBe(4);
        // expect(rectangle.height.magnitude()).toBe(2);

        // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
        const vertices = ellipse.zzz.vertices;
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
            expect(vertex1.origin.y).toBe(0.5);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-0.5);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.276142 1 0.5 0.552284 0.5 0 C 0.5 -0.552285 0.276142 -1 0 -1 C -0.276143 -1 -0.5 -0.552285 -0.5 -0.000001 C -0.500001 0.552284 -0.276143 1 0 1 Z");
                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options I", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const ellipse = new Ellipse(board, { rx: 1, ry: 0.5, id: 'ellipse' });
        board.add(ellipse);
        expect(ellipse.id).toBe("ellipse");
        // expect(rectangle.width.magnitude()).toBe(4);
        // expect(rectangle.height.magnitude()).toBe(2);

        // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
        const vertices = ellipse.zzz.vertices;
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
            expect(vertex1.origin.y).toBe(0.5);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-0.5);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.276142 1 0.5 0.552284 0.5 0 C 0.5 -0.552285 0.276142 -1 0 -1 C -0.276143 -1 -0.5 -0.552285 -0.5 -0.000001 C -0.500001 0.552284 -0.276143 1 0 1 Z");
                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options II", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const ellipse = new Ellipse(board, { rx: [1, 0], ry: [0, 0.5], id: 'ellipse' });
        board.add(ellipse);
        expect(ellipse.id).toBe("ellipse");
        // expect(rectangle.width.magnitude()).toBe(4);
        // expect(rectangle.height.magnitude()).toBe(2);

        // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
        const vertices = ellipse.zzz.vertices;
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
            expect(vertex1.origin.y).toBe(0.5);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-0.5);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.276142 1 0.5 0.552284 0.5 0 C 0.5 -0.552285 0.276142 -1 0 -1 C -0.276143 -1 -0.5 -0.552285 -0.5 -0.000001 C -0.500001 0.552284 -0.276143 1 0 1 Z");
                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("options III", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const rx = G20.ex.clone();
        const ry = G20.ey.clone();
        const ellipse = new Ellipse(board, { rx, ry, id: 'ellipse' });
        board.add(ellipse);
        expect(ellipse.id).toBe("ellipse");
        expect(ellipse.rx === rx).toBe(true);
        expect(ellipse.ry === ry).toBe(true);

        rx.scale(1);
        ry.scale(0.5);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
                    const vertices = ellipse.zzz.vertices;
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
                        expect(vertex1.origin.y).toBe(0.5);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(-1);
                        expect(vertex2.origin.y).toBeCloseTo(0);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBeCloseTo(0);
                        expect(vertex3.origin.y).toBe(-0.5);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.276142 1 0.5 0.552284 0.5 0 C 0.5 -0.552285 0.276142 -1 0 -1 C -0.276143 -1 -0.5 -0.552285 -0.5 -0.000001 C -0.500001 0.552284 -0.276143 1 0 1 Z");
                    board.dispose();
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("rx", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const ellipse = new Ellipse(board);
        board.add(ellipse);
        expect(ellipse.id).toBe(null);
        expect(ellipse.rx.magnitude()).toBe(1);
        ellipse.rx = G20.ex.clone();

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
                    const vertices = ellipse.zzz.vertices;
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
                        expect(vertex1.origin.y).toBe(0.5);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(-1);
                        expect(vertex2.origin.y).toBeCloseTo(0);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBeCloseTo(0);
                        expect(vertex3.origin.y).toBe(-0.5);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }

                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.276142 1 0.5 0.552284 0.5 0 C 0.5 -0.552285 0.276142 -1 0 -1 C -0.276143 -1 -0.5 -0.552285 -0.5 -0.000001 C -0.500001 0.552284 -0.276143 1 0 1 Z");

                    board.dispose();

                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("ry", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const ellipse = new Ellipse(board);
        board.add(ellipse);
        expect(ellipse.id).toBe(null);
        expect(ellipse.ry.magnitude()).toBe(0.5);
        ellipse.ry = G20.ey.clone().scale(0.5);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
                    const vertices = ellipse.zzz.vertices;
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
                        expect(vertex1.origin.y).toBe(0.5);
                        expect(vertex1.origin.a).toBe(0);
                        expect(vertex1.origin.b).toBe(0);

                        expect(vertex2.origin.x).toBe(-1);
                        expect(vertex2.origin.y).toBeCloseTo(0);
                        expect(vertex2.origin.a).toBe(0);
                        expect(vertex2.origin.b).toBe(0);

                        expect(vertex3.origin.x).toBeCloseTo(0);
                        expect(vertex3.origin.y).toBe(-0.5);
                        expect(vertex3.origin.a).toBe(0);
                        expect(vertex3.origin.b).toBe(0);
                    }

                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M 0 1 C 0.276142 1 0.5 0.552284 0.5 0 C 0.5 -0.552285 0.276142 -1 0 -1 C -0.276143 -1 -0.5 -0.552285 -0.5 -0.000001 C -0.500001 0.552284 -0.276143 1 0 1 Z");

                    board.dispose();

                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("circular", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const ellipse = new Ellipse(board, { rx: 1, ry: 1 });
        board.add(ellipse);
        expect(ellipse.id).toBe(null);

        // The vertices on the zzz property are computed from the vertices defined in the Ellipse (Path).
        const vertices = ellipse.zzz.vertices;
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

            expect(vertex0.controls.a.x).toBeCloseTo(0);
            expect(vertex0.controls.a.y).toBe(-0.5522847498307933);
            expect(vertex0.controls.b.x).toBeCloseTo(0);
            expect(vertex0.controls.b.y).toBe(0.5522847498307933);

            expect(vertex1.origin.x).toBeCloseTo(0);
            expect(vertex1.origin.y).toBe(1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex1.controls.a.x).toBe(0.5522847498307933);
            expect(vertex1.controls.a.y).toBe(0);
            expect(vertex1.controls.b.x).toBe(-0.5522847498307933);
            expect(vertex1.controls.b.y).toBeCloseTo(0);

            expect(vertex2.origin.x).toBe(-1);
            expect(vertex2.origin.y).toBeCloseTo(0);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);

            expect(vertex2.controls.a.x).toBeCloseTo(0);
            expect(vertex2.controls.a.y).toBe(0.5522847498307933);
            expect(vertex2.controls.b.x).toBeCloseTo(0);
            expect(vertex2.controls.b.y).toBe(-0.5522847498307933);

            expect(vertex3.origin.x).toBeCloseTo(0);
            expect(vertex3.origin.y).toBe(-1);
            expect(vertex3.origin.a).toBe(0);
            expect(vertex3.origin.b).toBe(0);

            expect(vertex3.controls.a.x).toBe(-0.5522847498307933);
            expect(vertex3.controls.a.y).toBeCloseTo(0);
            expect(vertex3.controls.b.x).toBe(0.5522847498307933);
            expect(vertex3.controls.b.y).toBeCloseTo(0);
        }
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(ellipse.zzz.viewee);
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
    /*
    it("origin as G20", function () {
        const element = new MockElement('div');
        const board = initBoard(element);
        const rectangle = new Ellipse(board);
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

                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(rectangle.zzz.viewee);
                    expect(viewee.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(viewee.getAttribute('fill')).toBe('none');
                    expect(viewee.getAttribute('stroke')).toBe('gray');
                    expect(viewee.getAttribute('stroke-width')).toBe('0.009375');
                    expect(viewee.getAttribute('d')).toBe("M -1 -1 L -1 0 L 0 0 L 0 -1 Z");

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
    */
});
