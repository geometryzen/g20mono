import { initMockBoard } from "../src/index";

test("index", function () {
    expect(typeof initMockBoard === "function").toBe(true);
});
