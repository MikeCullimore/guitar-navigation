// TODO: allow any first and last key, not just whole octaves.

import { ALL_CHROMAS, Chroma, isBlackKey } from "./chroma";

export interface KeyboardProps {
    numOctaves: number;
}

// TODO: move to another file (but which?). Not keyboard specific.
export interface Note {
    chroma: Chroma;
    octave: number;
}

interface KeyBaseProps {
    width: number;
    height: number;
    fill: string; // TODO: remove (just for debugging).
}

// TODO: another interface for styling, extend that too?
export interface KeyProps extends KeyBaseProps {
    note: Note;
}

const getUniqueKeyForNote = (note: Note): string => {
    return `${note.chroma}${note.octave}`;
}

const goldenRatio = 2 / (1 + Math.sqrt(5));

// TODO: padding. (Why is there padding left and right already?)
// TODO: React component for each key? Will want text labels later on.
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
    const offsetA = blackKeyWidth / 6;
    const offsetB = blackKeyWidth / 4;

    const blackKeyProps: KeyBaseProps = {
        width: blackKeyWidth,
        height: blackKeyHeight,
        fill: "black"
    }

    const whiteKeyProps: KeyBaseProps = {
        width: whiteKeyWidth,
        height: whiteKeyHeight,
        fill: "white"
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

    const getXForNote = (note: Note): number => {
        return (100*(note.octave - 1)/props.numOctaves) + xForChroma[note.chroma];
    }

    const blackKeys = notes.filter(note => isBlackKey(note.chroma));
    const whiteKeys = notes.filter(note => !isBlackKey(note.chroma));

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                {whiteKeys.map(note => {
                    return <rect x={getXForNote(note)} key={getUniqueKeyForNote(note)} y="0" {...whiteKeyProps} stroke="gray" stroke-width="0.5"/>
                })}
                {blackKeys.map(note => {
                    return <rect x={getXForNote(note)} y="0" key={getUniqueKeyForNote(note)} {...blackKeyProps} />
                })}
            </svg>
        </div>
    );
}

export default Keyboard;