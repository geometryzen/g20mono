export function is_img(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLImageElement {
    const tagName = element && element.nodeName && element.nodeName.toLowerCase();
    return tagName === "img";
}
