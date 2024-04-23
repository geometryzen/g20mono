import { Collection } from '../collection.js';
import { lerp } from '../utils/math.js';
// import { _ } from '../utils/underscore.js';

import { Rectangle } from '../shapes/rectangle.js';
import { G20 } from '../vector.js';
import { Texture } from './texture.js';

export class ImageSequence extends Rectangle {

    /**
     * @name ImageSequence#_flagTextures
     * @private
     * @property {Boolean} - Determines whether the {@link ImageSequence#textures} need updating.
     */
    _flagTextures = false;

    /**
     * @name ImageSequence#_flagFrameRate
     * @private
     * @property {Boolean} - Determines whether the {@link ImageSequence#frameRate} needs updating.
     */
    _flagFrameRate = false;

    /**
     * @name ImageSequence#_flagIndex
     * @private
     * @property {Boolean} - Determines whether the {@link ImageSequence#index} needs updating.
     */
    _flagIndex = false;

    // Private variables

    /**
     * @name ImageSequence#_amount
     * @private
     * @property {Number} - Number of frames for a given {@link ImageSequence}.
     */
    _amount = 1;

    /**
     * @name ImageSequence#_duration
     * @private
     * @property {Number} - Number of milliseconds a {@link ImageSequence}.
     */
    _duration = 0;

    /**
     * @name ImageSequence#_index
     * @private
     * @property {Number} - The current frame the {@link ImageSequence} is currently displaying.
     */
    _index = 0;

    /**
     * @name ImageSequence#_startTime
     * @private
     * @property {Milliseconds} - Epoch time in milliseconds of when the {@link ImageSequence} started.
     */
    _startTime = 0;

    /**
     * @name ImageSequence#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link ImageSequence} is animating or not.
     */
    _playing = false;

    /**
     * @name ImageSequence#_firstFrame
     * @private
     * @property {Number} - The frame the {@link ImageSequence} should start with.
     */
    _firstFrame = 0;

    /**
     * @name ImageSequence#_lastFrame
     * @private
     * @property {Number} - The frame the {@link ImageSequence} should end with.
     */
    _lastFrame = 0;

    /**
     * @name ImageSequence#_playing
     * @private
     * @property {Boolean} - Dictates whether the {@link ImageSequence} should loop or not.
     */
    _loop = true;

    // Exposed through getter-setter

    /**
     * @name ImageSequence#_textures
     * @private
     * @see {@link ImageSequence#textures}
     */
    _textures: Texture[] = null;

    /**
     * @name ImageSequence#_frameRate
     * @private
     * @see {@link ImageSequence#frameRate}
     */
    _frameRate = 0;

    constructor(paths: (string | Texture)[], ox = 0, oy = 0, frameRate = 30) {

        super({ position: new G20(ox, oy), width: 0, height: 0 });

        this.noStroke();
        this.noFill();

        /**
         * @name ImageSequence#textures
         * @property {Texture[]} - A list of textures to be used as frames for animating the {@link ImageSequence}.
         */
        if (Array.isArray(paths)) {
            this.textures = paths.map((path) => ensure_texture(path));
        }
        else {
            // If just a single path convert into a single Texture
            this.textures = [ensure_texture(paths)];
        }

        this.origin = new G20();

        this.update();

        /**
         * @name ImageSequence#frameRate
         * @property {Number} - The number of frames to animate against per second.
         */
        if (typeof frameRate === 'number') {
            this.frameRate = frameRate;
        }
        else {
            this.frameRate = ImageSequence.DefaultFrameRate;
        }

        /**
         * @name ImageSequence#index
         * @property {Number} - The index of the current tile of the sprite to display. Defaults to `0`.
         */
        this.index = 0;

    }

    /**
     * @name ImageSequence.Properties
     * @property {String[]} - A list of properties that are on every {@link ImageSequence}.
     */
    static Properties = [
        'textures',
        'frameRate',
        'index'
    ];

    /**
     * @name ImageSequence.DefaultFrameRate
     * @property The default frame rate that {@link ImageSequence#frameRate} is set to when instantiated.
     */
    static DefaultFrameRate = 30;

    play(firstFrame = 0, lastFrame?: number, onLastFrame: () => void) {

        this._playing = true;
        this._firstFrame = 0;
        this._lastFrame = this.amount - 1;
        this._startTime = _.performance.now();

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
            this._startTime -= 1000 * Math.abs(this._index - this._firstFrame)
                / this._frameRate;
        }

