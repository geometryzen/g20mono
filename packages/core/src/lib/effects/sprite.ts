import { Flag } from '../Flag.js';
import { IBoard } from '../IBoard.js';
import { G20 } from '../math/G20.js';
import { Rectangle } from '../shapes/Rectangle.js';
import { lerp } from '../utils/math.js';
import { dateTime } from '../utils/performance.js';
import { Texture } from './texture.js';


export interface SpriteOptions {
    position?: G20;
    attitude?: G20;
}

export class Sprite extends Rectangle {

    _flagTexture = false;
    _flagColumns = false;
    _flagRows = false;
    _flagFrameRate = false;
    _flagIndex = false;

    _amount = 1;
    _duration = 0;
    _startTime = 0;
    _playing = false;
    _firstFrame = 0;
    _lastFrame = 0;
    _loop = true;

    // Exposed through getter-setter

    _texture: Texture | null = null;
    _columns = 1;
    _rows = 1;
    _frameRate = 0;
    _index = 0;

    _onLastFrame: () => void;

    /**
     * @param path The URL path or {@link Texture} to be used as the bitmap data displayed on the sprite.
     * @param ox The initial `x` position of the Sprite.
     * @param oy The initial `y` position of the Sprite.
     * @param cols The number of columns the sprite contains.
     * @param rows The number of rows the sprite contains.
     * @param frameRate The frame rate at which the partitions of the image should playback at.
     * A convenient package to display still or animated images through a tiled image source. For more information on the principals of animated imagery through tiling see [Texture Atlas](https://en.wikipedia.org/wiki/Texture_atlas) on Wikipedia.
     */
    constructor(board: IBoard, path: string | Texture, ox = 0, oy = 0, cols = 1, rows = 1, frameRate = 0) {

        super(board, { position: new G20(ox, oy), width: 0, height: 0 });

        this.noStroke();
        this.noFill();

        if (path instanceof Texture) {
            this.texture = path;
        }
        else if (typeof path === 'string') {
            this.texture = new Texture(path);
        }

        this.update();

        if (typeof cols === 'number') {
            this.columns = cols;
        }

        if (typeof rows === 'number') {
            this.rows = rows;
        }

        if (typeof frameRate === 'number') {
            this.frameRate = frameRate;
        }

        this.index = 0;
    }

    /**
     * @param firstFrame The index of the frame to start the animation with.
     * @param lastFrame The index of the frame to end the animation with.
     * @param onLastFrame Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
     * Initiate animation playback.
     */
    play(firstFrame = 0, lastFrame?: number, onLastFrame?: () => void): this {

        this._playing = true;
        this._firstFrame = 0;
        this._lastFrame = this._amount - 1;
        this._startTime = dateTime.now();

        if (typeof firstFrame === 'number') {
            this._firstFrame = firstFrame;
        }
        if (typeof lastFrame === 'number') {
            this._lastFrame = lastFrame;
        }
        if (typeof onLastFrame === 'function') {
            this._onLastFrame = onLastFrame;
        }
        else {
            delete this._onLastFrame;
        }

        if (this._index !== this._firstFrame) {
            this._startTime -= 1000 * Math.abs(this._index - this._firstFrame) / this._frameRate;
        }

        return this;
    }

    /**
     * Halt animation playback.
     */
    pause(): this {
        this._playing = false;
        return this;
    }

    /**
     * Halt animation playback and set the current frame back to the first frame.
     */
    stop(): this {
        this._playing = false;
        this._index = 0;
        return this;
    }

    override update(): this {

        const effect = this._texture;
        const cols = this._columns;
        const rows = this._rows;

        let width, height, elapsed, amount, duration;
        let index, iw, ih, frames;

        if (effect) {

            if (this._flagColumns || this._flagRows) {
                this._amount = this._columns * this._rows;
            }

            if (this._flagFrameRate) {
                this._duration = 1000 * this._amount / this._frameRate;
            }

            if (this._flagTexture) {
                this.fill = effect;
            }

            if (effect.loaded) {

                iw = effect.image.width;
                ih = effect.image.height;

                width = iw / cols;
                height = ih / rows;
                amount = this._amount;

                if (this.width !== width) {
                    this.width = width;
                }
                if (this.height !== height) {
                    this.height = height;
                }

                if (this._playing && this._frameRate > 0) {

                    if (isNaN(this._lastFrame)) {
                        this._lastFrame = amount - 1;
                    }

                    // TODO: Offload perf logic to instance of `Two`.
                    elapsed = dateTime.now() - this._startTime;
                    frames = this._lastFrame + 1;
                    duration = 1000 * (frames - this._firstFrame) / this._frameRate;

                    if (this._loop) {
                        elapsed = elapsed % duration;
                    }
                    else {
                        elapsed = Math.min(elapsed, duration);
                    }

                    index = lerp(this._firstFrame, frames, elapsed / duration);
                    index = Math.floor(index);

                    if (index !== this._index) {
                        this._index = index;
                        if (index >= this._lastFrame - 1 && this._onLastFrame) {
                            this._onLastFrame();  // Shortcut for chainable sprite animations
                        }
                    }

                }

                const col = this._index % cols;
                const row = Math.floor(this._index / cols);

                const ox = - width * col + (iw - width) / 2;
                const oy = - height * row + (ih - height) / 2;

                // TODO: Improve performance
                if (ox !== effect.offset.x) {
                    effect.offset.x = ox;
                }
                if (oy !== effect.offset.y) {
                    effect.offset.y = oy;
                }

            }

        }

        super.update();

        return this;

    }

    override flagReset(dirtyFlag = false) {
        this.zzz.flags[Flag.Columns] = dirtyFlag;
        this.zzz.flags[Flag.Rows] = dirtyFlag;
        this.zzz.flags[Flag.FrameRate] = dirtyFlag;
        super.flagReset(dirtyFlag);
        return this;
    }
    get texture() {
        return this._texture;
    }
    set texture(v) {
        this._texture = v;
        this._flagTexture = true;
    }
    get columns() {
        return this._columns;
    }
    set columns(v) {
        this._columns = v;
        this._flagColumns = true;
    }
    get rows() {
        return this._rows;
    }
    set rows(v) {
        this._rows = v;
        this._flagRows = true;
    }
    get frameRate() {
        return this._frameRate;
    }
    set frameRate(v) {
        this._frameRate = v;
        this._flagFrameRate = true;
    }
    get index() {
        return this._index;
    }
    set index(v) {
        this._index = v;
        this._flagIndex = true;
    }
}
