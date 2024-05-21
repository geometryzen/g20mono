export function default_boolean(value: boolean, defaultValue: boolean): boolean {
    if (typeof value === "boolean") {
        return value;
    } else {
        return defaultValue;
    }
}
