// TODO: move this to readme, prioritise.
// TODO: what is state, what is props? # strings as prop, current notes as state?
// TODO: fit to screen (what are viewport units?)
// TODO: semantic input e.g. G chord: each note has string, fret, note name and scale degree.
// TODO: inputs are array of dots with common styling. Handle semantics elsewhere.
// TODO: remove styling here (stroke: black), do via CSS.
// TODO: dot at each fret position.
// TODO: ensure marker width is less than smallest fret spacing and smallest string spacing.
// TODO: animate (input is array of arrays of positions ... also with timings?).
// TODO: fretboard dots/markers.
// TODO: capture string identities (tuning) here?
// TODO: string thicknesses.
// TODO: realistic fret spacing (log?).
// TODO: common base component for fretboard, call with # strings, # frets for guitars, bass, ukelele.

import { Position } from "./chords";

const numStrings = 6;
const numFrets = 20; // TODO: same # frets as my guitar.

interface FretboardProps {
    positions: Position[]
}

const getArrayOfLength = (length: number): number[] => {
    // Python wins here!
    return Array.from(Array(length).keys());
}

const getFretXPosition = (fret: number): string => {
    return `${100*fret/numFrets}%`;
}

const getStringYPosition = (string: number): string => {
    return `${10*string}%`;
}

const renderFrets = (numFrets: number): JSX.Element[] => {
    const y1 = getStringYPosition(1);
    const y2 = getStringYPosition(numStrings);
    return getArrayOfLength(numFrets).map((_, index) => {
        const x = getFretXPosition(index + 1)
        return <line key={index} x1={x} y1={y1} x2={x} y2={y2} stroke="gray" />;
    });
}

const renderStrings = (numStrings: number): JSX.Element[] => {
    return getArrayOfLength(numStrings).map((_, index) => {
        const y = getStringYPosition(index + 1);
        return <line key={index} x1="5%" y1={y} x2="95%" y2={y} stroke="black" />
    });
}

const renderNotes = (positions: Position[]): JSX.Element[] => {
    // TODO: draw circle at (X - markerWidth/2, Y).
    // TODO: handle open strings (change string colour? Or hollow marker at fret 0?) 
    // TODO: handle strings not played (change string colour? Or X marker at fret 0?)
    return positions.map((position, index) => {
        const x = getFretXPosition(position.fret);
        const y = getStringYPosition(position.string);
        return <circle key={index} cx={x} cy={y} r="2%" fill="blue" />
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