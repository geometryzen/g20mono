import { G20 } from "@g20/core";
import { circle_circle_intersection } from "../src/index";

class MockCircle {
    readonly X = G20.zero.clone();
    readonly radius = G20.one.clone();
}

test("circle_circle_intersection", function () {
    expect(typeof circle_circle_intersection === "function").toBe(true);
    const circleA = new MockCircle();
    circleA.X.set(-0.5, 0);
    const circleB = new MockCircle();
    circleB.X.set(+0.5, 0);
    const [point1, point2, disposable] = circle_circle_intersection(circleA, circleB);
    expect(point1.x).toBe(0);
    expect(point1.y).toBe(+Math.sqrt(0.75));
    expect(point2.x).toBe(0);
    expect(point2.y).toBe(-Math.sqrt(0.75));

    disposable.dispose();
});
