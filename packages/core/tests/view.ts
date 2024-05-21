import { Group } from "../src/lib/group";
import { TreeView } from "../src/lib/renderers/TreeView";
import { View } from "../src/lib/renderers/View";
import { ViewFactory } from "../src/lib/renderers/ViewFactory";
import { ViewDOM } from "../src/lib/Shape";
import { MockElement } from "./nodes";

export class MockViewFactory implements ViewFactory<MockElement> {
    constructor(readonly viewDOM: ViewDOM<MockElement>) {}
    createView(viewBox: Group, containerId: string): View<MockElement> {
        return new TreeView(this.viewDOM, viewBox, containerId);
    }
}
