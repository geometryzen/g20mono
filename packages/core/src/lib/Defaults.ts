import { Board } from "./Board";
import { ArcSegmentOptions } from "./shapes/ArcSegment";
import { ArrowOptions } from "./shapes/Arrow";
import { CircleOptions } from "./shapes/Circle";
import { EllipseOptions } from "./shapes/Ellipse";
import { LineOptions } from "./shapes/Line";
import { PointOptions } from "./shapes/Point";
import { PolygonOptions } from "./shapes/Polygon";
import { RectangleOptions } from "./shapes/Rectangle";
import { TextOptions } from "./Text";

// This angle gives an arrow head that is an equilateral triangle.
// const φ = Math.PI / 6;
// This design gives an arrow head that fits into a golden ratio box.
const golden = (1 + Math.sqrt(5)) / 2;
const headAngle = Math.atan2(0.5, golden);

export const STROKE_WIDTH_THIN_PIXELS = 2;
export const STROKE_WIDTH_MEDIUM_PIXELS = 3;
// export const STROKE_WIDTH_THICK_PIXELS = 4;

export class Defaults {
    readonly arc: Pick<ArcSegmentOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly arrow: Pick<ArrowOptions, "fillColor" | "fillOpacity" | "headAngle" | "headLength" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly circle: Pick<CircleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly ellipse: Pick<EllipseOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly line: Pick<LineOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly point: Pick<PointOptions, "iconColor" | "iconOpacity" | "hideIcon" | "iconKind" | "textColor" | "textOpacity" | "strokeWidth"> = {};
    readonly polygon: Pick<PolygonOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly rectangle: Pick<RectangleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly text: Pick<TextOptions, "fillColor" | "fillOpacity" | "fontFamily" | "fontSize"> = {};
    constructor(readonly board: Board) {
        // Note: We must be careful not to try to access the board before it has been initialized.
    }
    reset(): void {
        this.arc.fillColor = "none";
        this.arc.fillOpacity = null;
        this.arc.strokeColor = "gray";
        this.arc.strokeOpacity = null;
        this.arc.strokeWidth = STROKE_WIDTH_MEDIUM_PIXELS / this.board.sx;

        this.arrow.fillColor = "none";
        this.arrow.fillOpacity = null;
        this.arrow.headAngle = headAngle;
        this.arrow.headLength = 0.05;
        this.arrow.strokeColor = "gray";
        this.arrow.strokeOpacity = null;
        this.arrow.strokeWidth = STROKE_WIDTH_MEDIUM_PIXELS / this.board.sx;

        this.circle.fillColor = "none";
        this.circle.fillOpacity = null;
        this.circle.strokeColor = "gray";
        this.circle.strokeOpacity = null;
        this.circle.strokeWidth = STROKE_WIDTH_MEDIUM_PIXELS / this.board.sx;

        this.ellipse.fillColor = "none";
        this.ellipse.fillOpacity = null;
        this.ellipse.strokeColor = "gray";
        this.ellipse.strokeOpacity = null;
        this.ellipse.strokeWidth = STROKE_WIDTH_MEDIUM_PIXELS / this.board.sx;

        this.line.fillColor = "none";
        this.line.fillOpacity = null;
        this.line.strokeColor = "gray";
        this.line.strokeOpacity = 0.6;
        this.line.strokeWidth = STROKE_WIDTH_THIN_PIXELS / this.board.sx;

        this.point.iconColor = "gray";
        this.point.iconOpacity = null;
        this.point.iconKind = "ellipse";
        this.point.textColor = "gray";
        this.point.textOpacity = null;
        this.point.strokeWidth = STROKE_WIDTH_THIN_PIXELS / this.board.sx;

        this.polygon.fillColor = "none";
        this.polygon.fillOpacity = null;
        this.polygon.strokeColor = "gray";
        this.polygon.strokeOpacity = null;
        this.polygon.strokeWidth = STROKE_WIDTH_MEDIUM_PIXELS / this.board.sx;

        this.rectangle.fillColor = "none";
        this.rectangle.fillOpacity = null;
        this.rectangle.strokeColor = "gray";
        this.rectangle.strokeOpacity = null;
        this.rectangle.strokeWidth = STROKE_WIDTH_MEDIUM_PIXELS / this.board.sx;

        this.text.fillColor = "gray";
        this.text.fillOpacity = null;
        this.text.fontFamily = "sans-serif";
        this.text.fontSize = 20;
    }
}
