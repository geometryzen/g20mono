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

export class Defaults {
    readonly arc: Pick<ArcSegmentOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly arrow: Pick<ArrowOptions, "fillColor" | "fillOpacity" | "headAngle" | "headLength" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly circle: Pick<CircleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly ellipse: Pick<EllipseOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly line: Pick<LineOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly point: Pick<PointOptions, "iconColor" | "iconOpacity" | "hideIcon" | "iconKind" | "textColor" | "textOpacity" | "strokeWidth"> = {};
    readonly polygon: Pick<PolygonOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly rectangle: Pick<RectangleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly text: Pick<TextOptions, "fillColor" | "fillOpacity" | "fontFamily" | "fontSize" | "strokeColor" | "strokeOpacity"> = {};
    constructor() {
        this.reset();
    }
    reset(): void {
        this.arc.fillColor = "none";
        this.arc.fillOpacity = null;
        this.arc.strokeColor = "gray";
        this.arc.strokeOpacity = null;
        this.arc.strokeWidth = null;

        this.arrow.fillColor = "none";
        this.arrow.fillOpacity = null;
        this.arrow.headAngle = headAngle;
        this.arrow.headLength = 0.05;
        this.arrow.strokeColor = "gray";
        this.arrow.strokeOpacity = null;
        this.arrow.strokeWidth = null;

        this.circle.fillColor = "none";
        this.circle.fillOpacity = null;
        this.circle.strokeColor = "gray";
        this.circle.strokeOpacity = null;
        this.circle.strokeWidth = null;

        this.ellipse.fillColor = "none";
        this.ellipse.fillOpacity = null;
        this.ellipse.strokeColor = "gray";
        this.ellipse.strokeOpacity = null;
        this.ellipse.strokeWidth = null;

        this.line.fillColor = "none";
        this.line.fillOpacity = null;
        this.line.strokeColor = "gray";
        this.line.strokeOpacity = null;
        this.line.strokeWidth = null;

        this.point.iconColor = "gray";
        this.point.iconOpacity = null;
        this.point.iconKind = "ellipse";
        this.point.textColor = "gray";
        this.point.textOpacity = null;
        this.point.strokeWidth = null;

        this.polygon.fillColor = "none";
        this.polygon.fillOpacity = null;
        this.polygon.strokeColor = "gray";
        this.polygon.strokeOpacity = null;
        this.polygon.strokeWidth = null;

        this.rectangle.fillColor = "none";
        this.rectangle.fillOpacity = null;
        this.rectangle.strokeColor = "gray";
        this.rectangle.strokeOpacity = null;
        this.rectangle.strokeWidth = null;

        this.text.fillColor = "gray";
        this.text.fillOpacity = null;
        this.text.fontFamily = "sans-serif";
        this.text.fontSize = 20;
        this.text.strokeColor = "gray";
        this.text.strokeOpacity = null;
    }
}
