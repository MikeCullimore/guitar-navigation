// TODO: conversion to multiple octaves.
// TODO: allow any first and last key, not just whole octaves.

import { Chroma } from "./chroma";

export interface KeyboardProps {
    numOctaves: number;
    whiteKeyWidth: number;
    blackKeyWidth: number;
    blackKeyHeight: number;
    offsetA: number;
    offsetB: number;
}

export const getKeyboardProps = (numOctaves: number): KeyboardProps => {
    // There are 7 white keys per octave.
    const whiteKeyWidth = 100 / (7 * numOctaves);

    const goldenRatio = 2 / (1 + Math.sqrt(5));
    const blackKeyWidth = goldenRatio * whiteKeyWidth;

    return {
        numOctaves,
        whiteKeyWidth,
        blackKeyWidth,
        blackKeyHeight: 100 * goldenRatio,
        offsetA: blackKeyWidth / 6,
        offsetB: blackKeyWidth / 4
    }
}

// TODO: move to another file (but which?). Not keyboard specific.
export interface Note {
    chroma: Chroma;
    octave: number;
}

export interface KeyStyling {
    fillColour: string;
    strokeColour: string;
}

interface Point {
    x: number;
    y: number;
}

// TODO: revert to white key vertices being rectangles, just ensure black keys drawn on top? Use isBlackKey, isWhiteKey.
// TODO: define units as percentage of container.
// TODO: type function signature once?
const getNotePolygonLookup = (keyboardProps: KeyboardProps): ((chroma: Chroma) => JSX.Element) => {
    // Abbreviate.
    const wkw = keyboardProps.whiteKeyWidth;
    const wkh = 100; // %
    const bkw = keyboardProps.blackKeyWidth;
    const bkh = keyboardProps.blackKeyHeight;
    const offA = keyboardProps.offsetA;
    const offB = keyboardProps.offsetB;

    // TODO: remove.
    // console.log(`wkw ${wkw}`);
    // console.log(`2 ${bkw}`);
    // console.log(`3 ${bkh}`);
    // console.log(`4 ${offA}`);
    // console.log(`5 ${offB}`);

    const u1 = 0;
    const u3 = wkw;
    const u2 = u3 - bkw/2 - offA;
    const u4 = u2 + bkw;
    const u6 = 2*wkw;
    const u5 = u6 - bkw/2 + offA;
    const u7 = u5 + bkw;
    const u8 = 3*wkw;
    const u10 = 4*wkw;
    const u9 = u10 - bkw/2 - offB;
    const u11 = u9 + bkw;
    const u13 = 5*wkw;
    const u12 = u13 - bkw/2
    const u14 = u12 + bkw;
    const u16 = 6*wkw;
    const u15 = u16 - bkw/2 + offB;
    const u17 = u15 + bkw;
    const u18 = 100; // = 7*wkw

    const keyVerticesLookup: Record<Chroma, Point[]> = {
        [Chroma.C]: [
            { x: u1, y: 0 },
            { x: u2, y: 0 },
            { x: u2, y: bkh },
            { x: u3, y: bkh },
            { x: u3, y: wkh },
            { x: u1, y: wkh },
            { x: u1, y: 0 }
        ],
        [Chroma.CSharp]: [
            { x: u2, y: 0 },
            { x: u4, y: 0 },
            { x: u4, y: bkh },
            { x: u2, y: bkh },
            { x: u2, y: 0 }
        ],
        [Chroma.D]: [
            { x: u4, y: 0 },
            { x: u5, y: 0 },
            { x: u5, y: bkh },
            { x: u6, y: bkh },
            { x: u6, y: wkh },
            { x: u3, y: wkh },
            { x: u3, y: bkh },
            { x: u4, y: bkh },
            { x: u4, y: 0 }
        ],
        [Chroma.DSharp]: [
            { x: u5, y: 0 },
            { x: u7, y: 0 },
            { x: u7, y: bkh },
            { x: u5, y: bkh },
            { x: u5, y: 0 }
        ],
        [Chroma.E]: [
            { x: u7, y: 0 },
            { x: u8, y: 0 },
            { x: u8, y: wkh },
            { x: u6, y: wkh },
            { x: u6, y: bkh },
            { x: u7, y: bkh },
            { x: u7, y: 0 }
        ],
        [Chroma.F]: [
            { x: u8, y: 0 },
            { x: u9, y: 0 },
            { x: u9, y: bkh },
            { x: u10, y: bkh },
            { x: u10, y: wkh },
            { x: u8, y: wkh },
            { x: u8, y: 0 }
        ],
        [Chroma.FSharp]: [
            { x: u9, y: 0 },
            { x: u11, y: 0 },
            { x: u11, y: bkh },
            { x: u9, y: bkh },
            { x: u9, y: 0 }
        ],
        [Chroma.G]: [
            { x: u11, y: 0 },
            { x: u12, y: 0 },
            { x: u12, y: bkh },
            { x: u13, y: bkh },
            { x: u13, y: wkh },
            { x: u10, y: wkh },
            { x: u10, y: bkh },
            { x: u11, y: bkh },
            { x: u11, y: 0 }
        ],
        [Chroma.GSharp]: [
            { x: u12, y: 0 },
            { x: u14, y: 0 },
            { x: u14, y: bkh },
            { x: u12, y: bkh },
            { x: u12, y: 0 }
        ],
        [Chroma.A]: [
            { x: u14, y: 0 },
            { x: u15, y: 0 },
            { x: u15, y: bkh },
            { x: u16, y: bkh },
            { x: u16, y: wkh },
            { x: u13, y: wkh },
            { x: u13, y: bkh },
            { x: u14, y: bkh },
            { x: u14, y: 0 }
        ],
        [Chroma.ASharp]: [
            { x: u15, y: 0 },
            { x: u17, y: 0 },
            { x: u17, y: bkh },
            { x: u15, y: bkh },
            { x: u15, y: 0 }
        ],
        [Chroma.B]: [
            { x: u17, y: 0 },
            { x: u18, y: 0 },
            { x: u18, y: wkh },
            { x: u16, y: wkh },
            { x: u16, y: bkh },
            { x: u17, y: bkh },
            { x: u17, y: 0 }
        ]
    }

    const pointsToString = (points: Point[]): string => {
        // TODO: turn rounding back off (debugging only).
        return points.map(point => `${Math.round(point.x)},${Math.round(point.y)}`).join(', ');
    }

    // TODO: input should be note (chroma + octave).
    const getPolygonForNote = (chroma: Chroma): JSX.Element => {
        const points = keyVerticesLookup[chroma];
        const pointsString = pointsToString(points);
        console.log(pointsString);
        // TODO: no inline styles.
        // TODO: fix warning: "Each child in a list should have a unique "key" prop."
        return <polygon points={pointsString} fill="blue" />
    }

    return getPolygonForNote;
}

const Keyboard: React.FC<KeyboardProps> = (props: KeyboardProps) => {
    const getPolygonForNote = getNotePolygonLookup(props);
    // TODO: replace with range of notes (not chromas) from props numOctaves.
    const chromas = [Chroma.G];
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                {chromas.map(chroma => getPolygonForNote(chroma))}
            </svg>
        </div>
    );
}

export default Keyboard;