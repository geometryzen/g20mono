import { Group, View, ViewFactory } from "g2o";
import { CanvasView } from "./CanvasView";

export class CanvasViewFactory implements ViewFactory {
    createView(viewBox: Group, containerId: string): View {
        return new CanvasView(viewBox, containerId);
    }
}