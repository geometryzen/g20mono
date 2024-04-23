import { Group } from "../group";
import { SVGView, SVGViewParams } from "./SVGView";
import { View } from "./View";
import { ViewFactory } from "./ViewFactory";

export class SVGViewFactory implements ViewFactory {
    constructor(readonly params?: SVGViewParams) {

    }
    createView(viewBox: Group, containerId: string): View {
        return new SVGView(viewBox, containerId, this.params);
    }
}