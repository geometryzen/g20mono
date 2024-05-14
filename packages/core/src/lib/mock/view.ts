import { Group } from "../group";
import { TreeView } from "../renderers/TreeView";
import { View } from "../renderers/View";
import { ViewFactory } from "../renderers/ViewFactory";
import { ViewDOM } from "../Shape";
import { MockElement } from "./nodes";

export class MockViewFactory implements ViewFactory<MockElement> {
    constructor(readonly viewDOM: ViewDOM<MockElement>) {

    }
    createView(viewBox: Group, containerId: string): View<MockElement> {
        return new TreeView(this.viewDOM, viewBox, containerId);
    }
}
