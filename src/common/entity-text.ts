import { ByteBuf } from "../util/bytebuf";
import { Color, getColorFromInt, getStyleString } from "../util/color";
import { Entity } from "./entity";
import { GameStylizedTextDrawable } from "./game-text";

export class EntityText extends Entity {
    //public color: Color = {r: 38, g: 38, b: 120, a: 255};

    public text: string = "";
    public color: Color;
    public alignment: CanvasTextAlign = "left";

    constructor() {
        super();
        
        this.zIndex = 5;
    }
    
    public render(ctx: CanvasRenderingContext2D, cvs: HTMLCanvasElement) {
        ctx.textAlign = this.alignment;
        ctx.textBaseline = "middle";

        ctx.font = `40px ${GameStylizedTextDrawable.gameFontName}, Arial, Helvetica, sans-serif`;
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.lineWidth = 10;
        ctx.strokeText(this.text, 0, 0);
        ctx.fillStyle = getStyleString(this.color);
        ctx.fillText(this.text, 0, 0);
    }

    public override readEntityMetadata(buf: ByteBuf): void {
        this.text = buf.readString();
        this.color = getColorFromInt(buf.readInt());
        let alignment: number = buf.readByte();
        switch (alignment) {
            case 1:
                this.alignment = "center";
                break;
            case 2:
                this.alignment = "right";
                break;
            default:
                this.alignment = "left";
                break;
        }
    }
}