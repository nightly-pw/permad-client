import { Game } from "../game";
import { ByteBuf } from "../util/bytebuf";
import { getStyleString } from "../util/color";
import { Entity } from "./entity";
import { GameStylizedTextDrawable } from "./game-text";

export class EntityTeleporter extends Entity {
    //public color: Color = {r: 38, g: 38, b: 120, a: 255};

    public tpName: string = "";
    public playerCount: number;
    public dir: number;

    constructor() {
        super();
        
        this.zIndex = 2;
    }
    
    public render(ctx: CanvasRenderingContext2D, cvs: HTMLCanvasElement) {
        // Commented in favor of the skap style teleporter
        //ctx.fillStyle = getStyleString(this.color);
        //let gradient: CanvasGradient;
        //if (this.dir == 1 || 3) {
        //    gradient = ctx.createLinearGradient(-this.size.x / 2, 0, this.size.x / 2, 0);
        //    gradient.addColorStop(0, GAME_INSTANCE.world.backgroundStyle);
        //    gradient.addColorStop(1, GAME_INSTANCE.world.borderStyle);
        //}
//
        //if (gradient != null) {
        //    ctx.fillStyle = gradient;
        //    ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        //}
        ////ctx.fillStyle = "#ffffff";
        //ctx.strokeStyle = "rgba(120, 50, 220, 1)";
        ////ctx.fillStyle = "rgba(0, 0, 0, 0)";
        //ctx.lineWidth = 2;
        //ctx.beginPath();
        //ctx.arc(0, 0, this.size.x / 2, 0, 2 * Math.PI);
        //ctx.closePath();
        //ctx.stroke();
//
        //let tpName = this.tpName;
        //let playingDesc = this.playerCount + " playing";
        //let tpDesc = "touch to play"
        //ctx.textAlign = "center";
        //ctx.textBaseline = "bottom";
//
        //let nameSize = this.size.y / 4.5 + 2;
        //let descSize = nameSize - 8;
//
        //ctx.fillStyle = "#ffffff";
        //ctx.font = "normal 700 " + nameSize + `px ${GameStylizedTextDrawable.gameFont.family}, Arial, Helvetica, sans-serif`;
        //ctx.fillText(tpName, 0, -this.size.y / 2 - 56);
//
        //ctx.fillStyle = "rgb(10, 200, 80)";
        //ctx.font = "normal 100 " + descSize + `px ${GameStylizedTextDrawable.gameFont.family}, Arial, Helvetica, sans-serif`;
        //ctx.fillText(playingDesc, 0, -this.size.y / 2 - 36);
//
        //ctx.fillStyle = "#cccccc";
        //ctx.font = "normal 100 " + descSize + `px ${GameStylizedTextDrawable.gameFont.family}, Arial, Helvetica, sans-serif`;
        //ctx.fillText(tpDesc, 0, -this.size.y / 2 - 16);
        let gradient: CanvasGradient;
        switch (this.dir) {
            case 0:
                gradient = ctx.createLinearGradient(0, -this.size.y / 2, 0, this.size.y / 2);
                gradient.addColorStop(0, getStyleString(Game.gameInstance.world.backgroundStyle));
                gradient.addColorStop(1, getStyleString(Game.gameInstance.world.borderStyle));
                break;
            case 2:
                gradient = ctx.createLinearGradient(0, -this.size.y / 2, 0, this.size.y / 2);
                gradient.addColorStop(1, getStyleString(Game.gameInstance.world.backgroundStyle));
                gradient.addColorStop(0, getStyleString(Game.gameInstance.world.borderStyle));
                break;
            case 1:
                gradient = ctx.createLinearGradient(-this.size.x / 2, 0, this.size.x / 2, 0);
                gradient.addColorStop(1, getStyleString(Game.gameInstance.world.backgroundStyle));
                gradient.addColorStop(0, getStyleString(Game.gameInstance.world.borderStyle));
                break;
            case 3:
                gradient = ctx.createLinearGradient(-this.size.x / 2, 0, this.size.x / 2, 0);
                gradient.addColorStop(0, getStyleString(Game.gameInstance.world.backgroundStyle));
                gradient.addColorStop(1, getStyleString(Game.gameInstance.world.borderStyle));
                break;
        }

        if (gradient != null) {
            ctx.fillStyle = gradient;
            ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        } else {
            ctx.fillStyle = "rgba(40, 40, 40, 1)";
            ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        }
    }

    public override readEntityMetadata(buf: ByteBuf): void {
        // Commented in favor of the skap style teleporter
        //this.tpName = buf.readString();
        //this.playerCount = buf.readInt();
        this.dir = buf.readByte();
    }
}