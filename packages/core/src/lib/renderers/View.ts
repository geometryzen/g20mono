
export interface View {
    /**
     * 
     */
    domElement: HTMLCanvasElement | SVGElement;
    height: number;
    width: number;
    render(): void;
    setSize(size: { width: number, height: number }, ratio: number): void;
}
