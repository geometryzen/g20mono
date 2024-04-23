import { IBoard } from '../IBoard.js';
import { G20 } from '../math/G20.js';
import { Rectangle } from '../shapes/Rectangle.js';
import { Texture } from './texture.js';
export interface SpriteOptions {
    position?: G20;
    attitude?: G20;
}
export declare class Sprite extends Rectangle {
    _flagTexture: boolean;
    _flagColumns: boolean;
    _flagRows: boolean;
    _flagFrameRate: boolean;
    _flagIndex: boolean;
    _amount: number;
    _duration: number;
    _startTime: number;
    _playing: boolean;
    _firstFrame: number;
    _lastFrame: number;
    _loop: boolean;
    _texture: Texture | null;
    _columns: number;
    _rows: number;
    _frameRate: number;
    _index: number;
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
    constructor(board: IBoard, path: string | Texture, ox?: number, oy?: number, cols?: number, rows?: number, frameRate?: number);
    /**
     * @param firstFrame The index of the frame to start the animation with.
     * @param lastFrame The index of the frame to end the animation with.
     * @param onLastFrame Optional callback function to be triggered after playing the last frame. This fires multiple times when the sprite is looped.
     * Initiate animation playback.
     */
    play(firstFrame?: number, lastFrame?: number, onLastFrame?: () => void): this;
    /**
     * Halt animation playback.
     */
    pause(): this;
    /**
     * Halt animation playback and set the current frame back to the first frame.
     */
    stop(): this;
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get texture(): Texture;
    set texture(v: Texture);
    get columns(): number;
    set columns(v: number);
    get rows(): number;
    set rows(v: number);
    get frameRate(): number;
    set frameRate(v: number);
    get index(): number;
    set index(v: number);
}
