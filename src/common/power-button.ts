import { BoxDrawable } from "../graphics/box-drawable";
import { Container } from "../graphics/container";
import { Anchor } from "../graphics/drawable";
import { TextDrawable } from "../graphics/text-drawable";
import { Color } from "../util/color";
import { Vector2 } from "../util/vectors";

export class PowerButton extends Container {
    protected readonly background: BoxDrawable;
    protected readonly labelDrawable: TextDrawable;

    public set label(val: string) {
        this.labelDrawable.text = val;
    }

    constructor() {
        super();

        this.background = new BoxDrawable();        
        this.background.relSize = new Vector2(0.85, 0.85);
        this.background.anchor = Anchor.Center;
        this.background.alignment = Anchor.Center;
        this.background.bordered = true;
        this.background.borderWidth = 2;
        this.background.borderColor = new Color(34, 34, 34, 255);
        this.background.cornerRadius = 10;
        
        this.labelDrawable = new TextDrawable();
        this.labelDrawable.absSize.y = 18;
        this.labelDrawable.absPos = new Vector2(0, 0);
        this.labelDrawable.fillColor = new Color(124, 234, 206, 255);
        this.labelDrawable.alignment = Anchor.TopLeft;

        this.children = [
            this.background,
        ];
    }
}