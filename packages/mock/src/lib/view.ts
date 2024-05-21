import { Group, TreeView, View, ViewDOM, ViewFactory } from "@g20/core";
import { MockElement } from "./nodes";

export class MockViewFactory implements ViewFactory<MockElement> {
    constructor(readonly viewDOM: ViewDOM<MockElement>) {}
    createView(viewBox: Group, containerId: string): View<MockElement> {
        return new TreeView(this.viewDOM, viewBox, containerId);
    }
}
