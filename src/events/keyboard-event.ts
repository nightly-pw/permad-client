import { Event } from "./event";

export class KeyboardEvent extends Event {
    public keyCode: string;
    public keyChar: string;

    constructor(keyCode: string, keyChar: string) {
        super();
        this.keyChar = keyChar;
        this.keyCode = keyCode;
    }
}