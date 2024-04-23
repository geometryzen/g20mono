import { Circle, Disposable, dispose, G20, variable } from "g2o";

/**
 * The following calculation is coordinate-free.
 * For a coordinate-based solution see
 * https://mathworld.wolfram.com/Circle-CircleIntersection.html#:~:text=Two%20circles%20may%20intersect%20in,known%20as%20the%20radical%20line. 
 */
export class CircleCircleIntersection implements Disposable {
    readonly #disposables: Disposable[] = [];
    /**
     * The points representing the intersection of the circles.
     */
    readonly points: G20[] = [];
    readonly #change = variable(0);
    /**
     * A monotonically increasing number that increments every time the points are re-computed.
     */
    readonly change$ = this.#change.asObservable();
    constructor(circleA: Circle, circleB: Circle) {
        const P1: G20 = G20.vector(0, 0);
        const P2: G20 = G20.vector(0, 0);
        const ca: G20 = G20.vector(0, 0);
        const cb: G20 = G20.vector(0, 0);
        /**
         * The vector from the center of circleA to the center of circleB.
         */
        const D: G20 = G20.vector(0, 0);
        let R: number = -1;
        let r: number = -1;
        const compute = () => {
            if (R !== -1 && r !== -1) {
                D.copy(cb).sub(ca);
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
                    P1.copy(ca).add(λdhat).add(avec);
                    P2.copy(ca).add(λdhat).sub(avec);
                    this.points[0] = P1;
                    this.points[1] = P2;
                }
                else {
                    this.points.length = 0;
                }
            }
        };
        this.#disposables.push(circleA.X.change$.subscribe(() => {
            ca.copy(circleA.X);
            cb.copy(circleB.X);
            R = circleA.radius;
            r = circleB.radius;
            compute();
            this.#change.set(this.#change.get() + 1);
        }));
        this.#disposables.push(circleB.X.change$.subscribe(() => {
            ca.copy(circleA.X);
            cb.copy(circleB.X);
            R = circleA.radius;
            r = circleB.radius;
            compute();
            this.#change.set(this.#change.get() + 1);
        }));
        this.#disposables.push(circleA.zzz.radius$.subscribe(() => {
            ca.copy(circleA.X);
            cb.copy(circleB.X);
            R = circleA.radius;
            r = circleB.radius;
            compute();
            this.#change.set(this.#change.get() + 1);
        }));
        this.#disposables.push(circleB.zzz.radius$.subscribe(() => {
            ca.copy(circleA.X);
            cb.copy(circleB.X);
            R = circleA.radius;
            r = circleB.radius;
            compute();
            this.#change.set(this.#change.get() + 1);
        }));
    }
    dispose(): void {
        dispose(this.#disposables);
    }
}