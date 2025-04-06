export class Vector2 {
    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    public static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    public static get one(): Vector2 {
        return new Vector2(1, 1);
    }

    public add(vec: Vector2): Vector2 {
        return new Vector2(this.x + vec.x, this.y + vec.y)
    }

    public subtract(vec: Vector2): Vector2 {
        return new Vector2(this.x - vec.x, this.y - vec.y)
    } 

    public divide(vec: Vector2): Vector2 {
        return new Vector2(this.x / vec.x, this.y / vec.y)
    }

    public multiply(vec: Vector2): Vector2 {
        return new Vector2(this.x * vec.x, this.y * vec.y)
    }

    public lerpTo(o: number, d: Vector2) {
        return new Vector2((d.x - this.x) * o, (d.y - this.y) * o);
    }

    public copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}


export class Vector4 {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public w: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x
        this.y = y
        this.z = z;
        this.w = w;
    }

    public copy(): Vector4 {
        return new Vector4(this.x, this.y, this.z, this.w);
    }
}