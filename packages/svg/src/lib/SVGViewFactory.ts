import { Group, TreeView, TreeViewParams, View, ViewFactory } from "g2o";
import { SVGViewDOM } from "./SVGViewDOM";

export class SVGViewFactory implements ViewFactory<SVGElement> {
    constructor(readonly params?: TreeViewParams) {

    }
    createView(viewBox: Group, containerId: string): View<SVGElement> {
        const viewDOM = new SVGViewDOM();
        return new TreeView(viewDOM, viewBox, containerId, this.params) as View<SVGElement>;
    }
}