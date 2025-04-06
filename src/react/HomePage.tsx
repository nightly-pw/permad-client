import { useContext } from "react";
import { updateTopBar, setPage } from "./MainMenu"
import PlayPage from "./PlayPage";
import { Game } from "../game";

export default function HomePage() {
    updateTopBar({pageTitle: "Home", pageTextColor: "tclr-nice-pink", pageBgColor: "tb-home"});
    return <div className="home-container">
        <HomeItem onClick={onPlay} title="Play" desc="take part in some lava dodging action!" style="home-item-1-4 play-button-background"></HomeItem>
        <HomeItem onClick={() => {Game.gameInstance.triggerNotification("Unavailable", "This feature is not yet implemented!")}}title="Inventory" desc="manage your items!" style="mapping-button-background"></HomeItem>
        <HomeItem title="Settings" desc="modify how the game behaves..." style="settings-button-background"></HomeItem>
        <HomeItem title="Support" desc="help support development!" style="home-item-1-4 heart-button-background"></HomeItem>
    </div>
}

function onPlay() {
    setPage(<PlayPage></PlayPage>);
}

function HomeItem(props: any) {
    return <div onClick={props.onClick} className={props.style + " home-item"}>
        <h1 className="home-item-title w-300">{props.title}</h1>
        <h5 className="home-item-desc w-300 tclr-white">{props.desc}</h5>
    </div>
}