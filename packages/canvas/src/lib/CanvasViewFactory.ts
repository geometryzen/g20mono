import { Group, View, ViewFactory } from "@g20/core";
import { CanvasView } from "./CanvasView";

export class CanvasViewFactory implements ViewFactory<HTMLCanvasElement> {
    createView(viewBox: Group, containerId: string): View<HTMLCanvasElement> {
        return new CanvasView(viewBox, containerId);
    }
}
