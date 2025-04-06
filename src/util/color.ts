export class Color {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    public static get white(): Color {
        return new Color(255, 255, 255, 255);
    }

    public static get black(): Color {
        return new Color(0, 0, 0, 255);
    }

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

export function getStyleString(color: Color): string {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`;
}

export function getColorFromInt(num: number): Color {
    num >>>= 0;
    let b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ( (num & 0xFF000000) >>> 24 );
    return new Color(r, g, b, a);
}