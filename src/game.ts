import { World } from "./common/world";
import { KeyboardDownEvent } from "./events/keyboard-down-event";
import { GameBase } from "./game-base";
import { NetworkClient } from "./net/net-client";

export class Game extends GameBase {
    private static _gameInstance: Game;

    public static get gameInstance(): Game {
        return this._gameInstance;
    }

    public network: NetworkClient;
    private _world: World;

    private uiDiv: HTMLDivElement = document.getElementById("ui") as HTMLDivElement;

    constructor() {
        super();
        Game._gameInstance = this;

        document.addEventListener("keydown", (key) => {
            if (key.key == "Escape" && this._world != null) {
                this.uiDiv.hidden = !this.uiDiv.hidden;
            }
        })
    }

    public override onKeyDown(event: KeyboardDownEvent): void {
        if (this.uiDiv.hidden && this._world != null)
            super.onKeyDown(event);
    }

    public override update(): void {
        super.update();
    }

    public get world(): World {
        return this._world;
    }

    public set world(world: World) {
        if (this.world != null) {
            this.removeChild(this._world);
        }
        if (world != null) {
            this._world = world;
            this.addChildren(this._world);
        }
        this.uiDiv.hidden = true;
    }

    protected onLoad(): void {
        // busy waiting
        this.network = new NetworkClient();
    }

    public triggerNotification(header: string, desc: string) {
        let notiDiv = document.getElementById("notification-div") as HTMLDivElement;
        notiDiv.classList.remove("notification-div-hidden");
        let notiHeader = document.getElementById("notification-header") as HTMLHeadingElement;
        let notiText = document.getElementById("notification-text") as HTMLHeadingElement;
        notiHeader.innerText = header;
        notiText.innerText = desc;
        setTimeout(() => {
            notiDiv.classList.add("notification-div-hidden");
        }, 3500)
    }
}