import { Group, TreeView, View, ViewFactory } from "@g20/core";
import { SVGViewDOM } from "./SVGViewDOM";

export class SVGViewFactory implements ViewFactory<SVGElement> {
    constructor() {
        // Nothing to see here.
    }
    createView(viewBox: Group, containerId: string): View<SVGElement> {
        const viewDOM = new SVGViewDOM();
        return new TreeView(viewDOM, viewBox, containerId) as View<SVGElement>;
    }
}
