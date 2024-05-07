import { initBoard } from "../src/index";

test("index", function () {
    expect(typeof initBoard === 'function').toBe(true);
});
