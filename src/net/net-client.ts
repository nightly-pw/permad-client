import { ByteBuf } from "../util/bytebuf";
import { MpNetHandler } from "../play/mp-net-handler";

// TODO: Merge the net handler and net-client into one
export class NetworkClient {
    public ws: WebSocket;

    public mpNetHandler: MpNetHandler;

    constructor() {
        this.mpNetHandler = new MpNetHandler(this);
    }

    public start() {
        this.ws = new WebSocket("ws://localhost:6661");
        this.ws.binaryType = 'arraybuffer';
        this.ws.onopen = (ev: Event) => {
            this.onOpen(ev);
        }
        this.ws.onmessage = (ev: MessageEvent<any>) => {
            this.onMessage(ev)
        };
    }

    public send(buf: ByteBuf) {
        this.ws.send(buf.bytes())
    }

    private onOpen(ev: Event) {
        
    }

    private onMessage(ev: MessageEvent<any>) {
        let data: Uint8Array = ev.data;
        let buf = new ByteBuf(new Uint8Array(data));
        let isBulk = buf.readBool();
        if (isBulk) {
            let packetCount = buf.readInt();

            for (let i = 0; i < packetCount; i++) {
                try {
                    let pid = buf.readInt();
                    this.mpNetHandler.onMessage(buf, pid);
                } catch (e: any) {
                    return;
                }
            }
        } else {
            let pid = buf.readInt();
            this.mpNetHandler.onMessage(buf, pid);
        }
    }
}