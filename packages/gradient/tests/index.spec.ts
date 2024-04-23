import { LinearGradient, RadialGradient, Stop } from "../src/index";

test("LinearGradient", function () {
    expect(typeof LinearGradient === 'function').toBe(true);
});
test("RadialGradient", function () {
    expect(typeof RadialGradient === 'function').toBe(true);
});
test("Stop", function () {
    expect(typeof Stop === 'function').toBe(true);
});
