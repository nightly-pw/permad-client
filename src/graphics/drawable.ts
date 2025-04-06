import { KeyboardDownEvent } from "../events/keyboard-down-event";
import { KeyboardUpEvent } from "../events/keyboard-up-event";
import { MouseDownEvent } from "../events/mouse-down-event";
import { MouseEventBase } from "../events/mouse-event";
import { MouseUpEvent } from "../events/mouse-up-event";
import { GameBase } from "../game-base";
import { Vector2 } from "../util/vectors";
import { Container } from "./container";

// Anchor class and drawable architecture taken from https://github.com/ppy/osu-framework (MIT)
export enum Anchor {
    X0 = 1,
    X1 = 1 << 1,
    X2 = 1 << 2,
    Y0 = 1 << 3,
    Y1 = 1 << 4,
    Y2 = 1 << 5,
    TopLeft = X0 | Y0,
    TopCenter = X1 | Y0,
    TopRight = X2 | Y0,
    CenterLeft = X0 | Y1,
    Center = X1 | Y1,
    CenterRight = X2 | Y1,
    BottomLeft = X0 | Y2,
    BottomCenter = X1 | Y2,
    BottomRight = X2 | Y2
}

export abstract class Drawable {
    public parent: Container = null;
    public anchor: Anchor = Anchor.TopLeft;
    public alignment: Anchor = Anchor.TopLeft;
    public relPos: Vector2 = new Vector2(0, 0);
    public absPos: Vector2 = new Vector2(0, 0);
    public relSize: Vector2 = new Vector2(0, 0);
    public absSize: Vector2 = new Vector2(0, 0);
    
    public set anchorAlign(val: Anchor) {
        this.anchor = val;
        this.alignment = val;
    }

    public get renderer(): CanvasRenderingContext2D {
        return GameBase.baseInstance.context2D;
    }

    public get origin(): Vector2 {
        let size = this.size;
        let parentSize = this.parent == null ? new Vector2(0, 0).copy() : this.parent.size
        let origin = this.parent == null ? new Vector2(0, 0).copy() : this.parent.origin

        //Set the origin to the anchor specified
        if ((this.anchor & Anchor.X1) === Anchor.X1) {
            origin.x += parentSize.x / 2;
        } else if ((this.anchor & Anchor.X2) === Anchor.X2) {
            origin.x += parentSize.x;
        }
        if ((this.anchor & Anchor.Y1) === Anchor.Y1) {
            origin.y += parentSize.y / 2;
        } else if ((this.anchor & Anchor.Y2) === Anchor.Y2) {
            origin.y += parentSize.y;
        }

        //Offset the origin by the alignment specified
        if ((this.alignment & Anchor.X1) === Anchor.X1) {
            origin.x -= size.x / 2;
        } else if ((this.alignment & Anchor.X2) === Anchor.X2) {
            origin.x -= size.x;
        }
        if ((this.alignment & Anchor.Y1) === Anchor.Y1) {
            origin.y -= size.y / 2;
        } else if ((this.alignment & Anchor.Y2) === Anchor.Y2) {
            origin.y -= size.y;
        }

        //Offset origin by the absolute position specified
        origin.x += this.absPos.x;
        origin.y += this.absPos.y;

        //Offset the origin by the relative position specified
        origin.x += this.relPos.x * parentSize.x;
        origin.y += this.relPos.y * parentSize.y;

        return origin;
    }

    public get size(): Vector2 {
        if (this.relSize === new Vector2(0, 0)) {
            return this.absSize.copy();
        }

        let parentSize = this.parent == null ? new Vector2(0, 0) : this.parent.size;
        return new Vector2(this.relSize.x * parentSize.x + this.absSize.x, this.relSize.y * parentSize.y + this.absSize.y)
    }

    public get parentSize(): Vector2 {
        return this.parent == null ? new Vector2(0, 0) : this.parent.size;
    }

    public isInside(vec: Vector2): boolean {
        return vec.x > this.origin.x && vec.y > this.origin.y && vec.x < this.origin.x + this.size.x && vec.y < this.origin.y + this.size.y;
    }

    public update(): void {}
    public render(): void {}

    //Container events, each method should only be called once and in order
    public onAdded() {}
    public onRemoved() {}

    //Events
    public onMouseDown(event: MouseDownEvent) {}
    public onMouseUp(event: MouseUpEvent) {}
    public onMouseMove(event: MouseEventBase) {}
    public onKeyDown(event: KeyboardDownEvent) {}
    public onKeyUp(event: KeyboardUpEvent) {}

    //Macros for event-handling
}