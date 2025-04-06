import { Color } from "../util/color";
import { Drawable } from "./drawable";

export enum WrapDirection {
    Left, Center, Right
}

export class TextDrawable extends Drawable {
    public text: string = "";
    public fill: boolean = true;
    public fillColor: Color = Color.white;
    public outline: boolean = false;
    public outlineColor: Color = Color.black;
    public outlineWidth: number = 1;
    public shadow: boolean = false;
    public shadowColor: Color = Color.black;
    public shadowOffset: number = 4;
    public shadowWidth: number = 3;
    public font: string = "Roboto";
    public fontSize: number = 0;
    public fontSizeRel: number = 0;// This is used if you want the font size to be the same as the size of the parent.
    public fontWeight: number = 500;
    //public wrapAlignment: WrapDirection = WrapDirection.Left;
    public wrapping: boolean = false;
    public wrapMaxWidth: number = 0;
    public wordSpacing: number = 0;
    public baseline: CanvasTextBaseline = "top";

    public getTextHeight(lines: number) {
        return lines * this.calculatedFontSize;
    }

    public get calculatedFontSize() {
        return this.fontSizeRel * this.parentSize.y + this.fontSize;
    }

    public override render(): void {
        let ctx = this.renderer;
        ctx.font = getFontString(this.font, this.calculatedFontSize, this.fontWeight);
        let width = this.wrapping ? this.wrapMaxWidth : ctx.measureText(this.text).width + ((this.text.split(" ").length) * this.wordSpacing);
        ctx.direction = "ltr";
        ctx.textBaseline = this.baseline;
        var anyCvs = this.renderer as any;
        anyCvs.wordSpacing = this.wordSpacing + "px";

        let lines: string[] = [this.text];
        if (this.wrapping) {
            lines = fragmentText(this.text, this.wrapMaxWidth, this.renderer);
        }

        this.absSize.x = width;
        this.absSize.y = this.getTextHeight(lines.length);
        for (let i = 0; i < lines.length; i++) {
            let text = lines[i];
            let y = this.origin.y + i * this.getTextHeight(1);
            if (this.shadow) {
                ctx.fillStyle = this.getStyleString(this.shadowColor);
                ctx.fillText(text, this.origin.x + this.shadowOffset, y + this.shadowOffset);
            }
            if (this.outline) {
                ctx.lineWidth = this.outlineWidth;
                ctx.strokeStyle = this.getStyleString(this.outlineColor);
                ctx.strokeText(text, this.origin.x, y);
            }
            if (this.fill) {
                ctx.fillStyle = this.getStyleString(this.fillColor);
                ctx.fillText(text, this.origin.x, y);
            }
        }
    }

    private getStyleString(color: Color): string {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    }
}

export function fragmentText(text: string, maxWidth: number, ctx: CanvasRenderingContext2D): string[] {
    let words = text.split(' '),
        lines = [],
        line = "";
    if (ctx.measureText(text).width < maxWidth) {
        return [text];
    }
    while (words.length > 0) {
        while (ctx.measureText(words[0]).width >= maxWidth) {
            let tmp = words[0];
            words[0] = tmp.slice(0, -1);
            if (words.length > 1) {
                words[1] = tmp.slice(-1) + words[1];
            } else {
                words.push(tmp.slice(-1));
            }
        }
        if (ctx.measureText(line + words[0]).width < maxWidth) {
            line += words.shift() + " ";
        } else {
            lines.push(line);
            line = "";
        }
        if (words.length === 0) {
            lines.push(line);
        }
    }
    return lines;
}

export function getFontString(font: string, size: number, fontWeight: number = 500) {
    return fontWeight + " " + size + "px " + font + ", Arial, Helvetica, sans-serif";
}