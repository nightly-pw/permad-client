import { Color, getStyleString } from "../util/color";
import { Entity } from "./entity";

export class EntityBouncer extends Entity {
    public color: Color = new Color(34, 200, 90, 255);

    constructor() {
        super();
        
        this.zIndex = 3;
    }

    public render(ctx: CanvasRenderingContext2D, cvx: HTMLCanvasElement): void {
        ctx.fillStyle = getStyleString(this.color);
        ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    }
}