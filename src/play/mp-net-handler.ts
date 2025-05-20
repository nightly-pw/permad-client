import { Entity } from "../common/entity";
import { EntityBouncer } from "../common/entity-bouncer";
import { EntityDebugSpawner } from "../common/entity-debug-spawner";
import { EntityHarmlessBall } from "../common/entity-harmless-ball";
import { EntityLava } from "../common/entity-lava";
import { EntityLavaSpike } from "../common/entity-lava-spike";
import { EntityObstacle } from "../common/entity-obstacle";
import { EntityPlayer } from "../common/entity-player";
import { EntityTeleporter } from "../common/entity-teleporter";
import { EntityText } from "../common/entity-text";
import { PlayerListPlayer } from "../common/player-list-player";
import { World } from "../common/world";
import { Game } from "../game";
import { GameBase } from "../game-base";
import { NetworkClient } from "../net/net-client";
import { setListingsState } from "../react/PlayPage";
import { ByteBuf } from "../util/bytebuf";
import { getColorFromInt } from "../util/color";
import { Vector2 } from "../util/vectors";

export interface RoomListing {
    roomName: string,
    mapName: string,
    mapCreator: string,
    playerCount: number,
    official: boolean
}

export class MpNetHandler {
    private netClient: NetworkClient;
    private localPlayerEid: number;

    private keydownListener: (this: Window, ev: KeyboardEvent) => any;
    private keyupListener: (this: Window, ev: KeyboardEvent) => any;

    constructor(netClient: NetworkClient) {
        this.netClient = netClient;
    }

    private send(buf: ByteBuf) {
        this.netClient.send(buf);
    }

    private setupInput() {
        //test
        window.addEventListener("keydown", this.keydownListener);
        window.addEventListener("keyup", this.keyupListener);
    }

    private removeInput() {
        window.removeEventListener("keydown", this.keydownListener);
        window.removeEventListener("keyup", this.keyupListener);
    }

    public onMessage(buf: ByteBuf, pid: number) {
        if (this.getMpWorld() != null)
            this.getMpWorld().lastUpdateTime = Date.now();
        switch (pid) {
            case 2:
                this.handleEntitySpawn(buf);
                break;
            case 3:
                this.handleEntityPosition(buf);
                break;
            case 4:
                this.handleWorldInfo(buf);
                break;
            case 5:
                this.handleEntityDestroy(buf);
                break;
            case 6:
                this.handleLocalState(buf);
                break;
            case 7:
                this.handleEntMetadataUpdate(buf);
                break;
            case 9:
                this.handleChatMessage(buf);
                break;
            case 11:
                this.handleRoomPlayerList(buf);
                break;
            case 12:
                this.handleRoomListing(buf);
                break;
        }
    }
    
    public sendChatMessage(message: string) {
        let buf = ByteBuf.emptyBuffer();
        buf.writeInt(8);
        buf.writeString(message);
        this.send(buf);
    }

    public subscribeRoomListing() {
        let buf = ByteBuf.emptyBuffer();
        buf.writeInt(13);
        this.send(buf);
    }

    public joinRoomListing(roomName: string) {
        let buf = ByteBuf.emptyBuffer();
        buf.writeInt(14);
        buf.writeString(roomName);
        this.send(buf);
    }

    private handleRoomListing(buf: ByteBuf) {
        var listings = new Array<RoomListing>();
        var n = buf.readInt();
        for (let i = 0; i < n; i++) {
            listings.push(
                {
                    roomName: buf.readString(), 
                    mapName: buf.readString(), 
                    mapCreator: buf.readString(), 
                    playerCount: buf.readInt(), 
                    official: buf.readBool()
                }
            );
        }
        console.log('game 1')
        if (setListingsState != null) {
            console.log('game 2')
            setListingsState(listings);
        }
    }

    private getMpWorld(): World {
        return Game.gameInstance.world;
    }

    public sendMovementKey(dir: number, pressed: boolean) {
        let buf = ByteBuf.emptyBuffer();
        buf.writeInt(1);
        buf.writeByte(dir);
        buf.writeBool(pressed);
        this.send(buf);
    }

    public sendRespawnRequest() {
        let buf = ByteBuf.emptyBuffer();
        buf.writeInt(10);
        this.send(buf);
    }

