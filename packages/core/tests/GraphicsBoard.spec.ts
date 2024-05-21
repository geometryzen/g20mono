import { GraphicsBoard } from "../src/lib/GraphicsBoard";
import { Group } from "../src/lib/Group";
import { G20 } from "../src/lib/math/G20";
import { Shape } from "../src/lib/Shape";
import { MockViewDOM } from "./dom";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("GraphicsBoard", function () {
    it("constructor", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const board = initBoard(element, {});

        board.rectangle();
    });
    it("arc", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 0;
        const y = 0;
        const arc = board.arc({
            innerRadius: 0.5,
            outerRadius: 1.0,
            startAngle: 0,
            endAngle: Math.PI,
        });
        expect(arc.X.x).toBe(x);
        expect(arc.X.y).toBe(y);
        const viewee = viewDOM.downcast(arc.viewee());
        expect(viewee.name).toBe("path");
        // FIXME: null would be more consistent with the DOM.
        expect(viewee.getAttribute("id")).toBe(null);

        arc.id = "P";
        expect(arc.id).toBe("P");
        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    // FIXME: Why do we have 4 NaN?
                    // expect(viewee.getAttribute('transform')).toBe('matrix(1 0 0 1 3 2)');
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("arrow", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const axis = G20.vector(1, 0);
        const x = 2;
        const y = 3;
        const arrow = board.arrow(axis, {
            position: [x, y],
        });
        expect(arrow.X.x).toBe(x);
        expect(arrow.X.y).toBe(y);
        const viewee = viewDOM.downcast(arrow.viewee());
        expect(viewee.name).toBe("path");
        // FIXME: null would be more consistent with the DOM.
        expect(viewee.getAttribute("id")).toBe(null);

        arrow.id = "P";
        expect(arrow.id).toBe("P");
        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    // FIXME: Why do we have 4 NaN?
                    // expect(viewee.getAttribute('transform')).toBe('matrix(1 0 0 1 3 2)');
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("circle", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const circle = board.circle({
            position: [x, y],
        });
        expect(circle.X.x).toBe(x);
        expect(circle.X.y).toBe(y);
        const viewee = viewDOM.downcast(circle.viewee());
        expect(viewee.name).toBe("path");
        // FIXME: null would be more consistent with the DOM.
        expect(viewee.getAttribute("id")).toBe(null);

        circle.id = "P";
        expect(circle.id).toBe("P");
        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    // FIXME: Why do we have 4 NaN?
                    // expect(viewee.getAttribute('transform')).toBe('matrix(1 0 0 1 3 2)');
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("ellipse", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const ellipse = board.ellipse({
            position: [x, y],
        });
        expect(ellipse.X.x).toBe(x);
        expect(ellipse.X.y).toBe(y);
        const viewee = viewDOM.downcast(ellipse.viewee());
        expect(viewee.name).toBe("path");

        expect(viewee.getAttribute("id")).toBe(null);
        ellipse.id = "P";
        expect(ellipse.id).toBe("P");

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    // FIXME: Why do we have 4 NaN?
                    expect(viewee.getAttribute("transform")).toBe("matrix(1 0 0 1 3 2)");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("group", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const group: Shape = new Group(board, [], {
            position: [x, y],
        });
        expect(group.X.x).toBe(x);
        expect(group.X.y).toBe(y);
        // We must add the Group to the Board to get a viewee.
        board.add(group);
        const viewee = viewDOM.downcast(group.viewee());
        expect(viewee.name).toBe("g");
        // FIXME: null would be more consistent with the DOM.
        // expect(viewee.getAttribute('id')).toBe(null);

        group.id = "P";
        expect(group.id).toBe("P");
        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    // FIXME: Why do we have 4 NaN?
                    // expect(viewee.getAttribute('transform')).toBe('matrix(1 0 0 1 3 2)');
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("line", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const L = board.line([0, 0], [1, 0], {
            position: [x, y],
        });
        expect(L.X.x).toBe(x);
        expect(L.X.y).toBe(y);

        const viewee = viewDOM.downcast(L.viewee());
        expect(viewee.name).toBe("path");
        expect(viewee.getAttribute("id")).toBe(null);
        expect(viewee.getAttribute("fill")).toBe("none");
        expect(viewee.getAttribute("stroke")).toBe("gray");
        expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
        expect(viewee.getAttribute("d")).toBe("M 0 0 L 0 1");

        L.id = "P";
        expect(L.id).toBe("P");

        expect(L.cap).toBe("butt");
        L.cap = "square";
        expect(L.cap).toBe("square");

        expect(L.join).toBe("miter");
        L.join = "round";
        expect(L.join).toBe("round");

        expect(L.miterLimit).toBe(4);
        L.miterLimit = 7;
        expect(L.miterLimit).toBe(7);

        L.center();

        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M 1 -1.5 L 1 -0.5");
                    expect(viewee.getAttribute("stroke-linecap")).toBe("square");
                    expect(viewee.getAttribute("stroke-linejoin")).toBe("round");
                    expect(viewee.getAttribute("stroke-miterlimit")).toBe("7");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    expect(viewee.getAttribute("transform")).toBe("matrix(1 0 0 1 3 2)");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }, 1000);
        });
    });
    it("path", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const path = board.path(
            true,
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
            ],
            {
                position: [x, y],
            }
        );
        expect(path.X.x).toBe(x);
        expect(path.X.y).toBe(y);

        const viewee = viewDOM.downcast(path.viewee());
        expect(viewee.name).toBe("path");
        expect(viewee.getAttribute("id")).toBe(null);
        expect(viewee.getAttribute("fill")).toBe("none");
        expect(viewee.getAttribute("stroke")).toBe("gray");
        expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
        expect(viewee.getAttribute("d")).toBe("M 0 0 L 0 1 L 1 1 L 1 0 Z");

        path.id = "P";
        expect(path.id).toBe("P");

        expect(path.cap).toBe("butt");
        path.cap = "square";
        expect(path.cap).toBe("square");

        expect(path.join).toBe("miter");
        path.join = "round";
        expect(path.join).toBe("round");

        expect(path.miterLimit).toBe(4);
        path.miterLimit = 7;
        expect(path.miterLimit).toBe(7);

        path.center();

        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    expect(viewee.getAttribute("fill")).toBe("none");
                    expect(viewee.getAttribute("stroke")).toBe("gray");
                    expect(viewee.getAttribute("stroke-width")).toBe("0.009375");
                    expect(viewee.getAttribute("d")).toBe("M 0.5 -1.5 L 0.5 -0.5 L 1.5 -0.5 L 1.5 -1.5 Z");
                    expect(viewee.getAttribute("stroke-linecap")).toBe("square");
                    expect(viewee.getAttribute("stroke-linejoin")).toBe("round");
                    expect(viewee.getAttribute("stroke-miterlimit")).toBe("7");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    expect(viewee.getAttribute("transform")).toBe("matrix(1 0 0 1 3 2)");
                    resolve();
                } catch (e) {
                    reject(e);
                }
            }, 1000);
        });
    });
    it("point", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const P: Shape = board.point([x, y]);
        expect(P.X.x).toBe(x);
        expect(P.X.y).toBe(y);
        const viewee = viewDOM.downcast(P.viewee());
        expect(viewee.name).toBe("g");
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
    it("polygon", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const polygon = board.polygon([], {
            position: [x, y],
        });
        expect(polygon.X.x).toBe(x);
        expect(polygon.X.y).toBe(y);
        const viewee = viewDOM.downcast(polygon.viewee());
        expect(viewee.name).toBe("path");
        expect(viewee.getAttribute("id")).toBe(null);

        polygon.id = "P";
        expect(polygon.id).toBe("P");
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
    it("rectangle", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const rectangle = board.rectangle({
            position: [x, y],
        });
        expect(rectangle.X.x).toBe(x);
        expect(rectangle.X.y).toBe(y);
        const viewee = viewDOM.downcast(rectangle.viewee());
        expect(viewee.name).toBe("path");
        expect(viewee.getAttribute("id")).toBe(null);

        rectangle.id = "P";
        expect(rectangle.id).toBe("P");
        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    expect(viewee.getAttribute("transform")).toBe("matrix(1 0 0 1 3 2)");
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("text", function () {
        expect(typeof GraphicsBoard === "function").toBe(true);

        const element = new MockElement("div");

        const viewDOM = new MockViewDOM();
        const board = initBoard(element, {
            boundingBox: { left: -1, top: 1, right: 1, bottom: -1 },
        });

        expect(board.goofy).toBe(false);
        expect(board.crazy).toBe(false);

        const x = 2;
        const y = 3;
        const text = board.text("Hello, World!", {
            position: [x, y],
        });
        expect(text.X.x).toBe(x);
        expect(text.X.y).toBe(y);
        const viewee = viewDOM.downcast(text.viewee());
        expect(viewee.name).toBe("text");
        // FIXME: null would be more consistent with the DOM.
        // expect(viewee.getAttribute('id')).toBe(null);

        text.id = "P";
        expect(text.id).toBe("P");
        // Effects run in microtasks so we have to give them chance to complete.
        // https://jestjs.io/docs/asynchronous
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    expect(viewee.getAttribute("id")).toBe("P");
                    // Note that the matrix depends upon whether the board is goofy or crazy.
                    // FIXME: Why do we have 4 NaN?
                    // expect(viewee.getAttribute('transform')).toBe('matrix(1 0 0 1 3 2)');
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
