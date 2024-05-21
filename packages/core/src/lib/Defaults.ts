import { ArrowOptions } from "./shapes/Arrow";
import { CircleOptions } from "./shapes/Circle";
import { EllipseOptions } from "./shapes/Ellipse";
import { LineOptions } from "./shapes/Line";
import { PointOptions } from "./shapes/Point";
import { PolygonOptions } from "./shapes/Polygon";
import { RectangleOptions } from "./shapes/Rectangle";
import { TextOptions } from "./Text";

export class Defaults {
    readonly arrow: Pick<ArrowOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly circle: Pick<CircleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly ellipse: Pick<EllipseOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly line: Pick<LineOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly point: Pick<PointOptions, "fillColor" | "fillOpacity" | "hideIcon" | "iconKind" | "strokeColor" | "strokeOpacity"> = {};
    readonly polygon: Pick<PolygonOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly rectangle: Pick<RectangleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity" | "strokeWidth"> = {};
    readonly text: Pick<TextOptions, "fillColor" | "fillOpacity" | "fontFamily" | "fontSize" | "strokeColor" | "strokeOpacity"> = {};
    constructor() {
        this.reset();
    }
    reset(): void {
        this.arrow.fillColor = "none";
        this.arrow.fillOpacity = null;
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

        this.point.fillColor = "gray";
        this.point.fillOpacity = null;
        this.point.iconKind = "ellipse";
        this.point.strokeColor = "gray";
        this.point.strokeOpacity = null;

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
