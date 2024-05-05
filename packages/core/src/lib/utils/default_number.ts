export function default_number(value: number, defaultValue: number): number {
    if (typeof value === 'number') {
        return value;
    }
    else {
        return defaultValue;
    }
}