        return this;

    }

    pause() {
        this._playing = false;
        return this;
    }

    stop() {
        this._playing = false;
        this._index = this._firstFrame;
        return this;

    }

    update() {

        const effect = this._textures;
        let width, height, elapsed, amount, duration, texture;
        let index, frames;

        if (effect) {

            if (this._flagTextures) {
                this._amount = effect.length;
            }

            if (this._flagFrameRate) {
                this._duration = 1000 * this._amount / this._frameRate;
            }

            if (this._playing && this._frameRate > 0) {

                amount = this._amount;

                if (_.isNaN(this._lastFrame)) {
                    this._lastFrame = amount - 1;
                }

                // TODO: Offload perf logic to instance of `Two`.
                elapsed = _.performance.now() - this._startTime;
                frames = this._lastFrame + 1;
                duration = 1000 * (frames - this._firstFrame) / this._frameRate;

                if (this._loop) {
                    elapsed = elapsed % duration;
                } else {
                    elapsed = Math.min(elapsed, duration);
                }

                index = lerp(this._firstFrame, frames, elapsed / duration);
                index = Math.floor(index);

                if (index !== this._index) {

                    this._index = index;
                    texture = effect[this._index];

                    if (texture.loaded) {

                        width = texture.image.width;
                        height = texture.image.height;

                        if (this.width !== width) {
                            this.width = width;
                        }
                        if (this.height !== height) {
                            this.height = height;
                        }

                        this.fill = texture;

                        if (index >= this._lastFrame - 1 && this._onLastFrame) {
                            this._onLastFrame();  // Shortcut for chainable sprite animations
                        }

                    }

                }

            } else if (this._flagIndex || !(this.fill instanceof Texture)) {

                texture = effect[this._index];

                if (texture.loaded) {

                    width = texture.image.width;
                    height = texture.image.height;

                    if (this.width !== width) {
                        this.width = width;
                    }
                    if (this.height !== height) {
                        this.height = height;
                    }

                }

                this.fill = texture;

            }

        }

        super.update.call(this);

        return this;

    }

    /**
     * @name ImageSequence#flagReset
     * @function
     * @private
     * @description Called internally to reset all flags. Ensures that only properties that change are updated before being sent to the renderer.
     */
    flagReset() {
        this._flagTextures = this._flagFrameRate = false;
        super.flagReset.call(this);
        return this;
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
    get textures() {
        return this._textures;
    }
    set textures(textures) {

        const bindTextures = this.viewInfo.bindTextures;
        const unbindTextures = this.viewInfo.unbindTextures;

        // Remove previous listeners
        if (this._textures) {
            this._textures
                .unbind(Events.Types.insert, bindTextures)
                .unbind(Events.Types.remove, unbindTextures);
        }

        // Create new Collection with copy of vertices
        this._textures = new Collection((textures || []).slice(0));

        // Listen for Collection changes and bind / unbind
        this._textures
            .bind(Events.Types.insert, bindTextures)
            .bind(Events.Types.remove, unbindTextures);

        // Bind Initial Textures
        bindTextures(this._textures);

    }
}

/**
 * @name FlagTextures
 * @private
 * @function
 * @description Cached method to let renderers know textures have been updated on a {@link ImageSequence}.
 */
function FlagTextures() {
    this._flagTextures = true;
}

/**
 * @name BindTextures
 * @private
 * @function
 * @description Cached method to let {@link ImageSequence} know textures have been added to the instance.
 */
function BindTextures(items) {

    let i = items.length;
    while (i--) {
        items[i].bind(Events.Types.change, this._renderer.flagTextures);
    }

    this._renderer.flagTextures();

}

/**
 * @name UnbindTextures
 * @private
 * @function
 * @description Cached method to let {@link ImageSequence} know textures have been removed from the instance.
 */
function UnbindTextures(items) {

    let i = items.length;
    while (i--) {
        items[i].unbind(Events.Types.change, this._renderer.flagTextures);
    }

    this._renderer.flagTextures();

}

function ensure_texture(x: string | Texture): Texture {
    if (x instanceof Texture) {
        return x;
    }
    else if (typeof x === 'string') {
        return new Texture(x);
    }
    else {
        throw new Error();
    }
}
