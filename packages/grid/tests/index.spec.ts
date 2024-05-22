import { Axes, Grid } from "../src/index";

test("index", function () {
    expect(typeof Grid === "function").toBe(true);
    expect(typeof Axes === "function").toBe(true);
});
