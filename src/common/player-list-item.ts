import { Container } from "../graphics/container";
import { Vector2 } from "../util/vectors";
import { GameStylizedTextDrawable } from "./game-text";
import { PlayerListPlayer } from "./player-list-player";


export class PlayerListItem extends Container {
    protected readonly player: PlayerListPlayer;
    protected readonly label: GameStylizedTextDrawable;

    constructor(player: PlayerListPlayer) {
        super();

        this.player = player;

        this.children = [
            this.label = new GameStylizedTextDrawable(),
        ];

        this.label.absPos.x += 8;
        this.label.fontSizeRel = 1;
        this.label.text = player.name + " | " + player.worldName;
        this.absSize.y = 16;
        this.relSize.x = 1;
    }
}