export function is_canvas(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLCanvasElement {
    const tagName = element && element.nodeName && element.nodeName.toLowerCase();
    return tagName === "canvas";
}
