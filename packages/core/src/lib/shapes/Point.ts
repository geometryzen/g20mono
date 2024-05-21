import { Board } from "../Board";
import { Color } from "../effects/ColorProvider";
import { Group } from "../Group";
import { VectorLike } from "../math/G20";
import { Text, TextOptions } from "../Text";
import { default_color } from "../utils/default_color";
import { default_number } from "../utils/default_number";
import { default_string } from "../utils/default_string";
import { Ellipse, EllipseOptions } from "./Ellipse";
import { Rectangle, RectangleOptions } from "./Rectangle";

export interface PointOptions extends Pick<TextOptions, "anchor" | "baseline" | "dx" | "dy" | "fontFamily" | "fontSize"> {
    id?: string;
    fillColor?: Color;
    fillOpacity?: number;
    hideIcon?: boolean;
    iconKind?: "ellipse" | "rectangle";
    name?: string;
    strokeColor?: Color;
    strokeOpacity?: number;
    strokeWidth?: number;
    visibility?: "visible" | "hidden" | "collapse";
    withLabel?: boolean;
}

export class Point extends Group {
    constructor(owner: Board, position: VectorLike, options: PointOptions = {}) {
        super(owner, [], options);
        const { left, top, right, bottom } = owner.getBoundingBox();
        const sx = owner.width / Math.abs(right - left);
        const sy = owner.height / Math.abs(bottom - top);
        switch (iconKind(options, owner)) {
            case "rectangle": {
                const icon_options = rectangle_options_from_point_options(options, owner);
                if (typeof options.id === "string") {
                    icon_options.id = `${options.id}-icon`;
                }
                icon_options.width = 8 / sx;
                icon_options.height = 8 / sy;
                if (hideIcon(options, owner)) {
                    icon_options.visibility = "hidden";
                }
                const shape = new Rectangle(owner, icon_options);
                this.add(shape);
                break;
            }
            default: {
                const icon_options = ellipse_options_from_point_options(options, owner);
                if (typeof options.id === "string") {
                    icon_options.id = `${options.id}-icon`;
                }
                icon_options.rx = 4 / sx;
                icon_options.ry = 4 / sy;
                if (hideIcon(options, owner)) {
                    icon_options.visibility = "hidden";
                }
                const shape = new Ellipse(owner, icon_options);
                this.add(shape);
            }
        }
        if (should_add_label(options)) {
            const text_options: TextOptions = text_options_from_point_options(options, owner);
            if (typeof options.id === "string") {
                text_options.id = `${options.id}-text`;
            }
            const text = new Text(owner, options.name, text_options);
            this.add(text);
        }
        this.X = position;
    }
    get icon(): Ellipse | Rectangle {
        for (const child of this.children) {
            if (child instanceof Text) {
                // Ignore.
            } else if (child instanceof Ellipse) {
                return child;
            } else if (child instanceof Rectangle) {
                return child;
            }
        }
        /* istanbul ignore next */
        throw new Error();
    }
    get text(): Text {
        for (const child of this.children) {
            if (child instanceof Text) {
                return child;
            }
        }
        const text_options: TextOptions = text_options_from_point_options({}, this.board);
        if (typeof this.id === "string") {
            text_options.id = `${this.id}-text`;
        }
        const text = new Text(this.board, "", text_options);
        this.add(text);
        return text;
    }
}

function ellipse_options_from_point_options(options: PointOptions, owner: Board): EllipseOptions {
    const retval: EllipseOptions = {
        fillColor: default_color(options.fillColor, owner.defaults.point.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.point.fillOpacity),
        strokeColor: default_color(options.strokeColor, owner.defaults.point.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.point.strokeOpacity),
        strokeWidth: options.strokeWidth,
        visibility: options.visibility
    };
    return retval;
}

function rectangle_options_from_point_options(options: PointOptions, owner: Board): RectangleOptions {
    const retval: RectangleOptions = {
        fillColor: default_color(options.fillColor, owner.defaults.point.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.point.fillOpacity),
        strokeColor: default_color(options.strokeColor, owner.defaults.point.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.point.strokeOpacity),
        strokeWidth: options.strokeWidth,
        visibility: options.visibility
    };
    return retval;
}

function text_options_from_point_options(options: PointOptions, owner: Board): TextOptions {
    const retval: TextOptions = {
        anchor: options.anchor,
        baseline: options.baseline,
        dx: options.dx,
        dy: options.dy,
        fillColor: default_color(options.fillColor, owner.defaults.text.fillColor),
        fillOpacity: default_number(options.fillOpacity, owner.defaults.text.fillOpacity),
        fontFamily: default_string(options.fontFamily, owner.defaults.text.fontFamily),
        fontSize: default_number(options.fontSize, owner.defaults.text.fontSize),
        strokeColor: default_color(options.strokeColor, owner.defaults.text.strokeColor),
        strokeOpacity: default_number(options.strokeOpacity, owner.defaults.text.strokeOpacity),
        strokeWidth: options.strokeWidth,
        visibility: options.visibility
    };
    return retval;
}

function should_add_label(options: PointOptions): boolean {
    if (options.withLabel) {
        return true;
    } else {
        if (options.name) {
            return true;
        } else {
            return false;
        }
    }
}

function iconKind(options: PointOptions, owner: Board): "ellipse" | "rectangle" {
    if (options.iconKind) {
        return options.iconKind;
    } else {
        return owner.defaults.point.iconKind;
    }
}

function hideIcon(options: PointOptions, owner: Board): boolean {
    if (typeof options.hideIcon === "boolean") {
        return options.hideIcon;
    } else {
        return owner.defaults.point.hideIcon;
    }
}
