import { MouseDownEvent } from "../events/mouse-down-event";
import { MouseEventBase } from "../events/mouse-event";
import { GameBase } from "../game-base";
import { CursorType } from "../util/cursor-type";
import { Container } from "./container";


export class ButtonContainer extends Container {
    public clicked: () => void = () => {;};

    constructor() {
        super();

    }

    public override onMouseMove(event: MouseEventBase): void {
        if (this.isInside(event.mousePos))
            GameBase.baseInstance.input.setCursorType(CursorType.Button);    
    }

    public override onMouseDown(event: MouseDownEvent): void {
        if (this.isInside(event.mousePos) && event.repeat == false)
            this.clicked();
    }
}