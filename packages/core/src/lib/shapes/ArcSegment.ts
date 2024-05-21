import { Anchor } from "../Anchor.js";
import { Board } from "../Board.js";
import { Collection } from "../collection.js";
import { Constants } from "../constants.js";
import { Color } from "../effects/ColorProvider.js";
import { G20 } from "../math/G20.js";
import { Path, PathOptions } from "../Path.js";
import { Disposable, dispose } from "../reactive/Disposable";
import { Commands } from "../utils/Commands.js";
import { default_color } from "../utils/default_color.js";
import { default_number } from "../utils/default_number.js";
import { default_closed_path_stroke_width } from "../utils/default_stroke_width.js";
import { HALF_PI, mod, TWO_PI } from "../utils/math.js";

export interface ArcSegmentOptions extends PathOptions {
    innerRadius?: number;
    outerRadius?: number;
    startAngle?: number;
    endAngle?: number;
    resolution?: number;
    id?: string;
    fillColor?: Color;
    fillOpacity?: number;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
}

export class ArcSegment extends Path {
    readonly #disposables: Disposable[] = [];
    readonly #startAngle = G20.scalar(0);
    readonly #endAngle = G20.scalar(TWO_PI);
    readonly #innerRadius = G20.scalar(0);
    readonly #outerRadius = G20.scalar(0);

    constructor(owner: Board, options: ArcSegmentOptions = {}) {
        const N = options.resolution ? options.resolution : Constants.Resolution * 3;
        const points: Anchor[] = [];
        for (let i = 0; i < N; i++) {
            points.push(new Anchor(G20.vector(0, 0)));
        }

        super(owner, points, true, false, true, path_options_from_arc_options(options, owner));

        const ir = options.innerRadius;
        if (typeof ir === "number") {
            this.innerRadius = ir;
        }

        const or = options.outerRadius;
        if (typeof or === "number") {
            this.outerRadius = or;
        }

        const sa = options.startAngle;
        if (typeof sa === "number") {
            this.startAngle = sa;
        }

        const ea = options.endAngle;
        if (typeof ea === "number") {
            this.endAngle = ea;
        }

        let enabled = false;

        this.#disposables.push(
            this.#innerRadius.change$.subscribe(() => {
                if (enabled) {
                    this.update();
                }
            })
        );

        this.#disposables.push(
            this.#outerRadius.change$.subscribe(() => {
                if (enabled) {
                    this.update();
                }
            })
        );

        this.#disposables.push(
            this.#startAngle.change$.subscribe(() => {
                if (enabled) {
                    this.update();
                }
            })
        );

        this.#disposables.push(
            this.#endAngle.change$.subscribe(() => {
                if (enabled) {
                    this.update();
                }
            })
        );

        enabled = true;

        this.update();
    }

    override dispose(): void {
        dispose(this.#disposables);
        super.dispose();
    }

    override update() {
        update_arc_vertices(this.innerRadius, this.outerRadius, this.startAngle, this.endAngle, this.vertices);
        super.update();
        return this;
    }

    get startAngle(): number {
        return this.#startAngle.a;
    }
    set startAngle(startAngle: number) {
        this.#startAngle.set(0, 0, startAngle, 0);
    }
    get endAngle(): number {
        return this.#endAngle.a;
    }
    set endAngle(endAngle: number) {
        this.#endAngle.set(0, 0, endAngle, 0);
    }
    get innerRadius(): number {
        return this.#innerRadius.a;
    }
    set innerRadius(innerRadius: number) {
        this.#innerRadius.set(0, 0, innerRadius, 0);
    }
    get outerRadius(): number {
        return this.#outerRadius.a;
    }
    set outerRadius(outerRadius: number) {
        this.#outerRadius.set(0, 0, outerRadius, 0);
    }
}

