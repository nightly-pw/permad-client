import { Vector2 } from "../util/vectors";
import { MouseEventBase } from "./mouse-event";

export class MouseDownEvent extends MouseEventBase {
    public button: number;
    public repeat: boolean;

    constructor(button: number, repeat: boolean, mousePos: Vector2) {
        super(mousePos);

        this.button = button;
        this.repeat = repeat;
    }
}