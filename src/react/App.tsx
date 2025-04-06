import { useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import { Game } from "../game";
import LoginMenu from "./LoginMenu";
import VoidScreen from "./VoidScreen";

enum AppStateEnum {
    CONNECTING, CONNECTED, CONNECTED_LOGGED_IN, CLOSED
}

interface AppState {
    appState: AppStateEnum
}

export default function App() {
    const [appState, setAppState] = useState({appState: AppStateEnum.CONNECTING} as AppState);

    useEffect(() => {
        Game.gameInstance.network.start();
        setInterval(() => {
            let readyState = Game.gameInstance.network.ws.readyState;
            switch (readyState) {
                case WebSocket.OPEN:
                    if (appState.appState != AppStateEnum.CONNECTED && appState.appState != AppStateEnum.CONNECTED_LOGGED_IN) {
                        setAppState({appState: AppStateEnum.CONNECTED_LOGGED_IN});
                    }
                    break;
                case WebSocket.CONNECTING:
                    setAppState({appState: AppStateEnum.CONNECTING});
                    break;
                default:
                    setAppState({appState: AppStateEnum.CLOSED})
            }
        }, 2000);
    }, []);

    if (appState.appState == AppStateEnum.CONNECTED_LOGGED_IN)
        return <MainMenu></MainMenu>
    else if (appState.appState == AppStateEnum.CONNECTED)
        return <LoginMenu></LoginMenu>
    else if (appState.appState == AppStateEnum.CONNECTING)
        return <LoadingScreen></LoadingScreen>
    else (appState.appState == AppStateEnum.CLOSED)
        return <DisconnectedScreen></DisconnectedScreen>
}

function LoadingScreen() {
    return <VoidScreen>        
        <h2 className="w-300 tclr-white width-100p t-align-c">connecting to game servers...</h2>
        <h6 className="w-300 tclr-nice-blue width-100p t-align-c">let's enjoy this dark void while we wait</h6>
    </VoidScreen>
}

function DisconnectedScreen() {
    return <VoidScreen>        
        <h2 className="w-600 tclr-nice-red width-100p t-align-c">you have been disconnected...</h2>
        <h5 className="w-300 tclr-white width-100p t-align-c">maybe try refreshing or something</h5>
        <h6 className="w-300 tclr-light-gray width-100p t-align-c">or the servers are down... would be sad</h6>
    </VoidScreen>
}