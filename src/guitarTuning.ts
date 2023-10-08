import { FretboardPosition } from "./Fretboard";
import { ALL_CHROMAS, Chroma, Note, noteToString } from "./musicTheory";

export const standardGuitarTuning: Note[] = [
    {chroma: Chroma.E, octave: 2},
    {chroma: Chroma.A, octave: 2},
    {chroma: Chroma.D, octave: 3},
    {chroma: Chroma.G, octave: 3},
    {chroma: Chroma.B, octave: 3},
    {chroma: Chroma.E, octave: 4}
];

// TODO: define inner function signature once and share in the two places.
export const getFretToNoteLookupForString = (openNote: Note, numFrets: number): ((fret: number) => Note) => {
    const openStringChromaIndex = ALL_CHROMAS.findIndex((chroma) => chroma === openNote.chroma);
    // console.log(`openStringChromaIndex = ${openStringChromaIndex}`);
    const numChromas = ALL_CHROMAS.length;

    const getNoteAtFret = (fret: number): Note => {
        if (fret < 0) {
            throw Error(`Invalid fret ${fret}, minimum is 0.`);
        }
        if (fret > numFrets) {
            throw Error(`Invalid fret ${fret}, maximum is ${numFrets}.`);
        }
        const chromaIndexUnwrapped = openStringChromaIndex + fret;
        const octaveOffset = Math.floor(chromaIndexUnwrapped / numChromas);
        // console.log(`octaveOffset = ${octaveOffset}`);
        const fretChromaIndex = chromaIndexUnwrapped % numChromas;
        // console.log(`fretChromaIndex = ${fretChromaIndex}`);
        const chroma = ALL_CHROMAS[fretChromaIndex];
        const octave = openNote.octave + octaveOffset;
        return {
            chroma,
            octave,
        };
    }
    return getNoteAtFret;
}

export const getChromaToPositionsLookupForGuitar = (openStringNotes: Note[], numFrets: number): ((chroma: Chroma) => FretboardPosition[]) => {
    const lookupChromaToPositions = new Map<Chroma, FretboardPosition[]>();
    const frets = Array.from(Array(numFrets + 1).keys());
    const numStrings = openStringNotes.length;
    openStringNotes.forEach((openStringNote, index) => {
        const string = numStrings - index;
        const getNoteAtFret = getFretToNoteLookupForString(openStringNote, numFrets);
        frets.forEach((fret) => {
            const newPosition: FretboardPosition = {string, fret};
            const note = getNoteAtFret(fret);
            const existingPositions = lookupChromaToPositions.get(note.chroma);
            if (existingPositions) {
                existingPositions.push(newPosition);
                lookupChromaToPositions.set(note.chroma, existingPositions);
            } else {
                lookupChromaToPositions.set(note.chroma, [newPosition]);
            }
        });
    });
    const getAllPositionsForChroma = (chroma: Chroma): FretboardPosition[] => {
        const positions = lookupChromaToPositions.get(chroma);
        return positions || [];
    }
    return getAllPositionsForChroma;
}