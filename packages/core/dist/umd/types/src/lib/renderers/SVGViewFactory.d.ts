import { Group } from "../group";
import { SVGViewParams } from "./SVGView";
import { View } from "./View";
import { ViewFactory } from "./ViewFactory";
export declare class SVGViewFactory implements ViewFactory {
    readonly params?: SVGViewParams;
    constructor(params?: SVGViewParams);
    createView(viewBox: Group, containerId: string): View;
}
