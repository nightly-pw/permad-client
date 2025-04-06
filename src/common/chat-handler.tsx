import React, { useEffect } from "react";
import { Game } from "../game";
import { Drawable } from "../graphics/drawable";
import { Root, createRoot } from "react-dom/client";
import { KeyboardDownEvent } from "../events/keyboard-down-event";

// The chat is implemented in React since it's much easier to do in there (my system is not mature enough)
export class ChatHandler extends Drawable {
    protected chatListDiv: HTMLDivElement;
    protected chatBox: HTMLInputElement;
    protected reactRoot: Root;//Used to render chat message to the chat list div

    protected messages: Array<string> = new Array<string>();
    
    protected chatBoxListener: (e: KeyboardEvent) => void;

    constructor() {
        super();

        this.chatListDiv = document.getElementById("chatlist") as HTMLDivElement;
        this.chatBox = document.getElementById("chatbox") as HTMLInputElement;
        this.reactRoot = createRoot(this.chatListDiv);
    }

    public override onKeyDown(event: KeyboardDownEvent): void {
        super.onKeyDown(event);

        if (event.keyCode == "Enter") {
            this.chatBox.focus();
        }
    }

    public override onAdded(): void {
        this.chatListDiv.hidden = false;
        this.chatBox.hidden = false;
        this.chatBox.addEventListener("keydown", this.chatBoxListener = (e) => {this.onChatBoxKeyDown(e)});
    }

    public override onRemoved(): void {
        this.chatListDiv.hidden = true;
        this.chatBox.hidden = true;
        this.chatBox.removeEventListener("keydown", this.chatBoxListener);
    }

    public addChatMessage(message: string) {
        this.messages.push(message);
        this.reactRoot.render(<ChatList chatListDiv={this.chatListDiv} messages={this.messages}></ChatList>);
    }

    private onChatBoxKeyDown(key: KeyboardEvent) {
        if (key.key == "Enter" && this.chatBox.value.length != 0) {
            var message = new String(this.chatBox.value);
            this.chatBox.value = "";
            this.chatBox.blur();
            Game.gameInstance.network.mpNetHandler.sendChatMessage(message as string);
        }
    }

    public isFocused() {
        return document.activeElement == this.chatBox;
    }
}

function ChatList(props: any) {
    useEffect(() => {
        props.chatListDiv.scrollTop = props.chatListDiv.scrollHeight;
    });

    return <>
        {props.messages.map((message: string) => (
            <ChatMessage key={message} message={message}></ChatMessage>
        ))}
    </>
}

function ChatMessage(props: any) {
    return <p className="tclr-white chat-message">{props.message}</p>
}