import { BoxDrawable } from "../graphics/box-drawable";
import { Container } from "../graphics/container";
import { Color } from "../util/color";
import { Vector2 } from "../util/vectors";
import { PlayerListItem } from "./player-list-item";
import { PlayerListPlayer } from "./player-list-player";
import { World } from "./world";

export class PlayerList extends Container {
    protected readonly world: World;
    protected readonly background: BoxDrawable;
    protected playerListCounter = 0;

    constructor(world: World) {
        super();

        this.world = world;
        this.absSize.x = 300;
        this.absSize.y = 200;

        this.children = [
            this.background = new BoxDrawable(),
        ]

        this.background.relSize = Vector2.one;
        this.background.fillColor = new Color(10, 10, 10, 160);
        this.background.cornerRadius = 12;

    }

    public updateList() {
        this.playerListCounter = 0;

        for (let child of this.children) {
            if (child instanceof PlayerListItem)
                this.removeChild(child);
        }

        for (let player of this.world.playerList) {
            this.addPlayer(player);
        }
    }

    protected addPlayer(player: PlayerListPlayer) {
        let item = new PlayerListItem(player);
        item.absPos.y += 4 + this.playerListCounter;
        this.playerListCounter += item.size.y + 4;
        this.addChildren(item);
    }
}