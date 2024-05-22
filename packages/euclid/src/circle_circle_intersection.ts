import { Disposable, dispose, G20 } from "@g20/core";

/**
 * The vector from the center of circleA to the center of circleB.
 */
const D: G20 = G20.vector(0, 0);

export interface CircleProperties {
    get X(): G20;
    get radius(): G20;
}

export function circle_circle_intersection(circleA: CircleProperties, circleB: CircleProperties): [point1: G20, point2: G20, disposable: Disposable] {
    const point1 = G20.zero.clone();
    const point2 = G20.zero.clone();
    const disposables: Disposable[] = [];
    let enabled = false;
    const calculate = () => {
        if (enabled) {
            update_circle_crcle_intersection_points(point1, point2, circleA.X, circleB.X, circleA.radius.a, circleB.radius.a);
        }
    };
    disposables.push(circleA.X.change$.subscribe(calculate));
    disposables.push(circleB.X.change$.subscribe(calculate));
    disposables.push(circleA.radius.change$.subscribe(calculate));
    disposables.push(circleB.radius.change$.subscribe(calculate));
    enabled = true;
    calculate();
    const disposable: Disposable = {
        dispose(): void {
            dispose(disposables);
        }
    };
    return [point1, point2, disposable];
}

function update_circle_crcle_intersection_points(point1: G20, point2: G20, ca: G20, cb: G20, R: number, r: number): void {
    if (R !== -1 && r !== -1) {
        D.copyVector(cb).sub(ca);
        const dd = D.quaditude();
        const rr = r * r;
        const RR = R * R;
        const d = Math.sqrt(dd);
        const λ = (dd - rr + RR) / (2 * d);
        const aa = RR - λ * λ;
        if (aa >= 0) {
            const a = Math.sqrt(aa);
            const dhat = D.clone().scale(1 / d);
            const ahat = dhat.clone().mul(G20.I);
            const λdhat = dhat.clone().scale(λ);
            const avec = ahat.clone().scale(a);
            point1.copyVector(ca).add(λdhat).add(avec);
            point2.copyVector(ca).add(λdhat).sub(avec);
        } else {
            // No intersection
            point1.set(NaN, NaN);
            point2.set(NaN, NaN);
        }
    }
}
