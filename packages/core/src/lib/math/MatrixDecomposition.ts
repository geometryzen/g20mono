export interface MatrixDecomposition {
    position: { x: number; y: number };
    translateX: number;
    translateY: number;
    scaleX: number;
    scaleY: number;
    /**
     * FIXME: This angle is in degrees.
     * Would it be better to return the 
     */
    rotation: number
}
