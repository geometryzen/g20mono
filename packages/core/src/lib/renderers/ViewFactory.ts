import { Group } from "../Group";
import { View } from "./View";

export interface ViewFactory<T> {
    /**
     *
     * @param viewBox The topmost group that contains the scene group.
     * @param containerId The HTML id property of the element that contains the view.
     */
    createView(viewBox: Group, containerId: string): View<T>;
}
