import { FretboardPosition } from "./Fretboard";
import { ALL_CHROMAS, Chroma, Note } from "../musicTheory";
import { getArrayZeroToLengthMinusOne } from "../utils";

export const standardGuitarTuning: Note[] = [
    {chroma: Chroma.E, octave: 2},
    {chroma: Chroma.A, octave: 2},
    {chroma: Chroma.D, octave: 3},
    {chroma: Chroma.G, octave: 3},
    {chroma: Chroma.B, octave: 3},
    {chroma: Chroma.E, octave: 4}
];

type FretToNote = (fret: number) => Note;

export const getFretToNoteLookupForString = (openNote: Note, numFrets: number): FretToNote => {
    const openStringChromaIndex = ALL_CHROMAS.findIndex((chroma) => chroma === openNote.chroma);
    const numChromas = ALL_CHROMAS.length;

    const getNoteAtFret: FretToNote = (fret: number) => {
        if (fret < 0) {
            throw Error(`Invalid fret ${fret}, minimum is 0.`);
        }
        if (fret > numFrets) {
            throw Error(`Invalid fret ${fret}, maximum is ${numFrets}.`);
        }
        const chromaIndexUnwrapped = openStringChromaIndex + fret;
        const octaveOffset = Math.floor(chromaIndexUnwrapped / numChromas);
        const fretChromaIndex = chromaIndexUnwrapped % numChromas;
        const chroma = ALL_CHROMAS[fretChromaIndex];
        const octave = openNote.octave + octaveOffset;
        return {
            chroma,
            octave,
        };
    }
    return getNoteAtFret;
}

export interface GuitarPositionLookups {
    getAllPositionsForChroma: (chroma: Chroma) => FretboardPosition[];
    getNoteForPosition: (position: FretboardPosition) => Note;
}

// TODO: change lookup to note not chroma? (I.e. include octave.) Or treat separately?
export const getGuitarPositionLookups = (openStringNotes: Note[], numFrets: number): GuitarPositionLookups => {
    const lookupChromaToPositions = new Map<Chroma, FretboardPosition[]>();
    const lookupPositionIdToNote = new Map<number, Note>();
    const frets = getArrayZeroToLengthMinusOne(numFrets + 1).reverse();
    const numStrings = openStringNotes.length;
    
    // (Workaround because FretboardPosition as Map key works only if same object instance used.)
    const getPositionId = (position: FretboardPosition): number => {
        return position.fret + (position.string - 1)*numFrets;
    };
    
    openStringNotes.forEach((openStringNote, index) => {
        const string = numStrings - index;
        const getNoteAtFret = getFretToNoteLookupForString(openStringNote, numFrets);
        frets.forEach((fret) => {
            const newPosition: FretboardPosition = {string, fret};
            const note = getNoteAtFret(fret);
            const positionId = getPositionId(newPosition);
            lookupPositionIdToNote.set(positionId, note);
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
    const getNoteForPosition = (position: FretboardPosition): Note => {
        const positionId = getPositionId(position);
        const note = lookupPositionIdToNote.get(positionId);
        if (note === undefined) {
            throw Error(`No note found for string ${position.string}, fret ${position.fret}.`);
        }
        return note;
    }
    return {
        getAllPositionsForChroma,
        getNoteForPosition
    };
}