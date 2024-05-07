import { Board } from "../Board";

export const STROKE_WIDTH_OPEN_PATH_PIXELS = 3;
export const STROKE_WIDTH_CLOSED_PATH_PIXELS = 3;

export function default_stroke_width(strokeWidth: number, defaultValue: number): number {
    if (typeof strokeWidth === 'number') {
        return strokeWidth;
    }
    else {
        return defaultValue;
    }
}

export function default_closed_path_stroke_width(strokeWidth: number, owner: Board): number {
    if (typeof strokeWidth === 'number') {
        return strokeWidth;
    }
    else {
        return STROKE_WIDTH_CLOSED_PATH_PIXELS / owner.sx;
    }
}

export function default_open_path_stroke_width(strokeWidth: number, owner: Board): number {
    if (typeof strokeWidth === 'number') {
        return strokeWidth;
    }
    else {
        return STROKE_WIDTH_OPEN_PATH_PIXELS / owner.sx;
    }
}