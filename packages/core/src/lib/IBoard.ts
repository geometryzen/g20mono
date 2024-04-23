export interface IBoard {
    getBoundingBox(): { left: number, top: number, right: number, bottom: number };
    /**
     * When the coordinate system (CSS or SVG) is such that a counter-clockwise rotation of 90 degrees moves the y-axis
     * into alignment with the x-axis, the coordinate system is said to be "goofy". In mathematics, a counter-clockwise
     * rotation of 90 degrees moves the x-axis into alignment with the y-axis. 
     */
    get goofy(): boolean;
    width: number;
    height: number;
}