import { Vector2 } from "../util/vectors";
import { Event } from "./event";

export class MouseEventBase extends Event {
    public mousePos: Vector2;

    constructor(mousePos: Vector2) {
        super();
        this.mousePos = mousePos;
    }
}