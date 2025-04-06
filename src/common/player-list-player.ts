import { Color } from "../util/color";


export class PlayerListPlayer {
    public name: string;
    public color: Color;
    public worldName: string;

    constructor(name: string, color: Color, worldName: string) {
        this.name = name;
        this.color = color;
        this.worldName = worldName;
    }
}