function path_options_from_arc_options(options: ArcSegmentOptions, owner: Board): PathOptions {
    const retval: PathOptions = {
        id: options.id,
        attitude: options.attitude,
        opacity: options.opacity,
        position: options.position,
        fillColor: default_color(options.fillColor, owner.defaults.arc.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.arc.fillOpacity),
        strokeColor: default_color(options.strokeColor, owner.defaults.arc.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.arc.strokeOpacity),
        strokeWidth: default_closed_path_stroke_width(default_number(options.strokeWidth, owner.defaults.arc.strokeWidth), owner),
        vectorEffect: options.vectorEffect,
        visibility: options.visibility,
    };
    return retval;
}

function update_arc_vertices(innerRadiues: number, outerRadius: number, startAngle: number, endAngle: number, vertices: Collection<Anchor>) {
    const connected = mod(startAngle, TWO_PI) === mod(endAngle, TWO_PI);
    const punctured = innerRadiues > 0;

    let length = punctured ? vertices.length / 2 : vertices.length;
    let id = 0;

    if (connected) {
        length--;
    } else if (!punctured) {
        length -= 2;
    }

    /**
     * Outer Circle
     */
    for (let i = 0, last = length - 1; i < length; i++) {
        const pct = i / last;
        const v = vertices.getAt(id);
        const theta = pct * (endAngle - startAngle) + startAngle;
        const step = (endAngle - startAngle) / length;

        const x = outerRadius * Math.cos(theta);
        const y = outerRadius * Math.sin(theta);

        v.command = i === 0 ? Commands.move : Commands.curve;
        v.x = x;
        v.y = y;
        v.controls.a.clear();
        v.controls.b.clear();

        if (v.command === Commands.curve) {
            const amp = (outerRadius * step) / Math.PI;
            v.controls.a.x = amp * Math.cos(theta - HALF_PI);
            v.controls.a.y = amp * Math.sin(theta - HALF_PI);
            v.controls.b.x = amp * Math.cos(theta + HALF_PI);
            v.controls.b.y = amp * Math.sin(theta + HALF_PI);
            if (i === 1) {
                v.controls.a.scale(2);
            }
            if (i === last) {
                v.controls.b.scale(2);
            }
        }

        id++;
    }

    if (punctured) {
        let last = 0;
        if (connected) {
            vertices.getAt(id).command = Commands.close;
            id++;
        } else {
            length--;
            last = length - 1;
        }

        /**
         * Inner Circle
         */
        for (let i = 0; i < length; i++) {
            const pct = i / last;
            const v = vertices.getAt(id);
            const theta = (1 - pct) * (endAngle - startAngle) + startAngle;
            const step = (endAngle - startAngle) / length;

            const x = innerRadiues * Math.cos(theta);
            const y = innerRadiues * Math.sin(theta);
            let command: "C" | "M" | "L" = Commands.curve;
            if (i <= 0) {
                command = connected ? Commands.move : Commands.line;
            }

            v.command = command;
            v.x = x;
            v.y = y;
            v.controls.a.clear();
            v.controls.b.clear();

            if (v.command === Commands.curve) {
                const amp = (innerRadiues * step) / Math.PI;
                v.controls.a.x = amp * Math.cos(theta + HALF_PI);
                v.controls.a.y = amp * Math.sin(theta + HALF_PI);
                v.controls.b.x = amp * Math.cos(theta - HALF_PI);
                v.controls.b.y = amp * Math.sin(theta - HALF_PI);
                if (i === 1) {
                    v.controls.a.scale(2);
                }
                if (i === last) {
                    v.controls.b.scale(2);
                }
            }

            id++;
        }

        // Final Point
        vertices.getAt(id).copy(vertices.getAt(0));
        vertices.getAt(id).command = Commands.line;
    } else if (!connected) {
        vertices.getAt(id).command = Commands.line;
        vertices.getAt(id).x = 0;
        vertices.getAt(id).y = 0;
        id++;

        // Final Point
        vertices.getAt(id).copy(vertices.getAt(0));
        vertices.getAt(id).command = Commands.line;
    }
}
