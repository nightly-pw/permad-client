import React, { Ref, createContext, createRef, useContext, useEffect, useState } from "react";
import HomePage from "./HomePage";
import PlayPage from "./PlayPage";

export interface MainMenuState {
    pageTitle: string,
    pageTextColor: string,
    pageBgColor: string
}

let setMmCtx: React.Dispatch<React.SetStateAction<MainMenuState>>;
let setPageState: (page: React.JSX.Element) => void;

export function updateTopBar(state: MainMenuState) {
    useEffect(() => {
        setMmCtx(state);
    });
}

export function setPage(page: React.JSX.Element) {
    setPageState(page);
}

export default function MainMenu() {
    const [page, setPage] = useState(<HomePage></HomePage>);
    setPageState = setPage;

    return <>
        <TopBar></TopBar>
        <Content>
            {page}
        </Content>
    </>
}

export function BackButton({page}: {page: React.JSX.Element}) {
    return <div onClick={() => {
        setPage(page);
    }} className="back-button">
        <p className="w-300 margin-tb-auto back-button-text">Back</p>
    </div>
}

function Content(props: any) {
    return <div id="content">
        {props.children}
    </div>
}

function TopBar() {
    const [mmCtx, setMmCtxLoc] = useState({pageTitle: "Unknown", pageTextColor: "", pageBgColor: ""} as MainMenuState);
    setMmCtx = setMmCtxLoc;

    return <div className={mmCtx.pageBgColor} id="top-bar">
        <Title tColor={mmCtx.pageTextColor} tTitle={mmCtx.pageTitle}/>
        <CurrentAccount name={"Guest"}></CurrentAccount>

        <Logo></Logo>
    </div>;
}

function Title({tColor, tTitle}: {tColor: string, tTitle: string}) {
    return <p className={"w-300 margin-tb-auto current-page-title " + tColor}>{tTitle}</p>
}

function CurrentAccount({name}: {name: string}) {
    const dropped = useState(false);

    return <div className="margin-tb-auto account-display">
        <h4 className="w-300 account-name">
            {name}
        </h4>
        <img className="account-avatar" src="/assets/question.svg">

        </img>
    </div>
}

function Logo() {
    return <img src="/assets/perm-face-clean.png" className="margin-tb-auto top-bar-logo">
    </img>
}

function Dropdown() {
    
}

function TimeDisplay() {
    let date = new Date();
    let isPm = date.getHours() > 12;
    let timeText = (isPm ? (date.getHours() - 12) : date.getHours()) +  ":" + (date.getMinutes().toString().length > 1 ? date.getMinutes() : "0" + date.getMinutes().toString()) + ":" + (date.getSeconds().toString().length > 1 ? date.getSeconds() : "0" + date.getSeconds().toString()) + (isPm ? " PM" : " AM");
    return <p className="w-300 tclr-white margin-tb-auto time-display">
        {timeText}
    </p>
}