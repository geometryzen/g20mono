import { ColorProvider, Disposable, ElementBase, G20, SVGAttributes, variable, ViewDOM } from "g2o";
import { Constants } from "./constants";
import { is_canvas } from "./is_canvas";
import { is_img } from "./is_img";
import { is_video } from "./is_video";

export class Texture extends ElementBase implements ColorProvider {

    #refCount: number = 0;

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

    constructor(src?: string | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement) {
        super(Constants.Identifier + Constants.uniqueId());

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
    serialize(): string {
        return `url(#${this.id})`;
    }
    incrementUse<T>(viewDOM: ViewDOM<T>, defs: T): void {
        this.#refCount++;
        if (this.#refCount == 1) {
            const pattern = viewDOM.createSVGElement('pattern', {});
            this.zzz.elem = pattern;
            viewDOM.setAttribute(pattern, 'id', this.id);
            viewDOM.setAttribute(pattern, 'patternUnits', 'userSpaceOnUse');
            viewDOM.setAttribute(pattern, 'width', `${this.image.width}`);
            viewDOM.setAttribute(pattern, 'height', `${this.image.height}`);
            viewDOM.appendChild(defs, pattern);
            this.zzz.image = viewDOM.createSVGElement('image', {
                x: '0',
                y: '0',
                width: `${this.image.width}`,
                height: `${this.image.height}`
            });
            if (is_canvas(this.image)) {
                viewDOM.setAttribute(this.zzz.image as T, 'href', this.image.toDataURL('image/png'));
            }
            else if (is_img(this.image)) {
                viewDOM.setAttribute(this.zzz.image as T, 'href', this.image.src);
            }
            else if (is_video(this.image)) {
                // styles.href = this.src;
            }
            else {
                throw new Error();
            }
            viewDOM.appendChild(this.zzz.elem as T, this.zzz.image as T);
        }
    }
    decrementUse<T>(viewDOM: ViewDOM<T>, defs: T): void {
        this.#refCount--;
        if (this.#refCount === 0) {
            viewDOM.removeChild(defs, this.zzz.elem as T);
        }
    }
    use<T>(viewDOM: ViewDOM<T>, svgElement: T): this {

        let changed_x: number;
        let changed_y: number;
        let changed_width: number;
        let changed_height: number;

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

            changed_x = this.offset.x;
            changed_y = this.offset.y;

            if (image) {

                changed_x -= image.width / 2;
                changed_y -= image.height / 2;

                if (this.scale instanceof G20) {
                    changed_x *= this.scale.x;
                    changed_y *= this.scale.y;
                }
                else {
                    changed_x *= this.scale;
                    changed_y *= this.scale;
                }
            }

            if (changed_x > 0) {
                changed_x *= - 1;
            }
            if (changed_y > 0) {
                changed_y *= - 1;
            }

        }

        if (this._flagScale || this._flagLoaded || this._flagRepeat) {

            changed_width = 0;
            changed_height = 0;

            if (image) {

                changed_width = image.width;
                styles.width = `${image.width}`;
                changed_height = image.height;
                styles.height = `${image.height}`;

                // TODO: Hack / Band-aid
                switch (this._repeat) {
                    case 'no-repeat':
                        changed_width += 1;
                        changed_height += 1;
                        break;
                }

                if (this.scale instanceof G20) {
                    changed_width *= this.scale.x;
                    changed_height *= this.scale.y;
                }
                else {
                    changed_width *= this.scale;
                    changed_height *= this.scale;
                }
            }

        }

        if (this._flagScale || this._flagLoaded) {
            if (!this.zzz.image) {
                this.zzz.image = viewDOM.createSVGElement('image', styles);
            }
            else {
                viewDOM.setAttributes(this.zzz.image as T, styles);
            }
        }

        const changed: SVGAttributes = {};
        changed.x = `${changed_x}`;
        changed.y = `${changed_y}`;
        changed.width = `${changed_width}`;
        changed.height = `${changed_height}`;
        if (!this.zzz.elem) {
            changed.id = this.id;
            changed.x = `${changed_x}`;
            // changed.patternUnits = 'userSpaceOnUse';
            this.zzz.elem = viewDOM.createSVGElement('pattern', changed);
        }
        else if (Object.keys(changed).length !== 0) {
            viewDOM.setAttributes(this.zzz.elem as T, changed);
        }

        if (viewDOM.getParentNode(this.zzz.elem as T) === null) {
            viewDOM.appendChild(viewDOM.getElementDefs(svgElement), this.zzz.elem as T);
        }

        if (this.zzz.elem && this.zzz.image && !this.zzz.appended) {
            viewDOM.appendChild(this.zzz.elem as T, this.zzz.image as T);
            this.zzz.appended = true;
        }

        return this.flagReset();
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

    update(): this {
        if (this._flagSrc || this._flagImage) {

            this.#change.set(this);

            if (this._flagSrc || this._flagImage) {
                this.loaded = false;
                /*
                Texture.load(this, () => {
                    this.loaded = true;
                    this.#change.set(this);
                    this.#callback(this);
                });
                */
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
    set image(image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement) {
        // DRY: This is how we index the image registry. 
        // let index: string;
        if (is_canvas(image)) {
            // index = '#' + image.id;
        }
        else if (is_img(image)) {
            // index = image.src;
        }
        else if (is_video(image)) {
            // index = image.src;
        }
        this._image = image;
        /*
        if (Texture.ImageRegistry.contains(index)) {
            this._image = Texture.ImageRegistry.get(index);
        }
        else {
            this._image = image;
        }
        */

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
