import { IBoard } from '../IBoard.js';
import { Path } from '../path.js';
/**
 * @param {Number} [x=0] - The x position of the arc segment.
 * @param {Number} [y=0] - The y position of the arc segment.
 * @param {Number} [innerRadius=0] - The inner radius value of the arc segment.
 * @param {Number} [outerRadius=0] - The outer radius value of the arc segment.
 * @param {Number} [startAngle=0] - The start angle of the arc segment in Number.
 * @param {Number} [endAngle=6.2831] - The end angle of the arc segment in Number.
 * @param {Number} [resolution=24] - The number of vertices used to construct the arc segment.
 */
export declare class ArcSegment extends Path {
    /**
     * @name ArcSegment#_flagStartAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#startAngle} needs updating.
     */
    _flagStartAngle: boolean;
    /**
     * @name ArcSegment#_flagEndAngle
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#endAngle} needs updating.
     */
    _flagEndAngle: boolean;
    /**
     * @name ArcSegment#_flagInnerRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#innerRadius} needs updating.
     */
    _flagInnerRadius: boolean;
    /**
     * @name ArcSegment#_flagOuterRadius
     * @private
     * @property {Boolean} - Determines whether the {@link ArcSegment#outerRadius} needs updating.
     */
    _flagOuterRadius: boolean;
    /**
     * @name ArcSegment#_startAngle
     * @private
     * @see {@link ArcSegment#startAngle}
     */
    _startAngle: number;
    /**
     * @name ArcSegment#_endAngle
     * @private
     * @see {@link ArcSegment#endAngle}
     */
    _endAngle: number;
    /**
     * @name ArcSegment#_innerRadius
     * @private
     * @see {@link ArcSegment#innerRadius}
     */
    _innerRadius: number;
    /**
     * @name ArcSegment#_outerRadius
     * @private
     * @see {@link ArcSegment#outerRadius}
     */
    _outerRadius: number;
    constructor(board: IBoard, x?: number, y?: number, ir?: number, or?: number, sa?: number, ea?: number, res?: number);
    static Properties: string[];
    update(): this;
    flagReset(dirtyFlag?: boolean): this;
    get startAngle(): number;
    set startAngle(v: number);
    get endAngle(): number;
    set endAngle(v: number);
    get innerRadius(): number;
    set innerRadius(v: number);
    get outerRadius(): number;
    set outerRadius(v: number);
}
