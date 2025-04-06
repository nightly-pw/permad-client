import { Color } from "../util/color";
import { SpriteDrawable } from "./sprite-drawable";

export class BoxDrawable extends SpriteDrawable {
    public cornerRadii: number[] = [0, 0, 0, 0];
    public bordered: boolean = false;
    public borderColor: Color = new Color(0, 0, 0, 0);
    public borderWidth: number = 2;
    public filled: boolean = true;
    public fillColor: Color = new Color(0, 0, 0, 0);

    public set cornerRadius(radius: number) {
        this.cornerRadii = [radius, radius, radius, radius];
    }

    public override render(): void {
        let ctx = this.renderer;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(this.origin.x, this.origin.y, this.size.x, this.size.y, this.cornerRadii);
        ctx.closePath();

        if (this.filled)
            this.sprite == null ? this.styleColorFill(this.fillColor) : this.styleSpriteFill();

        if (this.bordered)
            this.styleColorStroke(this.borderWidth, this.borderColor)

        ctx.restore();
    }
}