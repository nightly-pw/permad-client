import { KeyboardEvent } from "./keyboard-event";

export class KeyboardDownEvent extends KeyboardEvent {
    public repeat: boolean;

    constructor(keyCode: string, keyChar: string, repeat: boolean) {
        super(keyCode, keyChar);
        this.repeat = repeat;
    }
}