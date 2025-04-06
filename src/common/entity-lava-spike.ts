import { Color, getStyleString } from "../util/color";
import { Entity } from "./entity";

export class EntityLavaSpike extends Entity {
    public color: Color = new Color(224, 34, 34, 255);

    constructor() {
        super();
        
        this.zIndex = 3;
    }

    public render(ctx: CanvasRenderingContext2D, cvx: HTMLCanvasElement): void {
        ctx.fillStyle = getStyleString(this.color);
        ctx.beginPath();
        ctx.arc(0, 0, (this.size.x + this.size.y) / 4, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.lineWidth = 3;
        ctx.arc(0, 0, (this.size.x + this.size.y) / 4, 0, 2*Math.PI);
        ctx.stroke();
        ctx.closePath();
    }
}