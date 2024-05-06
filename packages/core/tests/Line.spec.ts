import {
    Anchor,
    ArcSegment,
    Arrow,
    ArrowOptions,
    Board,
    Circle,
    CircleOptions,
    Ellipse,
    EllipseOptions,
    Group,
    Line,
    LineOptions,
    Path,
    PathOptions,
    PointOptions,
    Polygon,
    PolygonOptions,
    Rectangle,
    RectangleOptions,
    Shape,
    Text,
    TextOptions,
    VectorLike
} from "../src/index";

class MockBoard implements Board {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    arc(innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, resolution?: number): ArcSegment {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    arrow(axis: VectorLike, options?: ArrowOptions): Arrow {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    circle(options?: CircleOptions): Circle {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    curve(closed: boolean, points: Anchor[], options?: PathOptions): Path {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ellipse(options?: EllipseOptions): Ellipse {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    line(point1: VectorLike, point2: VectorLike, options?: LineOptions): Line {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    path(closed: boolean, points: Anchor[], options?: PathOptions): Path {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    point(position: VectorLike, options?: PointOptions): Shape {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    polygon(points: VectorLike[], options?: PolygonOptions): Polygon {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rectangle(options?: RectangleOptions): Rectangle {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    text(message: string, options?: TextOptions): Text {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add(...shapes: Shape[]): this {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    remove(...shapes: Shape[]): this {
        throw new Error("Method not implemented.");
    }
    getBoundingBox(): { left: number; top: number; right: number; bottom: number; } {
        return { left: -1, top: 1, right: 1, bottom: -1 };
    }
    update(): void {
        throw new Error("Method not implemented.");
    }
    get crazy(): boolean {
        return false;
    }
    get goofy(): boolean {
        return false;
    }
    get frameCount(): number {
        throw new Error("Method not implemented.");
    }
    get scene(): Group {
        throw new Error("Method not implemented.");
    }
    get width(): number {
        return 500;
    }
    get height(): number {
        return 500;
    }
    get sx(): number {
        return 250;
    }
    get sy(): number {
        return 250;
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }
}

describe("Line", function () {
    it("constructor", function () {
        const board = new MockBoard();
        const x1 = Math.random();
        const y1 = Math.random();
        const x2 = Math.random();
        const y2 = Math.random();
        const line = new Line(board, [x1, y1], [x2, y2], { id: 'line' });
        expect(line.id).toBe('line');

        // The vertices on the zzz property are computed from the vertices defined in the Line (Path).
        const vertices = line.zzz.vertices;
        expect(vertices.length).toBe(2);
        {
            const vertex1 = vertices[0];
            const vertex2 = vertices[1];

            expect(vertex1.origin.x).toBe(x1);
            expect(vertex1.origin.y).toBe(y1);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(x2);
            expect(vertex2.origin.y).toBe(y2);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);
        }

        const point1 = line.point1;
        point1.origin.set(2, 3);
        {
            expect(vertices.length).toBe(2);
            const vertex1 = vertices[0];
            const vertex2 = vertices[1];

            expect(vertex1.origin.x).toBe(2);
            expect(vertex1.origin.y).toBe(3);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(x2);
            expect(vertex2.origin.y).toBe(y2);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);
        }

        const point2 = line.point2;
        point2.origin.set(5, 7);
        {
            expect(vertices.length).toBe(2);
            const vertex1 = vertices[0];
            const vertex2 = vertices[1];

            expect(vertex1.origin.x).toBe(2);
            expect(vertex1.origin.y).toBe(3);
            expect(vertex1.origin.a).toBe(0);
            expect(vertex1.origin.b).toBe(0);

            expect(vertex2.origin.x).toBe(5);
            expect(vertex2.origin.y).toBe(7);
            expect(vertex2.origin.a).toBe(0);
            expect(vertex2.origin.b).toBe(0);
        }
    });
});