import { KeyboardDownEvent } from "../events/keyboard-down-event";
import { MouseDownEvent } from "../events/mouse-down-event";
import { Container } from "./container";

// All this drawable will do is handle the events related to drawing text, nothing else.
export abstract class TextFieldContainer extends Container {
    private _placeholderText: string = "";

    private _text: string = "";
    private _focused: boolean = false;

    constructor(placeholderText: string) {
        super();

        this._placeholderText = placeholderText;
    }

    public override onKeyDown(event: KeyboardDownEvent): void {
        if (!this._focused)
            return;

        console.log(event.keyCode);

        if (event.keyCode == "Backspace") {
            if (this._text.length > 0) {
                this._text = this._text.substring(0, this._text.length - 1);
            }
            return;
        }
        if (event.keyCode == "Enter") {
            if (this.onSubmit())
                this._text = "";
            return;
        }

        if (event.keyCode.length == 1)
            this._text += event.keyCode;

        super.onKeyDown(event);
    }

    public override onMouseDown(event: MouseDownEvent): void {
        this._focused = this.isInside(event.mousePos);
        
        super.onMouseDown(event);
    }

    public isPlaceholderText(): boolean {
        return !(this.text.length > 0);
    }

    public get text(): string {
        if (this._text.length > 0)
            return this._text;
        else
            return this._placeholderText;
    }

    public get focused(): boolean {
        return this._focused
    }

    public focus() {
        this._focused = true;
    }

    public unfocus() {
        this._focused = false;
    }

    //Returns if the text box should be cleared
    public onSubmit(): boolean {
        return true;
    }
}