    private handleWorldInfo(buf: ByteBuf) {
        console.log('handle world info')
        //Reset all previous world info (if any)
        //if (Game.gameInstance.world == null)
            Game.gameInstance.world = new World();
        Game.gameInstance.world.entities = [];

        let worldName = buf.readString();
        let sizeX = buf.readFloat();
        let sizeY = buf.readFloat();
        let sizeZ = buf.readFloat();
        let sizeW = buf.readFloat();
        this.localPlayerEid = buf.readInt();
        Game.gameInstance.world.worldName = worldName;
        Game.gameInstance.world.worldSize.x = sizeX;
        Game.gameInstance.world.worldSize.y = sizeY;
        Game.gameInstance.world.worldSize.z = sizeZ;
        Game.gameInstance.world.worldSize.w = sizeW;

        this.setupInput();
    }

    private handleEntitySpawn(buf: ByteBuf) {
        let eid = buf.readInt();
        let etid = buf.readInt();
        let ent: Entity;
        let pos = new Vector2(buf.readFloat(), buf.readFloat())
        let rot = buf.readFloat();
        let size = new Vector2(buf.readFloat(), buf.readFloat())
        switch (etid) {
            case 1:
                let player = new EntityPlayer()
                ent = player;
                if (eid == this.localPlayerEid)
                    this.getMpWorld().localPlayer = player;
                break;
            case 2:
                let obstacle = new EntityObstacle();
                ent = obstacle;
                break;
            case 3:
                let lava = new EntityLava();
                ent = lava;
                break;
            case 4:
                let teleporter = new EntityTeleporter();
                ent = teleporter;
                break;
            case 5:
                let bouncer = new EntityBouncer();
                ent = bouncer;
                break;
            case 6:
                let text = new EntityText();
                ent = text;
                break;
            /*case 7:
                let debugSpawner = new EntityDebugSpawner();
                ent = debugSpawner;
                break;*/
            case 8:
                let lavaSpike = new EntityLavaSpike();
                ent = lavaSpike;
                break;
            case 9:
                let harmlessBall = new EntityHarmlessBall();
                ent = harmlessBall;
                break;        

        }
        if (ent != null) {
            ent.entityId = eid;
            ent.lastServerPos = pos.copy();
            ent.serverPos = pos.copy();
            ent.renderPos = pos.copy();
            ent.rot = rot;
            ent.size = size;
            ent.readEntityMetadata(buf);
            Game.gameInstance.world.addEntity(ent)
            console.log("entity spawned with id " + eid)
        }
    }

    private handleEntityDestroy(buf: ByteBuf) {
        let eid = buf.readInt();
        let ent = Game.gameInstance.world.getEntity(eid);
        Game.gameInstance.world.removeEntity(ent);
    }

    private handleEntityPosition(buf: ByteBuf) {
        let eid = buf.readInt();
        let entity = Game.gameInstance.world.getEntity(eid);
        let x = buf.readFloat();
        let y = buf.readFloat();
        let rot = buf.readFloat();
        if (entity == null) {
            console.log("null ent: id = " + eid)
            return;
        }
        entity.lastServerPos = entity.serverPos.copy();
        entity.serverPos.x = x;
        entity.serverPos.y = y;
        entity.rot = rot;
    }

    private handleLocalState(buf: ByteBuf) {
        let boostAmount = buf.readFloat();

        this.getMpWorld().localPlayerBoost = boostAmount;
    }

    private handleEntMetadataUpdate(buf: ByteBuf) {
        let eid = buf.readInt();
        let entity = Game.gameInstance.world.getEntity(eid);
        if (entity == null) {
            console.log("null ent: id = " + eid)
            return;
        }
        entity.readEntityMetadata(buf);    
    }

    private handleRoomPlayerList(buf: ByteBuf) {
        let playerCount = buf.readInt();
        this.getMpWorld().playerList = new Array<PlayerListPlayer>();
        for (let i = 0; i < playerCount; i++) {
            let player = new PlayerListPlayer(buf.readString(), getColorFromInt(buf.readInt()), buf.readString());
            this.getMpWorld().playerList.push(player);
        }

        this.getMpWorld().playerListDrawable.updateList();
    }

    private handleChatMessage(buf: ByteBuf) {
        let msg = buf.readString();
        console.log(msg);
        Game.gameInstance.world.chatHandler.addChatMessage(msg);
    }
}