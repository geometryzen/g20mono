import { state } from "../src/index";

test("index", function () {
    expect(typeof state === 'function').toBe(true);
});
