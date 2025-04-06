import { Container } from "../graphics/container";
import { Anchor } from "../graphics/drawable";
import { Vector2 } from "../util/vectors";
import { PowerButton } from "./power-button";
import { World } from "./world";

// Testing..
export class PowerBar extends Container {
    public world: World;

    protected buttons: PowerButton[] = new Array<PowerButton>();
    protected readonly buttonCount: number = 2;

    constructor(world: World) {
        super();

        this.world = world;
        this.absSize = new Vector2(120, 20);

        let n = (this.absSize.x / this.buttonCount);

        for (let i = 0; i < this.buttonCount; i++) {
            let button = new PowerButton();
            button.absSize = new Vector2(n, n);
            button.absPos.y += this.absSize.y - n / 2;
            button.absPos.x += i * n;
            button.label = "" + i;
            this.addChildren(button);
        }
    }
}