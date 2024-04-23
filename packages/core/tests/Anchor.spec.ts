import { Anchor, G20 } from "../src/index";
import { Commands } from "../src/lib/utils/path-commands";

const booleans = [true, false];
const commands = [Commands.arc, Commands.close, Commands.curve, Commands.line, Commands.move];

function random<T>(xs: T[]): T {
    return xs[Math.floor(Math.random() * xs.length)];
}

describe("Anchor", function () {
    it("constructor", function () {
        const x = Math.random();
        const y = Math.random();
        const ax = Math.random();
        const ay = Math.random();
        const bx = Math.random();
        const by = Math.random();
        const command = random(commands);
        const anchor = new Anchor(G20.vector(x, y), command, ax, ay, bx, by);
        expect(anchor.x).toBe(x);
        expect(anchor.y).toBe(y);
        expect(anchor.controls.a.x).toBe(ax);
        expect(anchor.controls.a.y).toBe(ay);
        expect(anchor.controls.b.x).toBe(bx);
        expect(anchor.controls.b.y).toBe(by);
        expect(anchor.command).toBe(command);
        expect(anchor.largeArcFlag).toBe(0);
        expect(anchor.sweepFlag).toBe(1);
        expect(anchor.relative).toBe(true);
    });
    it("defaults", function () {
        const anchor = new Anchor(G20.vector(0, 0));
        expect(anchor.x).toBe(0);
        expect(anchor.y).toBe(0);
        expect(anchor.controls.a.x).toBe(0);
        expect(anchor.controls.a.y).toBe(0);
        expect(anchor.controls.b.x).toBe(0);
        expect(anchor.controls.b.y).toBe(0);
        expect(anchor.command).toBe('M');
        expect(anchor.largeArcFlag).toBe(0);
        expect(anchor.relative).toBe(true);
        expect(anchor.rx).toBe(0);
        expect(anchor.ry).toBe(0);
        expect(anchor.sweepFlag).toBe(1);
        expect(anchor.xAxisRotation).toBe(0);
    });
    it("copy", function () {
        const x = Math.random();
        const y = Math.random();
        const ax = Math.random();
        const ay = Math.random();
        const bx = Math.random();
        const by = Math.random();
        const command = random(commands);
        const original = new Anchor(G20.vector(x, y), command, ax, ay, bx, by);
        const anchor = new Anchor(G20.vector(0, 0));
        anchor.copy(original);
        expect(anchor.x).toBe(x);
        expect(anchor.y).toBe(y);
        expect(anchor.controls.a.x).toBe(ax);
        expect(anchor.controls.a.y).toBe(ay);
        expect(anchor.controls.b.x).toBe(bx);
        expect(anchor.controls.b.y).toBe(by);
        expect(anchor.command).toBe(command);
    });
    it("setters", function () {
        const x = Math.random();
        const y = Math.random();
        const ax = Math.random();
        const ay = Math.random();
        const bx = Math.random();
        const by = Math.random();
        const command = random(commands);
        const relative = random(booleans);
        const rx = Math.random();
        const ry = Math.random();
        const xAxisRotation = Math.random();
        const largeArcFlag = Math.random();
        const sweepFlag = Math.random();

        const anchor = new Anchor(G20.vector(0, 0));
        anchor.origin.set(x, y);
        anchor.controls.a.set(ax, ay);
        anchor.controls.b.set(bx, by);
        anchor.command = command;
        anchor.relative = relative;
        anchor.rx = rx;
        anchor.ry = ry;
        anchor.xAxisRotation = xAxisRotation;
        anchor.largeArcFlag = largeArcFlag;
        anchor.sweepFlag = sweepFlag;

        expect(anchor.x).toBe(x);
        expect(anchor.y).toBe(y);
        expect(anchor.controls.a.x).toBe(ax);
        expect(anchor.controls.a.y).toBe(ay);
        expect(anchor.controls.b.x).toBe(bx);
        expect(anchor.controls.b.y).toBe(by);
        expect(anchor.command).toBe(command);
        expect(anchor.relative).toBe(relative);
        expect(anchor.rx).toBe(rx);
        expect(anchor.ry).toBe(ry);
        expect(anchor.xAxisRotation).toBe(xAxisRotation);
        expect(anchor.largeArcFlag).toBe(largeArcFlag);
        expect(anchor.sweepFlag).toBe(sweepFlag);
    });
    it("setters without changes", function () {
        const x = Math.random();
        const y = Math.random();
        const ax = Math.random();
        const ay = Math.random();
        const bx = Math.random();
        const by = Math.random();
        const command = random(commands);
        const relative = random(booleans);

        const anchor = new Anchor(G20.vector(x, y), command, ax, ay, bx, by);
        const ditto = new Anchor(G20.vector(x, y), command, ax, ay, bx, by);
        anchor.origin.set(ditto.x, ditto.y);
        anchor.controls.a.set(ax, ay);
        anchor.controls.b.set(bx, by);
        anchor.command = command;
        anchor.relative = relative;
        anchor.rx = ditto.rx;
        anchor.ry = ditto.ry;
        anchor.xAxisRotation = ditto.xAxisRotation;
        anchor.largeArcFlag = ditto.largeArcFlag;
        anchor.sweepFlag = ditto.sweepFlag;

        // Now do it again.
        anchor.relative = relative;
        anchor.command = command;

        expect(anchor.x).toBe(x);
        expect(anchor.y).toBe(y);
        expect(anchor.controls.a.x).toBe(ax);
        expect(anchor.controls.a.y).toBe(ay);
        expect(anchor.controls.b.x).toBe(bx);
        expect(anchor.controls.b.y).toBe(by);
        expect(anchor.command).toBe(command);
        expect(anchor.relative).toBe(relative);
    });
});
