import { CircleProperties, Color, G20, variable } from "g2o";
import { CircleCircleIntersection } from "../src/index";

class MockCircle implements CircleProperties {
    readonly X = G20.zero.clone();
    readonly R = G20.one.clone();
    readonly #radius = variable(1);
    radius$ = this.#radius.asObservable();
    position: G20;
    attitude: G20;
    fill: Color;
    fillOpacity: number;
    stroke: Color;
    strokeOpacity: number;
    strokeWidth: number;
    constructor() {

    }
    get radius() {
        return this.#radius.get();
    }
}

test("index", function () {
    expect(typeof CircleCircleIntersection === 'function').toBe(true);
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
