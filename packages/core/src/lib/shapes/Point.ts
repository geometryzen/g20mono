import { Board } from "../Board";
import { Color } from "../effects/ColorProvider";
import { Group, GroupOptions } from "../Group";
import { G20, VectorLike } from "../math/G20";
import { Text, TextOptions } from "../Text";
import { default_color } from "../utils/default_color";
import { default_number } from "../utils/default_number";
import { default_string } from "../utils/default_string";
import { Ellipse, EllipseOptions } from "./Ellipse";
import { Rectangle, RectangleOptions } from "./Rectangle";

export interface PointOptions extends Pick<TextOptions, "anchor" | "baseline" | "dx" | "dy" | "fontFamily" | "fontSize"> {
    id?: string;
    hideIcon?: boolean;
    iconColor?: Color;
    iconKind?: "ellipse" | "rectangle";
    iconOpacity?: number;
    text?: string;
    textColor?: Color;
    textOpacity?: number;
    strokeWidth?: number;
    visibility?: "visible" | "hidden" | "collapse";
}

export class Point extends Group {
    constructor(owner: Board, position: VectorLike, options: PointOptions = {}) {
        super(owner, [], group_options_from_point_options(options, position));
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
        if (should_add_text(options)) {
            const text_options: TextOptions = text_options_from_point_options(options, owner);
            if (typeof options.id === "string") {
                text_options.id = `${options.id}-text`;
            }
            const text = new Text(owner, options.text, text_options);
            this.add(text);
        }
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
        // Lazily constructing the text node isn't helpful if it is not connected to the DOM.
        /* istanbul ignore next */
        throw new Error();
    }
}

function group_options_from_point_options(options: PointOptions, position: VectorLike): GroupOptions {
    const retval: GroupOptions = {
        id: options.id,
        attitude: G20.one.clone(),
        opacity: 1,
        plumb: false,
        position: position,
        sx: 1,
        sy: 1,
        visibility: options.visibility
    };
    return retval;
}

function ellipse_options_from_point_options(options: PointOptions, owner: Board): EllipseOptions {
    const retval: EllipseOptions = {
        fillColor: default_color(options.iconColor, owner.defaults.point.iconColor),
        fillOpacity: default_number(options.iconOpacity, owner.defaults.point.iconOpacity),
        strokeColor: default_color(options.iconColor, owner.defaults.point.iconColor),
        strokeOpacity: default_number(options.iconOpacity, owner.defaults.point.iconOpacity),
        strokeWidth: options.strokeWidth,
        visibility: options.visibility
    };
    return retval;
}

function rectangle_options_from_point_options(options: PointOptions, owner: Board): RectangleOptions {
    const retval: RectangleOptions = {
        fillColor: default_color(options.iconColor, owner.defaults.point.iconColor),
        fillOpacity: default_number(options.iconOpacity, owner.defaults.point.iconOpacity),
        strokeColor: default_color(options.iconColor, owner.defaults.point.iconColor),
        strokeOpacity: default_number(options.iconOpacity, owner.defaults.point.iconOpacity),
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
        fillColor: default_color(options.textColor, owner.defaults.point.textColor),
        fillOpacity: default_number(options.textOpacity, owner.defaults.point.textOpacity),
        fontFamily: default_string(options.fontFamily, owner.defaults.text.fontFamily),
        fontSize: default_number(options.fontSize, owner.defaults.text.fontSize),
        // strokeColor: default_color(options.textColor, owner.defaults.point.textColor),
        // strokeOpacity: default_number(options.textOpacity, owner.defaults.point.textOpacity),
        // strokeWidth: options.strokeWidth,
        visibility: options.visibility
    };
    return retval;
}

function should_add_text(options: PointOptions): boolean {
    if (typeof options.text === "string") {
        return true;
    } else {
        return false;
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
