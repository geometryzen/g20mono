import { getAbsoluteURL } from "./getAbsoluteURL";
import { is_canvas } from "./is_canvas";
import { is_img } from "./is_img";
import { is_video } from "./is_video";
import { Texture } from "./texture";
/**
 * This object is used to cache image data between different textures.
 */
const ImageRegistry: Map<string, HTMLCanvasElement | HTMLImageElement | HTMLVideoElement> = new Map();

/**
 * @description A collection of functions to register different types of textures. Used internally by a {@link Texture}.
 */
export const Register = {
    canvas: function (texture: Texture, callback: () => void) {
        texture._src = "#" + texture.id;
        ImageRegistry.set(texture.src, texture.image);
        if (typeof callback === "function") {
            callback();
        }
    },
    img: function (texture: Texture, callback: () => void) {
        const image = texture.image;

        const loaded = function () {
            if (image.removeEventListener && typeof image.removeEventListener === "function") {
                image.removeEventListener("load", loaded, false);
                image.removeEventListener("error", error, false);
            }
            if (typeof callback === "function") {
                callback();
            }
        };
        const error = function () {
            if (typeof image.removeEventListener === "function") {
                image.removeEventListener("load", loaded, false);
                image.removeEventListener("error", error, false);
            }
            throw new Error("unable to load " + texture.src);
        };

        if (typeof image.width === "number" && image.width > 0 && typeof image.height === "number" && image.height > 0) {
            loaded();
        } else if (typeof image.addEventListener === "function") {
            image.addEventListener("load", loaded, false);
            image.addEventListener("error", error, false);
        }

        texture._src = getAbsoluteURL(texture._src);

        if (image && image.getAttribute("two-src")) {
            return;
        }

        image.setAttribute("two-src", texture.src);

        ImageRegistry.set(texture.src, image);
        if (is_canvas(texture.image)) {
            // texture.image.src = texture.src;
        } else if (is_img(texture.image)) {
            texture.image.src = texture.src;
        } else if (is_video(texture.image)) {
            texture.image.src = texture.src;
        }
    },
    video: function (texture: Texture, callback: () => void) {
        const loaded = function () {
            const image = texture.image as HTMLVideoElement;
            image.removeEventListener("canplaythrough", loaded, false);
            image.removeEventListener("error", error, false);
            image.width = image.videoWidth;
            image.height = image.videoHeight;
            if (typeof callback === "function") {
                callback();
            }
        };
        const error = function () {
            texture.image.removeEventListener("canplaythrough", loaded, false);
            texture.image.removeEventListener("error", error, false);
            throw new Error("unable to load " + texture.src);
        };

        texture._src = getAbsoluteURL(texture._src);

        if (!texture.image.getAttribute("two-src")) {
            texture.image.setAttribute("two-src", texture.src);
            ImageRegistry.set(texture.src, texture.image);
        }

        const image = texture.image as HTMLVideoElement;
        if (image.readyState >= 4) {
            loaded();
        } else {
            image.addEventListener("canplaythrough", loaded, false);
            image.addEventListener("error", error, false);
            image.src = texture.src;
            image.load();
        }
    },
} as const;

const regex = {
    video: /\.(mp4|webm|ogg)$/i,
    image: /\.(jpe?g|png|gif|tiff|webp)$/i,
    effect: /texture|gradient/i,
} as const;

export function getImage(src: string): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement {
    const absoluteSrc = getAbsoluteURL(src);

    if (ImageRegistry.has(absoluteSrc)) {
        return ImageRegistry.get(absoluteSrc);
    }

    let image: HTMLImageElement | HTMLVideoElement;

    if (regex.video.test(absoluteSrc)) {
        image = document.createElement("video");
    } else {
        image = document.createElement("img");
    }

    image.crossOrigin = "anonymous";
    if (image instanceof HTMLImageElement) {
        image.referrerPolicy = "no-referrer";
    }

    return image;
}
