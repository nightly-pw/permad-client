
export class ByteBuf {
    public index: number = 0; //Index of the reader/writer
    private data: DataView;

    static emptyBuffer(): ByteBuf {
        return new ByteBuf(new Uint8Array(2048));
    }

    constructor(data: Uint8Array) {
        this.data = new DataView(data.buffer);
    }

    public readBool(): boolean {
        let b: boolean = this.data.getInt8(this.index) == 1;
        this.index += 1;
        return b;
    }

    public readByte(): number {
        let i = this.data.getInt8(this.index);
        this.index += 1;
        return i;
    }

    public readShort(): number {
        let i = this.data.getInt16(this.index);
        this.index += 2;
        return i;
    }

    public readFloat(): number {
        let f = this.data.getFloat32(this.index);
        this.index += 4;
        return f;
    }

    public readInt(): number {
        let i = this.data.getInt32(this.index);
        this.index += 4;
        return i;
    }

    public readLong(): bigint {
        let i = this.data.getBigInt64(this.index);
        this.index += 8;
        return i;
    }

    public readString(): string {
        let n = this.readInt();
        let s = "";
        for (let i = 0; i < n; i++) {
            s += String.fromCharCode(this.data.getUint8(this.index + i));
        }
        this.index += n;
        
        return s;
    }

    public writeBool(b: boolean) {
        this.data.setInt8(this.index, b ? 1 : 0);
        this.index += 1;
    }

    public writeByte(b: number) {
        this.data.setInt8(this.index, b);
        this.index += 1;
    }

    public writeShort(s: number) {
        this.data.setInt16(this.index, s);
        this.index += 2;
    }

    public writeFloat(f: number) {
        this.data.setFloat32(this.index, f);
        this.index += 4;
    }

    public writeInt(b: number) {
        this.data.setInt32(this.index, b);
        this.index += 4;
    } 

    public writeLong(l: bigint) {
        this.data.setBigInt64(this.index, l);
        this.index += 8;
    }

    public writeString(s: string) {
        this.writeInt(s.length);
        for (let i = 0; i < s.length; i++) {
            this.writeByte(s.charCodeAt(i));
        }
    }

    public setIndex(i: number) {
        this.index = i;
    }

    public bytes(): ArrayBuffer {
        return this.data.buffer;
    }
}