// TODO: what is state, what is props? # strings as prop, current notes as state?
// TODO: fit SVG to screen. (Why is vertical scrollbar shown? Because square?)
// TODO: remove styling here (stroke: black), do via CSS.
// TODO: ensure marker width is less than smallest fret spacing and smallest string spacing.
// TODO: fretboard dots/markers.
// TODO: thicker line for nut.
// TODO: capture string identities (tuning) here?
// TODO: add padding.
// TODO: string thicknesses.
// TODO: calculate constants once.

import { Position } from "./chords";

const numStrings = 6;
const numFrets = 20; // TODO: same # frets as my guitar.
const padding = 5;

interface FretboardProps {
    positions: Position[]
}

const getArrayOfLength = (length: number): number[] => {
    // Python wins here!
    return Array.from(Array(length).keys());
}

const getFretXPosition = (fret: number): number => {
    // Based on measurements of a strat.
    // TODO: include padding left and right.
    const c2 = -0.13827529;
    const c1 = 7.52403813;
    return c1*fret + c2*fret*fret;
}

const getStringYPosition = (string: number): number => {
    const stringSpacing = getFretXPosition(numFrets) - getFretXPosition(numFrets - 1);
    return padding + stringSpacing*string;
}

const renderFrets = (numFrets: number): JSX.Element[] => {
    const y1 = getStringYPosition(1);
    const y2 = getStringYPosition(numStrings);
    return getArrayOfLength(numFrets + 1).map((_, index) => {
        const x = getFretXPosition(index)
        return <line key={index} x1={x} y1={y1} x2={x} y2={y2} stroke="gray" strokeWidth={.4} strokeLinecap="round"/>;
    });
}

const renderStrings = (numStrings: number): JSX.Element[] => {
    const x1 = getFretXPosition(0);
    const x2 = getFretXPosition(numFrets);
    return getArrayOfLength(numStrings).map((_, index) => {
        const y = getStringYPosition(index + 1);
        return <line key={index} x1={x1} y1={y} x2={x2} y2={y} stroke="black" strokeWidth={.4} strokeLinecap="round"/>
    });
}

const renderNotes = (positions: Position[]): JSX.Element[] => {
    // TODO: handle open strings (change string colour? Or hollow marker at fret 0?) 
    // TODO: handle strings not played (change string colour? Or X marker at fret 0?)
    return positions.map((position, index) => {
        const r = 1;
        const x = getFretXPosition(position.fret) - r;
        const y = getStringYPosition(position.string);
        return <circle key={index} cx={x} cy={y} r={r} fill="blue" />
    });
}

const GuitarFretboard: React.FC<FretboardProps> = (props: FretboardProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
            {renderFrets(numFrets)}
            {renderStrings(numStrings)}
            {renderNotes(props.positions)}
        </svg>
    );
}

export default GuitarFretboard;