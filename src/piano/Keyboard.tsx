import Key, { KeyBaseProps } from "./Key";
import { ALL_CHROMAS, Chroma, Note, isBlackKey } from "../musicTheory";

// TODO: allow any first and last key, not just whole octaves.
export interface KeyboardProps {
    numOctaves: number;
}

const getUniqueKeyForNote = (note: Note): string => {
    return `${note.chroma}${note.octave}`;
}

const goldenRatio = 2 / (1 + Math.sqrt(5));

const Keyboard: React.FC<KeyboardProps> = (props: KeyboardProps) => {

    let notes: Note[] = [];
    for (let octave = 1; octave <= props.numOctaves; octave++) {
        for (const chroma of ALL_CHROMAS) {
            notes.push({ chroma, octave });
        }
    }

    const whiteKeyWidth = 100 / (7 * props.numOctaves);
    const whiteKeyHeight = 100;
    const blackKeyWidth = goldenRatio * whiteKeyWidth;
    const blackKeyHeight = goldenRatio * whiteKeyHeight;
    
    // These offsets are such that white key widths in gaps between black keys are equal
    // in (C, D, E) and in (F, G, A, B), as observed on real pianos.
    const offsetA = blackKeyWidth / 6;
    const offsetB = blackKeyWidth / 4;

    const blackKeyProps: KeyBaseProps = {
        width: blackKeyWidth,
        height: blackKeyHeight,
        fill: "black",
        stroke: "black"
    }

    const whiteKeyProps: KeyBaseProps = {
        width: whiteKeyWidth,
        height: whiteKeyHeight,
        fill: "white",
        stroke: "gray",
        strokeWidth: 0.5
    }

    const xForChroma: Record<Chroma, number> = {
        [Chroma.C]: 0,
        [Chroma.CSharp]: whiteKeyWidth - blackKeyWidth / 2 - offsetA,
        [Chroma.D]: whiteKeyWidth,
        [Chroma.DSharp]: 2 * whiteKeyWidth - blackKeyWidth / 2 + offsetA,
        [Chroma.E]: 2 * whiteKeyWidth,
        [Chroma.F]: 3 * whiteKeyWidth,
        [Chroma.FSharp]: 4 * whiteKeyWidth - blackKeyWidth / 2 - offsetB,
        [Chroma.G]: 4 * whiteKeyWidth,
        [Chroma.GSharp]: 5 * whiteKeyWidth - blackKeyWidth / 2,
        [Chroma.A]: 5 * whiteKeyWidth,
        [Chroma.ASharp]: 6 * whiteKeyWidth - blackKeyWidth / 2 + offsetB,
        [Chroma.B]: 6 * whiteKeyWidth,

    }

    // TODO: calculate once then lookup?
    const getXForNote = (note: Note): number => {
        return (100*(note.octave - 1)/props.numOctaves) + xForChroma[note.chroma];
    }

    const blackKeys = notes.filter(note => isBlackKey(note.chroma));
    const whiteKeys = notes.filter(note => !isBlackKey(note.chroma));

    // TODO: add some padding.
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg">
                {whiteKeys.map(note => {
                    return <Key note={note} x={getXForNote(note)} key={getUniqueKeyForNote(note)} {...whiteKeyProps}/>
                })}
                {blackKeys.map(note => {
                    return <Key note={note} x={getXForNote(note)} key={getUniqueKeyForNote(note)} {...blackKeyProps}/>
                })}
            </svg>
        </div>
    );
}

export default Keyboard;