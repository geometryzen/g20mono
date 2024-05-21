const anchor = document.createElement("a");

export function getAbsoluteURL(path: string): string {
    anchor.href = path;
    return anchor.href;
}
