import { Drawable } from "./drawable";
import { KeyboardDownEvent } from "../events/keyboard-down-event";
import { KeyboardUpEvent } from "../events/keyboard-up-event";
import { MouseDownEvent } from "../events/mouse-down-event";
import { MouseEventBase } from "../events/mouse-event";
import { MouseUpEvent } from "../events/mouse-up-event";

export class Container extends Drawable {
    private _children: Array<Drawable> = new Array<Drawable>();

    public get children(): Drawable[] {
        return this._children;
    }

    public set children(value: Drawable[]) {
        for (let drawable of value) {
            drawable.parent = this;
        }
        this._children = value;
    }

    constructor() {
        super();
    }

    public override update(): void {
        for (let child of this.children) {
            child.update();
        }
    }

    public override render(): void {
        for (let child of this.children) {
            child.render();
        }
    }

    public override onAdded(): void {
        for (let child of this.children) {
            child.onAdded();
        }
    }

    public override onRemoved(): void {
        for (let child of this.children) {
            child.onRemoved();
        }
    }

    public addChildren(drawable: Drawable): void {
        drawable.parent = this;
        this.children.push(drawable);

        drawable.onAdded();
    }

    public removeChild(drawable: Drawable): boolean {
        let index = this.children.indexOf(drawable);
        if (index == -1)
            return false;

        this.children.splice(index, 1);
        drawable.onRemoved();
        return true;
    }

    //TODO 9/7/2020: A cleaner way to do this / reduce common code.?

    public override onMouseDown(event: MouseDownEvent) {
        this._children.forEach((child) => {
            child.onMouseDown(event);
            if (event.propragating == false) {
                return;
            }
        });
    }
    public override onMouseUp(event: MouseUpEvent) {
        this._children.forEach((child) => {
            child.onMouseUp(event);
            if (event.propragating == false) {
                return;
            }
        });
    }
    public override onMouseMove(event: MouseEventBase) {
        this._children.forEach((child) => {
            child.onMouseMove(event);
            if (event.propragating == false) {
                return;
            }
        });
    }
    public override onKeyDown(event: KeyboardDownEvent) {
        this._children.forEach((child) => {
            child.onKeyDown(event);
            if (event.propragating == false) {
                return;
            }
        });
    }
    public override onKeyUp(event: KeyboardUpEvent) {
        this._children.forEach((child) => {
            child.onKeyUp(event);
            if (event.propragating == false) {
                return;
            }
        });
    }
}