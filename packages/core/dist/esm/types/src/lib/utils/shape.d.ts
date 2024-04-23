import { Anchor } from '../anchor.js';
import { Path } from '../path.js';
export declare function contains(path: Path, t: number): boolean;
export interface IPathOrPoints {
    /**
     * The total length of the path.
     */
    length: number;
    /**
     * The lengths of each segment of the path.
     */
    lengths: number[];
}
/**
 * TODO: Not a good name. Appears to be returning the index into the lengths array
 * corresponding to the provided "target" length. But the result also appears to be fractional.
 */
export declare function getIdByLength(path: IPathOrPoints, target: number): number;
export declare function getCurveLength(a: Anchor, b: Anchor, limit: number): number;
export declare function getSubdivisions(a: Anchor, b: Anchor, limit: number): Anchor[];
