import { Color } from "../util/color";
import { Drawable } from "../graphics/drawable";
import { TextDrawable, WrapDirection, getFontString } from "../graphics/text-drawable";

export class GameStylizedTextDrawable extends TextDrawable {
    public static gameFontName: string = "Rubik";
    //public static gameFont: FontFace = new FontFace(this.gameFontName, "url(/assets/ARCADECLASSIC.TTF)");
    public static gameFont: FontFace = new FontFace(this.gameFontName, "url(https://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4iFV0U1.woff2)");

    constructor() {
        super();

        this.font = GameStylizedTextDrawable.gameFontName;
        this.outline = true;
        this.outlineWidth = 4;
        this.outlineColor = new Color(24, 24, 24, 255);
    }
}