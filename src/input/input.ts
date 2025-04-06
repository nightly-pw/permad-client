import { Vector2 } from "../util/vectors";
import { GameBase } from "../game-base";
import { MouseDownEvent } from "../events/mouse-down-event";
import { MouseEventBase } from "../events/mouse-event";
import { MouseUpEvent } from "../events/mouse-up-event";
import { KeyboardDownEvent } from "../events/keyboard-down-event";
import { KeyboardUpEvent } from "../events/keyboard-up-event";
import { CursorType } from "../util/cursor-type";

export class InputManager {
    public game: GameBase;
    
    private keyCharState: Set<string> = new Set<string>();
    private keyCodeState: Set<string> = new Set<string>();
    private mbState: Set<number> = new Set<number>();
    public currentMousePos: Vector2 = new Vector2(0, 0);

    public isLeftMouseDown(): boolean {
        return this.mbState.has(0);
    }

    constructor(game: GameBase) {
        this.game = game;

        window.addEventListener("keydown", (e) => {this.handleKeyDown(e)})
        window.addEventListener("keyup", (e) => {this.handleKeyUp(e)})
        window.addEventListener("mousedown", (e) => {this.handleMouseDown(e)})
        window.addEventListener("mouseup", (e) => {this.handleMouseUp(e)})
        window.addEventListener("mousemove", (e) => {this.handleMouseMove(e)})
    }

    private currentCursorType: CursorType = CursorType.Default;
    private updatedThisFrame = false;

    public onPreRender() {
        this.game.onMouseMove(new MouseEventBase(this.currentMousePos));
    }

    public onPostRender() {
        var cursor = "default";
        if (this.updatedThisFrame) {
            switch (this.currentCursorType) {
                case CursorType.Default:
                    cursor = "default";
                    break;
                case CursorType.Button:
                    cursor = "pointer";
                    break;
                case CursorType.Text:
                    cursor = "text";
                    break;
            }
        }
        this.game.rendererDiv.style.cursor = cursor;
        this.currentCursorType = CursorType.Default;
        this.updatedThisFrame = false;
    }

    public setCursorType(type: CursorType) {
        this.updatedThisFrame = true;
        this.currentCursorType = type;
    }

    protected handleMouseDown(e: MouseEvent) {
        this.updateMousePos(e);
        this.mbState.add(e.button);

        this.game.onMouseDown(new MouseDownEvent(0, false, this.currentMousePos));
    }

    protected handleMouseUp(e: MouseEvent) {
        this.updateMousePos(e);
        this.mbState.delete(e.button);

        this.game.onMouseUp(new MouseUpEvent(0, this.currentMousePos));
    }

    protected handleMouseMove(e: MouseEvent) {
        this.updateMousePos(e);

        //Event will be handled in pre render
    }

    protected handleKeyDown(e: KeyboardEvent) {
        this.keyCharState.add(e.key);
        this.keyCodeState.add(e.code);

        this.game.onKeyDown(new KeyboardDownEvent(e.key, e.code, e.repeat))
    }

    protected handleKeyUp(e: KeyboardEvent) {
        this.keyCharState.delete(e.key);
        this.keyCodeState.delete(e.code);

        this.game.onKeyUp(new KeyboardUpEvent(e.key, e.code))
    }

    private updateMousePos(e: MouseEvent) {
        this.currentMousePos.x = e.clientX;
        this.currentMousePos.y = e.clientY;
    }
}