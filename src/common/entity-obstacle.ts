import { Game } from "../game";
import { ByteBuf } from "../util/bytebuf";
import { Color, getColorFromInt, getStyleString } from "../util/color";
import { Entity } from "./entity";

export class EntityObstacle extends Entity {
    public color: Color = Game.gameInstance.world.borderStyle;

    constructor() {
        super();
        
        this.zIndex = 1;
    }
    
    public render(ctx: CanvasRenderingContext2D, cvs: HTMLCanvasElement) {
        ctx.fillStyle = getStyleString(this.color);
        ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    }
    
    public override readEntityMetadata(buf: ByteBuf): void {
        //Bool is if the obstacle uses custom colors
        if (buf.readBool()) {
            this.color = getColorFromInt(buf.readInt());
        }
    }
}