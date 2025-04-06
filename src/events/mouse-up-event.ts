import { Vector2 } from "../util/vectors";
import { MouseEventBase } from "./mouse-event";

export class MouseUpEvent extends MouseEventBase {
    public button: number;

    constructor(button: number, mousePos: Vector2) {
        super(mousePos);

        this.button = button;
    }
}