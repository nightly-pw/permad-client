import { World } from "./common/world";
import { Game } from "./game";
import { AssetManager } from "./graphics/asset";
import { BoxDrawable } from "./graphics/box-drawable";
import { Container } from "./graphics/container";
import { Anchor } from "./graphics/drawable";
import { TextDrawable } from "./graphics/text-drawable";
import { InputManager } from "./input/input";
import { NetworkClient } from "./net/net-client";
import { Vector2 } from "./util/vectors";

export abstract class GameBase extends Container {
    protected static _baseGameInstance: GameBase;

    public static get baseInstance(): GameBase {
        return this._baseGameInstance;
    }

    public rendererDiv: HTMLDivElement;
    protected frontCanvas: HTMLCanvasElement;
    protected backCanvas: HTMLCanvasElement;
    protected backContext2D: CanvasRenderingContext2D;
    protected frontContext2D: CanvasRenderingContext2D;

    public get context2D(): CanvasRenderingContext2D {
        return this.backContext2D;
    }

    public input: InputManager;
    public assets: AssetManager;

    constructor() {
        super();

        GameBase._baseGameInstance = this;
    }

    public start() {
        this.logStylized("permad-game | https://github.com/premiering/permad-client", "#ff4fe2");
        if (this.load())
            this.renderLoop();
    }

    private load(): boolean {
        this.rendererDiv = document.getElementById("renderer-div") as HTMLDivElement;
        this.frontCanvas = document.getElementById("render-canvas") as HTMLCanvasElement;
        this.backCanvas = document.createElement("canvas");
        this.rendererDiv.hidden = false;
        this.frontCanvas.hidden = false;
        this.backCanvas.hidden = false;
        this.frontContext2D = this.frontCanvas.getContext("2d");
        this.backContext2D = this.backCanvas.getContext("2d");
        if (this.context2D == null)
            return false;

        this.input = new InputManager(this);
        this.assets = new AssetManager();

        this.onLoad();

        return true;
    }

    private renderLoop(): void {
        this.updateSize();

        try {
            this.input.onPreRender();

            this.context2D.fillStyle = "rgba(0, 0, 0, 1)";
            this.context2D.fillRect(0, 0, this.frontCanvas.width, this.frontCanvas.height);
            this.update();
            this.render();

            this.frontContext2D.clearRect(0, 0, window.innerWidth, window.innerHeight);
            this.frontContext2D.drawImage(this.backCanvas, 0, 0);

            this.input.onPostRender();
        } catch (e) {
            console.error(e);
        }
        window.requestAnimationFrame(() => {this.renderLoop();});
    }

    protected updateSize(): void {
        this.frontCanvas.width = window.innerWidth;
        this.frontCanvas.height = window.innerHeight;
        this.backCanvas.width = window.innerWidth;
        this.backCanvas.height = window.innerHeight;

        this.absSize.x = this.frontCanvas.width;
        this.absSize.y = this.frontCanvas.height;
    }

    public logStylized(s: string, color: string) {
        console.log("%c" + s, `background: rgb(20, 20, 20); color: ${color}; font-size: 16px;`);
    }

    protected abstract onLoad(): void;
}