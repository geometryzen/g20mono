
export interface View<T> {
    /**
     * HTMLCanvasElement or SVGElement (or something else).
     */
    domElement: T;
    height: number;
    width: number;
    render(): void;
    setSize(size: { width: number, height: number }, ratio: number): void;
}
