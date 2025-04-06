import { Entity } from "./entity";

export class EntityDebugSpawner extends Entity {
    public override render(ctx: CanvasRenderingContext2D, cvx: HTMLCanvasElement): void {
        ctx.fillStyle = "rgba(0, 255, 0, 0.3";
        ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    }
}