import { BoxDrawable } from "../graphics/box-drawable";
import { Container } from "../graphics/container";
import { Anchor } from "../graphics/drawable";
import { Color } from "../util/color";
import { Vector2 } from "../util/vectors";
import { GameStylizedTextDrawable } from "./game-text";


export class SimplePrompt extends Container {
    protected readonly title: GameStylizedTextDrawable = new GameStylizedTextDrawable();
    protected readonly description: GameStylizedTextDrawable = new GameStylizedTextDrawable();
    protected readonly background: BoxDrawable = new BoxDrawable();

    public set backgroundColor(val: Color) {
        this.background.fillColor = val;
    }

    public set titleText(val: string) {
        this.title.text = val;
    }

    public set descText(val: string) {
        this.description.text = val;
    }

    constructor() {
        super();

        this.absSize = new Vector2(600, 200);

        this.children = [
            this.background,
            this.title,
            this.description
        ]

        this.background.relSize = Vector2.one;
        this.background.cornerRadius = 32;
        this.title.fontSize = 56;
        this.title.anchor = Anchor.TopCenter;
        this.title.alignment = Anchor.TopCenter;
        this.title.outlineWidth = 6;
        this.description.fontSize = 28;
        this.description.anchor = Anchor.TopCenter;
        this.description.alignment = Anchor.TopCenter;
        this.description.absPos.y += 50;
    }
}