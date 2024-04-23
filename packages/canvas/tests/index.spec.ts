import { CanvasView, CanvasViewFactory } from "../src/index";

test("index", function () {
    expect(typeof CanvasViewFactory === 'function').toBe(true);
    expect(typeof CanvasView === 'function').toBe(true);
});
