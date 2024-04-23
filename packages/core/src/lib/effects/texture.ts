import { Constants } from '../constants';
import { ElementBase } from '../element';
import { Group } from '../group';
import { G20 } from '../math/G20';
import { Disposable } from '../reactive/Disposable';
import { variable } from '../reactive/variable';
import { Registry } from '../registry.js';
import { get_svg_element_defs, serialize_svg_props, svg, SVGAttributes, SVGProperties } from '../renderers/SVGView';
import { root } from '../utils/root';
import { ColorProvider } from './ColorProvider';

export function is_canvas(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLCanvasElement {
    const tagName = (element && element.nodeName && element.nodeName.toLowerCase());
    return tagName === 'canvas';
}

export function is_img(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLImageElement {
    const tagName = (element && element.nodeName && element.nodeName.toLowerCase());
    return tagName === 'img';
}

export function is_video(element: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): element is HTMLVideoElement {
    const tagName = (element && element.nodeName && element.nodeName.toLowerCase());
    return tagName === 'video';
}


let anchor: HTMLAnchorElement | null = null;

const regex = {
    video: /\.(mp4|webm|ogg)$/i,
    image: /\.(jpe?g|png|gif|tiff|webp)$/i,
    effect: /texture|gradient/i
} as const;

if (root.document) {
    anchor = document.createElement('a');
}

export class Texture extends ElementBase<Group> implements ColorProvider {

    _flagSrc = false;
    _flagImage = false;
    _flagVideo = false;
    _flagLoaded = false;
    _flagRepeat = false;
    _flagOffset = false;
    _flagScale = false;

    _src = '';
    _image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | null = null;
    _loaded = false;
    _repeat = 'no-repeat';

    _scale: G20 | number = 1;
    #scale_change: Disposable | null = null;

    _offset: G20 | null = null;
    #offset_change: Disposable | null = null;

    readonly #change = variable(this);
    readonly change$ = this.#change.asObservable();

    readonly #callback: (texture: Texture) => void;

    /**
     * @param src The URL path to an image file or an `<img />` element.
     * @param callback An optional callback function once the image has been loaded.
     */
    constructor(src?: string | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement, callback?: (texture: Texture) => void) {

        super(Constants.Identifier + Constants.uniqueId());

        this.#callback = callback;

        this.classList = [];

        this.loaded = false;

        /**
         * CSS style declaration to tile. Valid values include: `'no-repeat'`, `'repeat'`, `'repeat-x'`, `'repeat-y'`.
         * @see {@link https://www.w3.org/TR/2dcontext/#dom-context-2d-createpattern}
         */
        this.repeat = 'no-repeat';

        /**
         * A two-component vector describing any pixel offset of the texture when applied to a {@link Path}.
         */
        this.offset = new G20();

        if (typeof src === 'string') {
            this.src = src;
        }
        else if (typeof src === 'object') {
            const elemString = Object.prototype.toString.call(src);
            if (
                elemString === '[object HTMLImageElement]' ||
                elemString === '[object HTMLCanvasElement]' ||
                elemString === '[object HTMLVideoElement]' ||
                elemString === '[object Image]'
            ) {
                this.image = src;
            }
        }

        this.update();
    }

    render(svgElement: SVGElement): this {

        const changed: SVGProperties = {};

        const styles: SVGAttributes = { x: '0', y: '0' };

        const image = this.image;

        if (this._flagLoaded && this.loaded) {

            if (is_canvas(image)) {
                styles.href = image.toDataURL('image/png');
            }
            else if (is_img(image)) {
                styles.href = this.src;
            }
            else if (is_video(image)) {
                styles.href = this.src;
            }
            else {
                throw new Error();
            }
        }

        if (this._flagOffset || this._flagLoaded || this._flagScale) {

            changed.x = this.offset.x;
            changed.y = this.offset.y;

            if (image) {

                changed.x -= image.width / 2;
                changed.y -= image.height / 2;

                if (this.scale instanceof G20) {
                    changed.x *= this.scale.x;
                    changed.y *= this.scale.y;
                }
                else {
                    changed.x *= this.scale;
                    changed.y *= this.scale;
                }
            }

            if (changed.x > 0) {
                changed.x *= - 1;
            }
            if (changed.y > 0) {
                changed.y *= - 1;
            }

        }

        if (this._flagScale || this._flagLoaded || this._flagRepeat) {

            changed.width = 0;
            changed.height = 0;

            if (image) {

                changed.width = image.width;
                styles.width = `${image.width}`;
                changed.height = image.height;
                styles.height = `${image.height}`;

                // TODO: Hack / Band-aid
                switch (this._repeat) {
                    case 'no-repeat':
                        changed.width += 1;
                        changed.height += 1;
                        break;
                }

                if (this.scale instanceof G20) {
                    changed.width *= this.scale.x;
                    changed.height *= this.scale.y;
                }
                else {
                    changed.width *= this.scale;
                    changed.height *= this.scale;
                }
            }

        }

        if (this._flagScale || this._flagLoaded) {
            if (!this.zzz.image) {
                this.zzz.image = svg.createElement('image', styles) as SVGImageElement;
            }
            else {
                svg.setAttributes(this.zzz.image, styles);
            }
        }

        if (!this.zzz.elem) {

            changed.id = this.id;
            changed.patternUnits = 'userSpaceOnUse';
            // TODO: Complete serializwer?
            this.zzz.elem = svg.createElement('pattern', serialize_svg_props(changed));
        }
        else if (Object.keys(changed).length !== 0) {
            svg.setAttributes(this.zzz.elem, serialize_svg_props(changed));
        }

        if (this.zzz.elem.parentNode === null) {
            get_svg_element_defs(svgElement).appendChild(this.zzz.elem);
        }

        if (this.zzz.elem && this.zzz.image && !this.zzz.appended) {
            this.zzz.elem.appendChild(this.zzz.image);
            this.zzz.appended = true;
        }

        return this.flagReset();
    }

    /**
     * A map of compatible DOM Elements categorized by media format.
     */
    static RegularExpressions = regex;

    /**
     * This object is used to cache image data between different textures.
     */
    static ImageRegistry: Registry<HTMLCanvasElement | HTMLImageElement | HTMLVideoElement> = new Registry();

    static getAbsoluteURL(path: string): string {
        if (!anchor) {
            // TODO: Fix for headless environments
            return path;
        }
        anchor.href = path;
        return anchor.href;
    }

    /**
     * Retrieves the tag name of an image, video, or canvas node.
     * @param image The image to infer the tag name from.
     * @returns the tag name of an image, video, or canvas node.
     */
    static getTag(image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): 'canvas' | 'img' | 'video' {
        // Headless environments
        return (image && image.nodeName && image.nodeName.toLowerCase()) as 'canvas' | 'img' | 'video' || 'img';
    }

    static getImage(src: string): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement {

        const absoluteSrc = Texture.getAbsoluteURL(src);

        if (Texture.ImageRegistry.contains(absoluteSrc)) {
            return Texture.ImageRegistry.get(absoluteSrc);
        }

        let image: HTMLImageElement | HTMLVideoElement;

        if (root.document) {
            if (regex.video.test(absoluteSrc)) {
                image = document.createElement('video');
            }
            else {
                image = document.createElement('img');
            }
        }
        else {
            // eslint-disable-next-line no-console
            console.warn('no prototypical image defined for Texture');
        }

        image.crossOrigin = 'anonymous';
        if (image instanceof HTMLImageElement) {
            image.referrerPolicy = 'no-referrer';
        }

        return image;

    }

    /**
     * @description A collection of functions to register different types of textures. Used internally by a {@link Texture}.
     */
    static Register = {
        canvas: function (texture: Texture, callback: () => void) {
            texture._src = '#' + texture.id;
            Texture.ImageRegistry.add(texture.src, texture.image);
            if (typeof callback === 'function') {
                callback();
            }
        },
        img: function (texture: Texture, callback: () => void) {

            const image = texture.image;

            const loaded = function () {
                if (image.removeEventListener && typeof image.removeEventListener === 'function') {
                    image.removeEventListener('load', loaded, false);
                    image.removeEventListener('error', error, false);
                }
                if (typeof callback === 'function') {
                    callback();
                }
            };
            const error = function () {
                if (typeof image.removeEventListener === 'function') {
                    image.removeEventListener('load', loaded, false);
                    image.removeEventListener('error', error, false);
                }
                throw new Error('unable to load ' + texture.src);
            };

            if (typeof image.width === 'number' && image.width > 0
                && typeof image.height === 'number' && image.height > 0) {
                loaded();
            }
            else if (typeof image.addEventListener === 'function') {
                image.addEventListener('load', loaded, false);
                image.addEventListener('error', error, false);
            }

            texture._src = Texture.getAbsoluteURL(texture._src);

            if (image && image.getAttribute('two-src')) {
                return;
            }

            image.setAttribute('two-src', texture.src);

            Texture.ImageRegistry.add(texture.src, image);
            if (is_canvas(texture.image)) {
                // texture.image.src = texture.src;
            }
            else if (is_img(texture.image)) {
                texture.image.src = texture.src;
            }
            else if (is_video(texture.image)) {
                texture.image.src = texture.src;
            }
        },
        video: function (texture: Texture, callback: () => void) {

            const loaded = function () {
                const image = texture.image as HTMLVideoElement;
                image.removeEventListener('canplaythrough', loaded, false);
                image.removeEventListener('error', error, false);
                image.width = image.videoWidth;
                image.height = image.videoHeight;
                if (typeof callback === 'function') {
                    callback();
                }
            };
            const error = function () {
                texture.image.removeEventListener('canplaythrough', loaded, false);
                texture.image.removeEventListener('error', error, false);
                throw new Error('unable to load ' + texture.src);
            };

            texture._src = Texture.getAbsoluteURL(texture._src);

            if (!texture.image.getAttribute('two-src')) {
                texture.image.setAttribute('two-src', texture.src);
                Texture.ImageRegistry.add(texture.src, texture.image);
            }

            const image = texture.image as HTMLVideoElement;
            if (image.readyState >= 4) {
                loaded();
            }
            else {
                image.addEventListener('canplaythrough', loaded, false);
                image.addEventListener('error', error, false);
                image.src = texture.src;
                image.load();
            }
        }
    } as const;

    /**
     * @param texture The texture to load.
     * @param callback The function to be called once the texture is loaded.
     */
    static load(texture: Texture, callback: () => void): void {

        if (texture._flagImage) {
            if (is_canvas(texture.image)) {
                Texture.Register.canvas(texture, callback);
            }
            else if (is_img(texture.image)) {
                Texture.Register.img(texture, callback);
            }
            else if (is_video(texture.image)) {
                Texture.Register.video(texture, callback);
            }
        }

        if (texture._flagSrc) {
            if (!texture.image) {
                texture.image = Texture.getImage(texture.src);
                if (is_canvas(texture.image)) {
                    Texture.Register.canvas(texture, callback);
                }
                else if (is_img(texture.image)) {
                    Texture.Register.img(texture, callback);
                }
                else if (is_video(texture.image)) {
                    Texture.Register.video(texture, callback);
                }
            }
        }
    }

    update(): this {
        if (this._flagSrc || this._flagImage) {

            this.#change.set(this);

            if (this._flagSrc || this._flagImage) {
                this.loaded = false;
                Texture.load(this, () => {
                    this.loaded = true;
                    this.#change.set(this);
                    this.#callback(this);
                });
            }
        }

        if (this._image && this._image instanceof HTMLVideoElement && this._image.readyState >= 4) {
            this._flagVideo = true;
        }

        return this;
    }

    override flagReset(dirtyFlag = false) {
        this._flagSrc = this._flagImage = this._flagLoaded = this._flagRepeat
            = this._flagVideo = this._flagScale = this._flagOffset = false;
        super.flagReset(dirtyFlag);
        return this;
    }
    get image(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement {
        return this._image;
    }
    set image(image) {
        // DRY: This is how we index the image registry. 
        let index: string;
        if (is_canvas(image)) {
            index = '#' + image.id;
        }
        else if (is_img(image)) {
            index = image.src;
        }
        else if (is_video(image)) {
            index = image.src;
        }
        if (Texture.ImageRegistry.contains(index)) {
            this._image = Texture.ImageRegistry.get(index);
        }
        else {
            this._image = image;
        }

        this._flagImage = true;
    }

    get loaded() {
        return this._loaded;
    }
    set loaded(v) {
        this._loaded = v;
        this._flagLoaded = true;
    }
    get offset() {
        return this._offset;
    }
    set offset(v) {
        if (this.#offset_change) {
            this.#offset_change.dispose();
            this.#offset_change = null;
        }
        this._offset = v;
        this.#offset_change = this._offset.change$.subscribe(() => {
            this._flagOffset = true;
        });
        this._flagOffset = true;
    }
    get repeat() {
        return this._repeat;
    }
    set repeat(v) {
        this._repeat = v;
        this._flagRepeat = true;
    }
    get scale() {
        return this._scale;
    }
    set scale(v) {
        if (this.#scale_change) {
            this.#scale_change.dispose();
            this.#scale_change = null;
        }
        this._scale = v;
        if (this._scale instanceof G20) {
            this.#scale_change = this._scale.change$.subscribe(() => {
                this._flagScale = true;
            });
        }
        this._flagScale = true;
    }
    get src(): string {
        return this._src;
    }
    set src(src: string) {
        this._src = src;
        this._flagSrc = true;
    }
}
