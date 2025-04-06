import { Color } from "../util/color";
import { Vector2 } from "../util/vectors";
import { RepetitionStyle, Sprite } from "./asset";
import { Drawable } from "./drawable";

export abstract class SpriteDrawable extends Drawable {
    public sprite: Sprite = null;
    public repetitionSize: Vector2 = new Vector2(0, 0);

    protected styleColorFill(color: Color) {
        this.renderer.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
        this.renderer.fill();
    }

    protected styleColorStroke(borderWidth: number, color: Color) {
        this.renderer.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
        this.renderer.lineWidth = borderWidth;
        this.renderer.stroke();
    }

    protected styleSpriteFill() {
        let ctx = this.renderer;
        ctx.clip();
        if (this.sprite.repetitionStyle != RepetitionStyle.NoRepeat) {
            let xRepetitions = 0;
            let yRepetitions = 0;

            if (this.sprite.repetitionStyle.repeatsX) {
                xRepetitions = this.size.x / this.repetitionSize.x;
            }
            if (this.sprite.repetitionStyle.repeatsY) {
                yRepetitions = this.size.y / this.repetitionSize.y;
            }

            if (xRepetitions == Infinity)
                xRepetitions = 0;
            
            if (yRepetitions == Infinity)
                yRepetitions = 0;

            for (let i = 0; i < xRepetitions; i++) {
                for (let j = 0; j < yRepetitions; j++) {
                    ctx.drawImage(
                        this.sprite.image, 
                        this.sprite.imageCoords.x, 
                        this.sprite.imageCoords.y, 
                        this.sprite.imageCoords.z, 
                        this.sprite.imageCoords.w, 
                        this.origin.x + i * this.repetitionSize.x, 
                        this.origin.y + j * this.repetitionSize.y, 
                        this.repetitionSize.x,
                        this.repetitionSize.y
                    );
                }
            }
            return;
        }
        ctx.drawImage(
            this.sprite.image, 
            this.sprite.imageCoords.x, 
            this.sprite.imageCoords.y, 
            this.sprite.imageCoords.z, 
            this.sprite.imageCoords.w, 
            this.origin.x, 
            this.origin.y, 
            this.size.x, 
            this.size.y
        );
    }
}