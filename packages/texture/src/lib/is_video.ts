/**
 *
 */
export function is_video(
    element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement
): element is HTMLVideoElement {
    const tagName = element && element.nodeName && element.nodeName.toLowerCase();
    return tagName === "video";
}
