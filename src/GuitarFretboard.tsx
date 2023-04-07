// TODO: what is state, what is props? # strings as prop, current notes as state?
// TODO: remove styling here (stroke: black), do via CSS.
// TODO: ensure marker width is less than smallest fret spacing and smallest string spacing.
// TODO: thicker line for nut.
// TODO: capture string identities (tuning) here?
// TODO: draw SVG positioning calculations.
// TODO: calculate constants once.

import { Position } from "./chords";

const numStrings = 6;
const numFrets = 22;
const padding = 5;
const c2 = -0.13827529;
const c1 = 7.52403813;
const b = (100 - 2*padding)/100
const strokeWidth = .3;
const stringSizes = [.1, .15, .2, .25, .3, .35];

interface FretboardProps {
    positions: Position[]
}

const getArrayOfLength = (length: number): number[] => {
    // Python wins here!
    return Array.from(Array(length).keys());
}

const getFretXPosition = (fret: number): number => {
    // Based on measurements of a strat.
    const withoutPadding = c1*fret + c2*fret*fret;
    return padding + b*withoutPadding;
}

const getFretMarkerXPosition = (fret: number): number => {
    return (getFretXPosition(fret) + getFretXPosition(fret - 1))/2;
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
        return <line key={index} x1={x} y1={y1} x2={x} y2={y2} stroke="gray" strokeWidth={strokeWidth} strokeLinecap="round"/>;
    });
}

const renderFretMarkers = (): JSX.Element[] => {
    // Frets with single dots.
    const fill = "black";
    const r = .5;
    const y = (getStringYPosition(numStrings) + getStringYPosition(1))/2;
    const markers = [3, 5, 7, 9, 15, 17, 19, 21].map((fret, index) => {
        const x = getFretMarkerXPosition(fret);
        return <circle key={index} cx={x} cy={y} r={r} fill={fill} />
    });
    const x12 = getFretMarkerXPosition(12);
    // Double dots at 12th fret.
    const a = .3;
    const b = 1 - a;
    const y1 = getStringYPosition(numStrings)*a + getStringYPosition(1)*b;
    const y2 = getStringYPosition(numStrings)*b + getStringYPosition(1)*a;
    return [
        ...markers,
        <circle cx={x12} cy={y1} r={r} fill={fill} />, 
        <circle cx={x12} cy={y2} r={r} fill={fill} />
    ];
}

const renderStrings = (numStrings: number): JSX.Element[] => {
    const x1 = getFretXPosition(0);
    const x2 = getFretXPosition(numFrets);
    return getArrayOfLength(numStrings).map((_, index) => {
        const y = getStringYPosition(index + 1);
        return <line key={index} x1={x1} y1={y} x2={x2} y2={y} stroke="LightGray" strokeWidth={stringSizes[index]} strokeLinecap="round"/>
    });
}

const renderNotes = (positions: Position[]): JSX.Element[] => {
    // TODO: handle strings not played (change string colour? Or X marker at fret 0?)
    return positions.map((position, index) => {
        const r = .6; // TODO: calculate from smallest fret spacing.
        const x = getFretXPosition(position.fret) - r;
        const y = getStringYPosition(position.string);
        if (position.fret === 0) {
            const strokeWidth = 0.1
            return <circle key={index} cx={x-strokeWidth} cy={y} r={r} fill="none" stroke="blue" stroke-width={strokeWidth} />
        } else {    
            return <circle key={index} cx={x} cy={y} r={r} fill="blue" />
        }
    });
}

const GuitarFretboard: React.FC<FretboardProps> = (props: FretboardProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
            {renderFrets(numFrets)}
            {renderFretMarkers()}
            {renderStrings(numStrings)}
            {renderNotes(props.positions)}
        </svg>
    );
}

export default GuitarFretboard;