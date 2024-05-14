import { Board, GraphicsBoard, GraphicsBoardOptions } from "g2o";
import { MockElementDOM, MockViewDOM } from "./dom";
import { MockElement } from "./nodes";
import { MockViewFactory } from "./view";

export function initBoard(element: MockElement, options: GraphicsBoardOptions = {}): Board {

    const elementDOM = new MockElementDOM();
    const viewDOM = new MockViewDOM();
    const viewFactory = new MockViewFactory(viewDOM);

    return new GraphicsBoard<MockElement, MockElement>(element, elementDOM, viewDOM, viewFactory, options);
}