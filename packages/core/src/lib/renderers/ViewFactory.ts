import { Group } from "../group";
import { View } from "./View";

export interface ViewFactory {
    /**
     * 
     * @param viewBox The topmost group that contains the scene group.
     * @param containerId The HTML id property of the element that contains the view.
     */
    createView(viewBox: Group, containerId: string): View;
}