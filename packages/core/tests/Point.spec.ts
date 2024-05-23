import { Ellipse, Text } from "../src";
import { Point } from "../src/lib/shapes/Point";
import { MockViewDOM } from "./dom";
import { initBoard } from "./initBoard";
import { MockElement } from "./nodes";

describe("Point", function () {
    it("constructor", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const point = new Point(board, [0, 0]);
        board.add(point);
        expect(point.id).toBe(null);
        expect(point.icon.id).toBe(null);
        // expect(point.text.id).toBe(null);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(point.zzz.viewee);
                    expect(viewee.name).toBe("g");
                    expect(viewee.getAttributeNames()).toStrictEqual([]);

                    const children = point.children;
                    expect(children.length).toBe(1);

                    const icon = children[0] as Ellipse;
                    expect(icon instanceof Ellipse).toBe(true);
                    const iconview = viewDOM.downcast(icon.zzz.viewee);
                    expect(iconview.name).toBe("path");
                    expect(iconview.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(iconview.getAttribute("d")).toBe(
                        "M 0 0.0125 C 0.009204 0.0125 0.016666 0.006903 0.016666 0 C 0.016666 -0.006904 0.009204 -0.0125 0 -0.0125 C -0.009205 -0.012501 -0.016667 -0.006904 -0.016667 -0.000001 C -0.016667 0.006903 -0.009205 0.0125 0 0.0125 Z"
                    );
                    expect(iconview.getAttribute("fill")).toBe("gray");
                    expect(iconview.getAttribute("stroke")).toBe("gray");
                    expect(iconview.getAttribute("stroke-width")).toBe("0.009375");
                    /*
                    const text = children[1] as Text;
                    expect(text instanceof Text).toBe(true);
                    const textview = viewDOM.downcast(text.zzz.viewee);
                    expect(textview.name).toBe("text");
                    expect(textview.getAttributeNames()).toStrictEqual(["fill", "font-family", "font-size", "id", "transform"]);
                    expect(textview.getAttribute("fill")).toBe("gray");
                    expect(textview.getAttribute("font-family")).toBe("sans-serif");
                    expect(textview.getAttribute("font-size")).toBe("20");
                    expect(textview.getAttribute("id")).toBe("point-text");
                    expect(textview.getAttribute("transform")).toBe("matrix(0 0.003124 -0.004167 0 0 0)");
                        */
                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    it("constructor with text", function () {
        const element = new MockElement("div");
        const board = initBoard(element);
        const point = new Point(board, [0, 0], { text: "Lorem ipsum..." });
        board.add(point);
        expect(point.id).toBe(null);
        expect(point.icon.id).toBe(null);
        expect(point.text.id).toBe(null);

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(point.zzz.viewee);
                    expect(viewee.name).toBe("g");
                    expect(viewee.getAttributeNames()).toStrictEqual([]);

                    const children = point.children;
                    expect(children.length).toBe(2);

                    const icon = children[0] as Ellipse;
                    expect(icon instanceof Ellipse).toBe(true);
                    const iconview = viewDOM.downcast(icon.zzz.viewee);
                    expect(iconview.name).toBe("path");
                    expect(iconview.getAttributeNames()).toStrictEqual(["d", "fill", "stroke", "stroke-width"]);
                    expect(iconview.getAttribute("d")).toBe(
                        "M 0 0.0125 C 0.009204 0.0125 0.016666 0.006903 0.016666 0 C 0.016666 -0.006904 0.009204 -0.0125 0 -0.0125 C -0.009205 -0.012501 -0.016667 -0.006904 -0.016667 -0.000001 C -0.016667 0.006903 -0.009205 0.0125 0 0.0125 Z"
                    );
                    expect(iconview.getAttribute("fill")).toBe("gray");
                    expect(iconview.getAttribute("stroke")).toBe("gray");
                    expect(iconview.getAttribute("stroke-width")).toBe("0.009375");

                    const text = children[1] as Text;
                    expect(text instanceof Text).toBe(true);
                    const textview = viewDOM.downcast(text.zzz.viewee);
                    expect(textview.name).toBe("text");
                    expect(textview.getAttributeNames()).toStrictEqual(["fill", "font-family", "font-size", "transform"]);
                    expect(textview.getAttribute("fill")).toBe("gray");
                    expect(textview.getAttribute("font-family")).toBe("sans-serif");
                    expect(textview.getAttribute("font-size")).toBe("20");
                    expect(textview.getAttribute("transform")).toBe("matrix(0 0.003124 -0.004167 0 0 0)");

                    expect(textview.children.length).toBe(1);
                    const textContent = textview.textContent;
                    expect(textContent).toBe("Lorem ipsum...");

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
        const point = new Point(board, [0.5, 0.5], { id: "point", text: "Lorem ipsum..." });
        board.add(point);
        expect(point.id).toBe("point");
        expect(point.icon.id).toBe("point-icon");
        expect(point.text instanceof Text).toBe(true);
        expect(point.text.id).toBe("point-text");

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                try {
                    const viewDOM = new MockViewDOM();
                    const viewee = viewDOM.downcast(point.zzz.viewee);
                    expect(viewee.name).toBe("g");
                    expect(viewee.getAttributeNames()).toStrictEqual(["id", "transform"]);
                    expect(viewee.getAttribute("id")).toBe("point");
                    expect(viewee.getAttribute("transform")).toBe("matrix(1 0 0 1 0.5 0.5)");

                    const children = point.children;
                    expect(children.length).toBe(2);

                    const icon = point.getById("point-icon") as Ellipse;
                    expect(icon instanceof Ellipse).toBe(true);
                    const iconview = viewDOM.downcast(icon.zzz.viewee);
                    expect(iconview.name).toBe("path");
                    expect(iconview.getAttributeNames()).toStrictEqual(["d", "fill", "id", "stroke", "stroke-width"]);
                    expect(iconview.getAttribute("d")).toBe(
                        "M 0 0.0125 C 0.009204 0.0125 0.016666 0.006903 0.016666 0 C 0.016666 -0.006904 0.009204 -0.0125 0 -0.0125 C -0.009205 -0.012501 -0.016667 -0.006904 -0.016667 -0.000001 C -0.016667 0.006903 -0.009205 0.0125 0 0.0125 Z"
                    );
                    expect(iconview.getAttribute("fill")).toBe("gray");
                    expect(iconview.getAttribute("id")).toBe("point-icon");
                    expect(iconview.getAttribute("stroke")).toBe("gray");
                    expect(iconview.getAttribute("stroke-width")).toBe("0.009375");

                    const text = point.getById("point-text") as Text;
                    expect(text instanceof Text).toBe(true);
                    const textview = viewDOM.downcast(text.zzz.viewee);
                    expect(textview.name).toBe("text");
                    expect(textview.getAttributeNames()).toStrictEqual(["fill", "font-family", "font-size", "id", "transform"]);
                    expect(textview.getAttribute("fill")).toBe("gray");
                    expect(textview.getAttribute("font-family")).toBe("sans-serif");
                    expect(textview.getAttribute("font-size")).toBe("20");
                    expect(textview.getAttribute("id")).toBe("point-text");
                    expect(textview.getAttribute("transform")).toBe("matrix(0 0.003124 -0.004167 0 0 0)");

                    board.dispose();
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
});
