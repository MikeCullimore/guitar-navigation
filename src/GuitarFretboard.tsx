import Fretboard, { FretboardProps, Markers } from "./Fretboard";

const GuitarFretboard: React.FC<Markers> = (props: Markers) => {
    const fretboardProps: FretboardProps = {
        numStrings: 6,
        numFrets: 22,
        ...props
    };
    return <Fretboard {...fretboardProps}/>;
}

export default GuitarFretboard;