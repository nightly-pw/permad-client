import { Color } from "../util/color";
import { SimplePrompt } from "./simple-prompt";

export class ConfirmRespawnPrompt extends SimplePrompt {
    constructor() {
        super();

        this.titleText = "Respawn";
        this.descText = "are you sure you want to respawn?";

        this.backgroundColor = new Color(200, 30, 80, 140);
    }
}