import { ALL_CHROMAS, Note } from "./musicTheory";

// TODO: type this.
// TODO: unit test!
export const getFretToNoteLookupForString = (openNote: Note, numFrets: number): any => {
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