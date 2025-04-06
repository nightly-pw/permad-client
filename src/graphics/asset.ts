import { Vector4 } from "../util/vectors";

export class AssetManager {
    public loadSprite(id: string, pathSrc: string, repetitionStyle = RepetitionStyle.NoRepeat): Sprite {
        let image = new Image();
        image.src = pathSrc;
        let sprite = new Sprite(image, repetitionStyle);
        image.onload = () => {
            sprite.load();
        }
        return sprite;
    }
}

export class RepetitionStyle {
    static readonly Repeat = new RepetitionStyle("repeat", true, true);
    static readonly RepeatX = new RepetitionStyle("repeat-x", true, false);
    static readonly RepeatY = new RepetitionStyle("repeat-y", false, true);
    static readonly NoRepeat = new RepetitionStyle("no-repeat", false, false);

    public styleId: string;
    public repeatsX: boolean;
    public repeatsY: boolean;

    private constructor(styleId: string, repeatsX: boolean, repeatsY: boolean) {
        this.styleId = styleId;
        this.repeatsX = repeatsX;
        this.repeatsY = repeatsY;
    }
}

export class Sprite {
    public image: HTMLImageElement;
    public repetitionStyle: RepetitionStyle = RepetitionStyle.NoRepeat;
    private _imageCoords: Vector4 = null;

    constructor(image: HTMLImageElement, repetitionStyle: RepetitionStyle) {
        this.image = image
        this.repetitionStyle = repetitionStyle
    }

    public get imageCoords(): Vector4 {
        if (this._imageCoords == null) {
            return new Vector4(0, 0, this.image.width, this.image.height)
        }
        return this._imageCoords
    }

    public set imageCoords(value: Vector4) {
        this._imageCoords = value;
    }

    public load(): void {
        //can maybe be removed in the future?
    }
}