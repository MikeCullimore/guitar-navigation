import Keyboard from "./Keyboard";

// TODO: add text label (for e.g. note name, chord name).
const LayoutPlayground: React.FC<{}> = () => {
    return <div className="container">
        {/* <div className="fretboard"><Keyboard numOctaves={2}/></div> */}
        {/* <div className="keyboard"><Keyboard numOctaves={2}/></div> */}
        <div className="fretboard">fretboard</div>
        <div className="keyboard">keyboard</div>
    </div>;
}

export default LayoutPlayground;