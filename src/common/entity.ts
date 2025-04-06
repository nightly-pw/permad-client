import { ByteBuf } from "../util/bytebuf";
import { Vector2 } from "../util/vectors";

export abstract class Entity {
    public entityId: number;

    public lastServerPos: Vector2 = new Vector2(0, 0);
    public serverPos: Vector2 = new Vector2(0, 0);
    public renderPos: Vector2 = new Vector2(0, 0);
    public size: Vector2 = new Vector2(100, 100);
    public rot: number = 0.0;
    public zIndex: number = 0;

    public abstract render(ctx: CanvasRenderingContext2D, cvx: HTMLCanvasElement): void;

    public readEntityMetadata(buf: ByteBuf) {

    }
}