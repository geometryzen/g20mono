import { G20 } from "@g20/core";
import { CircleCircleIntersection, circle_circle_intersection } from "../src/index";

class MockCircle {
    readonly X = G20.zero.clone();
    readonly radius = G20.one.clone();
}

test("intersection", function () {
    expect(typeof CircleCircleIntersection === "function").toBe(true);
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

test("index", function () {
    expect(typeof circle_circle_intersection === "function").toBe(true);
    const circleA = new MockCircle();
    circleA.X.set(-0.5, 0);
    const circleB = new MockCircle();
    circleB.X.set(+0.5, 0);
    const ci = new CircleCircleIntersection(circleA, circleB);
    const points = ci.points;
    expect(points.length).toBe(2);
    const point1 = points[0];
    expect(point1.x).toBe(0);
    expect(point1.y).toBe(+Math.sqrt(0.75));
    const point2 = points[1];
    expect(point2.x).toBe(0);
    expect(point2.y).toBe(-Math.sqrt(0.75));
});
