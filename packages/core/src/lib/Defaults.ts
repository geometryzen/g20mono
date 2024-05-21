import { ArrowOptions } from "./shapes/Arrow";
import { CircleOptions } from "./shapes/Circle";
import { LineOptions } from "./shapes/Line";
import { PointOptions } from "./shapes/Point";
import { PolygonOptions } from "./shapes/Polygon";
import { RectangleOptions } from "./shapes/Rectangle";
import { TextOptions } from "./Text";

export class Defaults {
    readonly arrow: Pick<ArrowOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity"> = {};
    readonly circle: Pick<CircleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity"> = {};
    readonly line: Pick<LineOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity"> = {};
    readonly point: Pick<PointOptions, "fillColor" | "fillOpacity" | "iconKind" | "strokeColor" | "strokeOpacity"> = {};
    readonly polygon: Pick<PolygonOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity"> = {};
    readonly rectangle: Pick<RectangleOptions, "fillColor" | "fillOpacity" | "strokeColor" | "strokeOpacity"> = {};
    readonly text: Pick<TextOptions, "fillColor" | "fillOpacity" | "fontFamily" | "fontSize" | "strokeColor" | "strokeOpacity"> = {};
    constructor() {
        this.reset();
    }
    reset(): void {
        this.arrow.fillColor = "none";
        this.arrow.strokeColor = "gray";

        this.circle.fillColor = "none";
        this.circle.strokeColor = "gray";

        this.line.fillColor = "none";
        this.line.strokeColor = "gray";

        this.point.fillColor = "gray";
        this.point.fillOpacity = null;
        this.point.iconKind = "ellipse";
        this.point.strokeColor = "gray";
        this.point.strokeOpacity = null;

        this.polygon.fillColor = "none";
        this.polygon.strokeColor = "gray";

        this.rectangle.fillColor = "none";
        this.rectangle.strokeColor = "gray";

        this.text.fillColor = "gray";
        this.text.fontFamily = "sans-serif";
        this.text.fontSize = 20;
        this.text.strokeColor = "gray";
    }
}
