import { Drawable } from "../graphics/drawable";
import { getStyleString } from "../util/color";
import { Vector2 } from "../util/vectors";
import { Entity } from "./entity";
import { World } from "./world";


export class WorldRenderer extends Drawable {
    protected readonly world: World;

    public hitboxes: boolean = true;

    constructor(world: World) {
        super();

        this.world = world;
        this.world.relSize = new Vector2(1, 1);
    }

    public override render(): void {
        this.renderWorldGame();
    }

    public override update(): void {
        super.update();

        //Interpolated entity positions
        this.world.entities.forEach((ent) => {
            var o = (Date.now() - this.world.lastUpdateTime) / (1000/60);
            if (o > 1) o = 1;
            ent.renderPos = ent.lastServerPos.copy();
            ent.renderPos.x += (ent.serverPos.x - ent.lastServerPos.x) * o;
            ent.renderPos.y += (ent.serverPos.y - ent.lastServerPos.y) * o;
        });
    }

    protected renderWorldGame() {
        this.renderer.save();

        //Draw map border
        this.renderer.fillStyle = getStyleString(this.world.borderStyle);
        this.renderer.fillRect(0, 0, this.renderer.canvas.width, this.renderer.canvas.height);

        //Set transform so that 0,0 is the position of the player
        this.world.gameSize = new Vector2(this.renderer.canvas.width, this.renderer.canvas.height);
        this.world.cameraPos = this.world.getCameraPos();

        this.renderer.translate((this.world.cameraPos.x * this.world.gameScale) + this.world.gameSize.x / 2, (this.world.cameraPos.y * this.world.gameScale) + this.world.gameSize.y / 2);
        this.renderer.scale(this.world.gameScale, this.world.gameScale);

        //Draw map world size onto the world
        this.renderer.fillStyle = getStyleString(this.world.backgroundStyle);
        this.renderer.fillRect(this.world.worldSize.x - 4, this.world.worldSize.y - 4, this.world.worldSize.z - this.world.worldSize.x + 8, this.world.worldSize.w - this.world.worldSize.y + 8);

        //Draw entities
        this.world.entities.forEach(entity => {
            this.renderEntity(entity);
        });

        this.renderer.restore();
    }

    protected renderEntity(entity: Entity) {
        this.renderer.save();
        this.renderer.translate(entity.renderPos.x, entity.renderPos.y);
        this.renderer.rotate((entity.rot) * (Math.PI / 180));
        entity.render(this.renderer, this.renderer.canvas);

        if (this.hitboxes) {
            this.renderer.lineWidth = 2;
            this.renderer.strokeStyle = "rgba(255, 255, 0, 1)";
            this.renderer.strokeRect(-entity.size.x / 2, -entity.size.y / 2, entity.size.x, entity.size.y);
        }
        this.renderer.restore();
    }
}