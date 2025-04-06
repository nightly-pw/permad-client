//Represents a game world containing various entities

/*import { Entity, EntityLava, EntityPlayer } from "../common/entity";
import { WorldBase } from "../common/world-base";
import { GAME_INSTANCE } from "../game";
import { Color } from "../util/color";
import { Vector2, Vector4 } from "../util/vectors";
import { StarParticleGenerator } from "./star-manager";

export class MultiplayerWorld extends WorldBase {
    public localPlayer: EntityPlayer;
    public boostAmount: number;

    public getCameraPos(): Vector2 {
        if (this.localPlayer != null)
            return this.localPlayer.position.copy().multiply(new Vector2(-1, -1));

        return new Vector2(0, 0);
    }

    public override renderHud(ctx: CanvasRenderingContext2D, cvs: HTMLCanvasElement): void {
        //HP bar
        ctx.save();
        const barWidth = 400;
        const barHeight = 35;
        ctx.fillStyle = "rgba(255, 40, 90, 0.9)";
        ctx.beginPath();
        ctx.roundRect(cvs.width / 2 - barWidth / 2, cvs.height - 10 - barHeight, barWidth, barHeight, 16);
        ctx.fill();
        ctx.fillStyle = "rgba(20, 200, 90, 0.9)";
        ctx.beginPath();
        ctx.roundRect(cvs.width / 2 - barWidth / 2, cvs.height - 10 - barHeight, barWidth * (this.boostAmount / 100), barHeight, 16);
        ctx.fill();
        ctx.restore();

        //Dead shit
        if (this.localPlayer.dead) {
            /*const grd = ctx.createLinearGradient(0, 0, cvs.width, 0);
            grd.addColorStop(0, "rgba(255, 0, 0, 0.3)");
            grd.addColorStop(0.2, "rgba(0, 0, 0, 0)");
            grd.addColorStop(0.8, "rgba(0, 0, 0, 0)");
            grd.addColorStop(1, "rgba(255, 0, 0, 0.3)");

            // Draw a filled Rectangle
            ctx.fillStyle = grd;
            
            ctx.fillRect(0, 0, cvs.width, cvs.height);*/

            
            /*ctx.textAlign = "center";
            ctx.shadowColor = "rgb(20, 20, 20)";
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.font = "30px Roboto, Arial, Helvetica, sans-serif";
            ctx.fillStyle = "rgb(230, 34, 34)";
            ctx.fillText("You died.", cvs.width / 2, 50);
            ctx.fillStyle = "rgb(230, 230, 230)";
            ctx.font = "20px Roboto, Arial, Helvetica, sans-serif";
            ctx.fillText("Press R to respawn, or wait for someone to revive you.", cvs.width / 2, 80);
        }
    }
}*/