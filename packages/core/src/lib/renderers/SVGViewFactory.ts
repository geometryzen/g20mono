import { Group } from "../group";
import { SVGView, SVGViewParams } from "./SVGView";
import { SVGViewDOM } from "./SVGViewDOM";
import { View } from "./View";
import { ViewFactory } from "./ViewFactory";

export class SVGViewFactory implements ViewFactory<SVGElement> {
    constructor(readonly params?: SVGViewParams) {

    }
    createView(viewBox: Group, containerId: string): View<SVGElement> {
        const viewDOM = new SVGViewDOM();
        return new SVGView(viewDOM, viewBox, containerId, this.params) as View<SVGElement>;
    }
}