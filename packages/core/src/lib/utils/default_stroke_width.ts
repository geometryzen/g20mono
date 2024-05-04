export function default_stroke_width(strokeWidth: number, defaultValue: number): number {
    if (typeof strokeWidth === 'number') {
        return strokeWidth;
    }
    else {
        return defaultValue;
    }
}