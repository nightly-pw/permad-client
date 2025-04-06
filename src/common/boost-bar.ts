import { BoxDrawable } from "../graphics/box-drawable";
import { Container } from "../graphics/container";
import { Anchor } from "../graphics/drawable";
import { TextDrawable } from "../graphics/text-drawable";
import { Color } from "../util/color";
import { Vector2 } from "../util/vectors";
import { GameStylizedTextDrawable } from "./game-text";
import { World } from "./world";

export class BoostBar extends Container {
    public world: World;

    protected readonly boostBarOutline1: BoxDrawable;
    protected readonly boostBarOutline2: BoxDrawable;
    protected readonly possibleBoost: BoxDrawable;
    protected readonly availableBoost: BoxDrawable;
    protected readonly label: GameStylizedTextDrawable;

    constructor(world: World) {
        super();

        this.world = world;

        this.boostBarOutline1 = new BoxDrawable();
        this.boostBarOutline1.relSize = Vector2.one;
        this.boostBarOutline1.borderColor = new Color(20, 20, 20, 255);
        this.boostBarOutline1.cornerRadius = 10;
        this.boostBarOutline1.bordered = true;
        this.boostBarOutline1.borderWidth = 8;
        this.boostBarOutline2 = new BoxDrawable();
        this.boostBarOutline2.relSize = Vector2.one;
        this.boostBarOutline2.borderColor = new Color(55, 55, 55, 255);
        this.boostBarOutline2.cornerRadius = 10;
        this.boostBarOutline2.bordered = true;
        this.boostBarOutline2.borderWidth = 3;

        //rad 12
        this.possibleBoost = new BoxDrawable();
        this.possibleBoost.relSize = Vector2.one;
        this.possibleBoost.fillColor = new Color(255, 34, 90, 255);
        this.possibleBoost.cornerRadius = 12;

        this.availableBoost = new BoxDrawable();
        this.availableBoost.relSize = Vector2.one;
        this.availableBoost.fillColor = new Color(34, 240, 90, 255);
        this.availableBoost.cornerRadius = 12;
        
        this.label = new GameStylizedTextDrawable();
        this.label.alignment = Anchor.Center;
        this.label.anchor = Anchor.Center;
        this.label.absSize = new Vector2(0, 20);
        this.label.fillColor = new Color(160, 160, 160, 255);
        this.label.outlineWidth = 4;
        

        this.children = [
            this.possibleBoost,
            this.availableBoost,
            this.boostBarOutline1,
            this.boostBarOutline2,
        ];
    }

    public override update(): void {
        this.label.text = "" + ~~this.world.localPlayerBoost + " / 100";
        this.availableBoost.relSize.x = this.world.localPlayerBoost / 100;
    }
}