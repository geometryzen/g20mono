export interface Size {
    width: number;
    height: number;
}

export function sizeEquals(a: Size, b: Size): boolean {
    return a.width === b.width && a.height === b.height;
}
