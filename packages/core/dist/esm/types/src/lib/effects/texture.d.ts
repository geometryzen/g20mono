import { ElementBase } from '../element';
import { Group } from '../group';
import { G20 } from '../math/G20';
import { Registry } from '../registry.js';
import { ColorProvider } from './ColorProvider';
export declare function is_canvas(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLCanvasElement;
export declare function is_img(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLImageElement;
export declare function is_video(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLVideoElement;
export declare class Texture extends ElementBase<Group> implements ColorProvider {
    #private;
    _flagSrc: boolean;
    _flagImage: boolean;
    _flagVideo: boolean;
    _flagLoaded: boolean;
    _flagRepeat: boolean;
    _flagOffset: boolean;
    _flagScale: boolean;
    _src: string;
    _image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | null;
    _loaded: boolean;
    _repeat: string;
    _scale: G20 | number;
    _offset: G20 | null;
    readonly change$: import("../..").Observable<this>;
    /**
     * @param src The URL path to an image file or an `<img />` element.
     * @param callback An optional callback function once the image has been loaded.
     */
    constructor(src?: string | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement, callback?: (texture: Texture) => void);
    render(svgElement: SVGElement): this;
    /**
     * A map of compatible DOM Elements categorized by media format.
     */
    static RegularExpressions: {
        readonly video: RegExp;
        readonly image: RegExp;
        readonly effect: RegExp;
    };
    /**
     * This object is used to cache image data between different textures.
     */
    static ImageRegistry: Registry<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement>;
    static getAbsoluteURL(path: string): string;
    /**
     * Retrieves the tag name of an image, video, or canvas node.
     * @param image The image to infer the tag name from.
     * @returns the tag name of an image, video, or canvas node.
     */
    static getTag(image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): 'canvas' | 'img' | 'video';
    static getImage(src: string): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    /**
     * @description A collection of functions to register different types of textures. Used internally by a {@link Texture}.
     */
    static Register: {
        readonly canvas: (texture: Texture, callback: () => void) => void;
        readonly img: (texture: Texture, callback: () => void) => void;
        readonly video: (texture: Texture, callback: () => void) => void;
    };
    /**
     * @param texture The texture to load.
     * @param callback The function to be called once the texture is loaded.
     */
    static load(texture: Texture, callback: () => void): void;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get image(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    set image(image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement);
    get loaded(): boolean;
    set loaded(v: boolean);
    get offset(): G20;
    set offset(v: G20);
    get repeat(): string;
    set repeat(v: string);
    get scale(): number | G20;
    set scale(v: number | G20);
    get src(): string;
    set src(src: string);
}
