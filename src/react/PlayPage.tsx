import React, { useCallback, useEffect, useState } from "react"
import { Game } from "../game"
import { BackButton, updateTopBar } from "./MainMenu"
import { RoomListing } from "../play/mp-net-handler";
import HomePage from "./HomePage";

export let setListingsState: React.Dispatch<React.SetStateAction<any[]>>;

export default function PlayPage() {
    const [listings, setListings] = useState([]);
    setListingsState = setListings;

    useEffect(() => {
        Game.gameInstance.network.mpNetHandler.subscribeRoomListing();
    }, []);

    updateTopBar({pageTitle: "Play", pageTextColor: "tclr-nice-green", pageBgColor: "tb-play"})

    return <>
        <BackButton page={<HomePage></HomePage>}></BackButton>
        <div className="room-container">
            {listings.map(listing => (
                <RoomItem key={listing.roomName} listing={listing}></RoomItem>
            ))}
        </div>
    </>
}

function RoomItem(props: any) {
    return <div onClick={() => {
            Game.gameInstance.network.mpNetHandler.joinRoomListing(props.listing.roomName)
        }} className="room-item">
        <h3 className={"tclr-white w-400 room-item-text"}>{props.listing.roomName}</h3>
        <h4 className="tclr-white w-400 room-item-text">{props.listing.playerCount} players</h4>
        <h5 className="tclr-white w-100 room-item-text">{props.listing.mapName} by {props.listing.mapCreator}</h5>
        {(props.listing.official) 
            ? <h6 className="tclr-blue w-900 room-item-text">Official map</h6>
            : <h6 className="tclr-gray w-300 room-item-text">Unofficial map</h6>
        }
    </div>
}