// TODO: option to use capo (changes render and note identities).
// TODO: prevent the vertical scrollbar from showing. Steps:
// Put Fretboard component in a div, full width of screen.
// Change positions to % (of container). Try with keyboard then apply here.
// CSS changes: see App.css
// Remove viewPort prop in SVG below.
// TODO: adapt SVG positioning calculations from guitar-technique repo.
// TODO: calculate constants once.
// TODO: no inline styles, compare Keyboard component.
// TODO: ensure marker width is less than smallest fret spacing and smallest string spacing.
// TODO: make markers square not circles to better fit text.
// TODO: use tooltips to provide extra information on hover?

// TODO: remove these global variables (pass down from fretboard props).
const numStrings = 6;
const numFrets = 22;

const getStringThicknesses = (numStrings: number, minThickness = .1, maxThickness = .35): number[] => {
    const step = 1 / (numStrings - 1);
    const stringThicknesses = [];
    
    for (let string = 0; string < numStrings; string++) {
        const t = string * step;
        stringThicknesses.push(maxThickness + (minThickness - maxThickness) * t);
    }
    
    return stringThicknesses;
}

const stringSizes = getStringThicknesses(numStrings);

const padding = 5;
const c2 = -0.13827529;
const c1 = 7.52403813;
const b = (100 - 2*padding)/100
const strokeWidth = .3;

// TODO: is this a component, not an interface? Move over to NoteMarker.tsx.
export interface NoteMarker {
    string: number; // TODO: function in root component to translate into x, y.
    fret: number;
    fillColour: string;
    radius?: number; // TODO: how to get in same units as x, y?
    label?: string;
    strokeColour?: string;
    opacity?: number;
}

export interface Markers {
    markers: NoteMarker[]; // TODO: replace with frame data (markers as function of time).
}

export interface FretboardProps extends Markers {
    numStrings: number;
    numFrets: number;
}

const getArrayOfLength = (length: number): number[] => {
    // Python wins here!
    return Array.from(Array(length).keys());
}

const getFretXPosition = (fret: number): number => {
    // Based on measurements of a strat.
    // TODO: equal fret spacing as option.
    // TODO: adapt to varying numbers of frets.
    // TODO: ensure endpoints are exactly 0, 100.
    return padding + b*(c1*fret + c2*fret*fret);
}

const getFretMarkerXPosition = (fret: number): number => {
    return (getFretXPosition(fret) + getFretXPosition(fret - 1))/2;
}

// TODO: refactor this to pass in numStrings, numFrets once, return function (string) -> y?
const getStringYPosition = (string: number): number => {
    const stringSpacing = getFretXPosition(numFrets) - getFretXPosition(numFrets - 1);
    return padding + stringSpacing*(numStrings - string + 1);
}

const Frets = (numFrets: number): JSX.Element[] => {
    const y1 = getStringYPosition(1);
    const y2 = getStringYPosition(numStrings);
    return getArrayOfLength(numFrets + 1).map((_, index) => {
        const x = getFretXPosition(index)
        return <line key={index} x1={x} y1={y1} x2={x} y2={y2} stroke="gray" strokeWidth={strokeWidth} strokeLinecap="round"/>;
    });
}

const Inlays = (): JSX.Element[] => {
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

const Strings = (numStrings: number): JSX.Element[] => {
    const x1 = getFretXPosition(0);
    const x2 = getFretXPosition(numFrets);
    return getArrayOfLength(numStrings).map((_, index) => {
        const y = getStringYPosition(index + 1);
        return <line key={index} x1={x1} y1={y} x2={x2} y2={y} stroke="LightGray" strokeWidth={stringSizes[index]} strokeLinecap="round"/>
    });
}

const Notes = (markers: NoteMarker[]): JSX.Element[] => {
    return markers.map((marker, index) => {
        const r = .6; // TODO: calculate marker radius from smallest fret spacing.
        // const r = getFretXPosition(numFrets) - getFretXPosition(numFrets - 1);
        const x = getFretXPosition(marker.fret) - r;
        const y = getStringYPosition(marker.string);
        if (marker.fret === 0) {
            const strokeWidth = 0.1
            return <circle key={index} cx={x-strokeWidth} cy={y} r={r} fill="none" stroke="blue" stroke-width={strokeWidth} />
        } else {    
            return <circle key={index} cx={x} cy={y} r={r} fill="blue" />
        }
    });
}

const Fretboard: React.FC<FretboardProps> = (props: FretboardProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            {Frets(props.numFrets)}
            {Inlays()}
            {Strings(props.numStrings)}
            {Notes(props.markers)}
        </svg>
    );
}

export default Fretboard;