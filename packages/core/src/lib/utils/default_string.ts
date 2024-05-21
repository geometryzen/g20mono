export function default_string(value: string, defaultValue: string): string {
    if (typeof value === "string") {
        return value;
    } else {
        return defaultValue;
    }
}
