// Desingned to be used with children in it
export default function VoidScreen(props: any) {
    return <div className="margin-tb-auto" style={{position: "absolute", top: "50%", left: "50%", msTransform: "translate(-50%, -50%)", transform: "translate(-50%, -50%)"} as any}>
        {props.children}
    </div>
}