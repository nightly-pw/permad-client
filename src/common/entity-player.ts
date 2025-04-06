import { TextDrawable, getFontString } from "../graphics/text-drawable";
import { ByteBuf } from "../util/bytebuf";
import { Color, getColorFromInt, getStyleString } from "../util/color";
import { Vector2 } from "../util/vectors";
import { Entity } from "./entity";
import { GameStylizedTextDrawable } from "./game-text";

export class EntityPlayer extends Entity {
    public name: string = "unnamed";
    public color: Color = Color.white;
    public deadColor: Color = new Color(255, 40, 80, 255);
    public dead: boolean = false;

    private lastPositions: Array<Vector2> = new Array<Vector2>();

    constructor() {
        super();
        
        this.zIndex = Number.MAX_VALUE;
    }

    public render(ctx: CanvasRenderingContext2D, cvx: HTMLCanvasElement): void {
        //Update player trail
        this.lastPositions.push(this.renderPos.copy());
        if (this.lastPositions.length > 400) {
            this.lastPositions.shift();
        }

        //Render player trail
        ctx.beginPath();
        for (var i = 0; i < this.lastPositions.length; i++) {
            var vec = this.lastPositions[i].subtract(this.renderPos);
            ctx.lineTo(vec.x, vec.y);
        }
        ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.6)`;
        ctx.lineWidth = 4;
        ctx.stroke();    

        ctx.beginPath();
        ctx.fillStyle = getStyleString(this.dead ? this.deadColor : this.color);
        ctx.roundRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y, this.size.y / 2);//why avg, idk
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.beginPath();
        ctx.textBaseline = "bottom";
        ctx.font = getFontString(GameStylizedTextDrawable.gameFontName, 17);
        ctx.lineWidth = 4;

        let offset = 0;
        if (this.dead) {
            ctx.strokeText("Dead", -(ctx.measureText("Dead")).width / 2., -26);
            ctx.fillStyle = getStyleString(this.deadColor);
            ctx.fillText("Dead", -(ctx.measureText("Dead").width / 2), -26);
            offset += 20;
        }

        ctx.fillStyle = "#ffffff";
        ctx.strokeText(this.name, -(ctx.measureText(this.name).width / 2), -26 - offset);
        ctx.fillText(this.name, -(ctx.measureText(this.name).width / 2), -26 - offset);  
    }

    public override readEntityMetadata(buf: ByteBuf): void {
        this.name = buf.readString();
        this.dead = buf.readBool();
        this.color = getColorFromInt(buf.readInt());
    }
}