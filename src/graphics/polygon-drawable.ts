import { Color } from "../util/color";
import { Vector2 } from "../util/vectors";
import { SpriteDrawable } from "./sprite-drawable";

export class PolygonDrawable extends SpriteDrawable {
    public bordered: boolean = false;
    public borderColor: Color = new Color(0, 0, 0, 0);
    public borderWidth: number = 2;
    public filled: boolean = true;
    public fillColor: Color = new Color(0, 0, 0, 0);
    public vertices: Vector2[] = [new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)];

    public override render(): void {
        let ctx = this.renderer;
        ctx.save();
        ctx.beginPath()
        for (let vertex of this.vertices) {
            if (vertex == this.vertices[0])
                ctx.moveTo(Math.round(vertex.x * this.size.x + this.origin.x), Math.round(vertex.y * this.size.y + this.origin.y))
            ctx.lineTo(Math.round(vertex.x * this.size.x + this.origin.x), Math.round(vertex.y * this.size.y + this.origin.y))
        }
        ctx.closePath()

        if (this.filled)
            this.sprite == null ? this.styleColorFill(this.fillColor) : this.styleSpriteFill();

        if (this.bordered)
            this.styleColorStroke(this.borderWidth, this.borderColor)

        ctx.restore()
    }
}