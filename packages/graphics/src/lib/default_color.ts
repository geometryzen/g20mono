import { Color, is_color } from "@g20/core";

export function default_color(attributeValue: Color, defaultValue: Color): Color {
    if (is_color(attributeValue)) {
        return attributeValue;
    } else {
        return defaultValue;
    }
}
