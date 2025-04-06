//Represents a game world containing letious entities

import { Entity } from "./entity";
import { Color } from "../util/color";
import { Vector2, Vector4 } from "../util/vectors";
import { EntityPlayer } from "./entity-player";
import { Container } from "../graphics/container";
import { WorldRenderer } from "./world-renderer";
import { Anchor, Drawable } from "../graphics/drawable";
import { TextDrawable } from "../graphics/text-drawable";
import { BoostBar } from "./boost-bar";
import { PowerButton } from "./power-button";
import { PowerBar } from "./power-bar";
import { GameStylizedTextDrawable } from "./game-text";
import { PlayerListPlayer } from "./player-list-player";
import { PlayerList } from "./player-list";
import { ConfirmRespawnPrompt } from "./confirm-respawn-prompt";
import { KeyboardDownEvent } from "../events/keyboard-down-event";
import { ChatHandler } from "./chat-handler";
import { Game } from "../game";
import { MpNetHandler } from "../play/mp-net-handler";
import { KeyboardUpEvent } from "../events/keyboard-up-event";

export class World extends Container {
    public lastUpdateTime: number;

    public cameraPos: Vector2 = new Vector2(0, 0);
    public gameSize: Vector2 = new Vector2(0, 0);//In pixels
    public gameScale: number = 0.9;
    public worldSize: Vector4 = new Vector4(0, 0, 0, 0);

    private minGameScale: number = 0.05;
    private maxGameScale: number = 2;

    public netHandler: MpNetHandler = Game.gameInstance.network.mpNetHandler;

    public worldName: string = "Unknown???";
    public entities: Array<Entity> = new Array<Entity>();
    public playerList: Array<PlayerListPlayer> = new Array<PlayerListPlayer>();
    public localPlayer: EntityPlayer;
    public localPlayerBoost: number;

    //Skap
    //public borderStyle: Color = new Color(15, 15, 15, 255);
    //public backgroundStyle: Color = new Color(40, 40, 40, 255);

    //Alt, cool
    //public borderStyle: Color = new Color(54, 17, 85, 255);
    //public backgroundStyle: Color = new Color(90, 22, 75, 255);

    //Another cool color combo
    //public borderStyle: Color = new Color(100, 20, 130, 255);//"rgb(60, 20, 100)";//
    //public backgroundStyle: Color = new Color(15, 15, 15, 255); //= "rgb(15, 15, 15)";//25 25 25

    //Op dark
    public borderStyle: Color = new Color(20, 20, 20, 255);
    public backgroundStyle: Color = new Color(10, 10, 10, 255);

    public worldRenderer: WorldRenderer = new WorldRenderer(this);
    public boostBar: BoostBar = new BoostBar(this);
    public stats: GameStylizedTextDrawable = new GameStylizedTextDrawable();
    public location: GameStylizedTextDrawable = new GameStylizedTextDrawable();
    public playerListDrawable: PlayerList = new PlayerList(this);
    public confirmRespawnPrompt: ConfirmRespawnPrompt = new ConfirmRespawnPrompt();

    //Chat
    public chatHandler: ChatHandler = new ChatHandler();

    constructor() {
        super();

        this.relSize = new Vector2(1, 1);

        this.children = [
            this.worldRenderer,
            this.boostBar,
            this.stats,
            this.location,
            this.playerListDrawable,
            this.chatHandler
        ];

        this.confirmRespawnPrompt.anchor = Anchor.BottomCenter;
        this.confirmRespawnPrompt.alignment = Anchor.BottomCenter;
        this.confirmRespawnPrompt.absPos.y -= 80;

        this.playerListDrawable.absPos = new Vector2(10, 10);

        this.boostBar.relSize = new Vector2(0.26, 0.03);
        this.boostBar.anchor = Anchor.BottomCenter;
        this.boostBar.alignment = Anchor.BottomCenter;
        this.boostBar.absPos = new Vector2(0, -10);

        this.stats.anchor = Anchor.TopRight;
        this.stats.alignment = Anchor.TopRight;
        this.stats.absPos = new Vector2(-12, 8);
        this.stats.fontSize = 16;
        this.stats.update = () => {
            this.stats.text = `Position ${~~this.localPlayer.renderPos.x}, ${~~this.localPlayer.renderPos.y} | Entity count ${this.entities.length} | World size ${this.worldSize.x}, ${this.worldSize.y}, ${this.worldSize.z}, ${this.worldSize.w}`;
        }

        this.location.fontSize = 30;
        this.location.anchor = Anchor.TopRight;
        this.location.alignment = Anchor.TopRight;
        this.location.absPos = new Vector2(-12, 34);
    }

    public override update(): void {
        super.update();

        if (this.gameScale < this.minGameScale)
            this.gameScale = this.minGameScale;
        if (this.gameScale > this.maxGameScale)
            this.gameScale = this.maxGameScale;

        this.location.text = this.worldName;
    }

    public override onKeyDown(event: KeyboardDownEvent): void {
        if (this.chatHandler.isFocused())
            return;

        super.onKeyDown(event);

        if (event.keyCode.toLowerCase() == "u")
            this.gameScale -= 0.2;
        if (event.keyCode.toLowerCase() == "i")
            this.gameScale += 0.2;

        if (event.keyCode.toLowerCase() === 'w')
            this.netHandler.sendMovementKey(1, true);
        if (event.keyCode.toLowerCase() === 'a')
            this.netHandler.sendMovementKey(2, true);
        if (event.keyCode.toLowerCase() === 's')
            this.netHandler.sendMovementKey(3, true);
        if (event.keyCode.toLowerCase() === 'd')
            this.netHandler.sendMovementKey(4, true);
        if (event.keyCode.toLowerCase() === ' ')
            this.netHandler.sendMovementKey(5, true);
        if (event.keyCode.toLowerCase() === 'shift')
            this.netHandler.sendMovementKey(6, true);
        if (event.keyCode.toLowerCase() === 'r')
            this.netHandler.sendRespawnRequest();
    }

    public override onKeyUp(event: KeyboardUpEvent): void {
        if (event.keyCode.toLowerCase()  === 'w')
            this.netHandler.sendMovementKey(1, false);
        if (event.keyCode.toLowerCase()  === 'a')
            this.netHandler.sendMovementKey(2, false);
        if (event.keyCode.toLowerCase()  === 's')
            this.netHandler.sendMovementKey(3, false);
        if (event.keyCode.toLowerCase()  === 'd')
            this.netHandler.sendMovementKey(4, false);
        if (event.keyCode.toLowerCase()  === ' ')
            this.netHandler.sendMovementKey(5, false);
        if (event.keyCode.toLowerCase()  === 'shift') {
            this.netHandler.sendMovementKey(6, false);
        }

        if (this.chatHandler.isFocused())
            return;

        super.onKeyUp(event);
    }

    public getCameraPos(): Vector2 {
        if (this.localPlayer != null)
            return this.localPlayer.renderPos.copy().multiply(new Vector2(-1, -1));

        return new Vector2(0, 0);
    }

    public addEntity(entity: Entity) {
        this.entities.push(entity);

        this.entities.sort((a, b) => {
            return a.zIndex - b.zIndex;
        })
    }

    public removeEntity(entity: Entity) {
        let i = this.entities.indexOf(entity);
        this.entities.splice(i, 1);
    }

    public getEntity(id: number): Entity {
        for (let entity of this.entities) {
            if (entity.entityId === id) {
                return entity;
            }
        }
        return null;
    }
}