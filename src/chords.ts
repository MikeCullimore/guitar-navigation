// TODO: separate files for piano and guitar?
// TODO: fingering suggestions?
// TODO: need richer type for barre chords? Or use hyphens?

import { NoteMarker } from "./guitar/Fretboard";
import { Chroma } from "./musicTheory";

type Fret = number | null;

// TODO: add note name, scale degree.
export const fretsToMarkers = (frets: Fret[]): NoteMarker[] => {
    if (!frets) return [];
    return frets.flatMap((fret: Fret, index) => {
        if (fret !== null) {
            return {
                string: index + 1,
                fret,
                fillColour: "blue",
                radius: .6,
            } as NoteMarker;
        } else {
            return [];
        }
    });
}

const numStrings = 6; // TODO: pass as arg.
export const chordStringToFrets = (chordString: string): Fret[] => {
    if (chordString.length !== numStrings) {
        throw new Error(`Invalid chord string ${chordString}, expected ${numStrings} characters.`);
    }
    return Array.from(chordString).map(char => {
        return char === "x" ? null : Number(char)
    });
}

// TODO: change key to enum for typing? Or use chord string as key?
// TODO: array of voicings for given chord name.
export const chordLibraryGuitar = new Map<string, Fret[]>([
    ['E6', chordStringToFrets("xxx999")],
    ['F', chordStringToFrets("xxx997")],
    ['Badd9', chordStringToFrets("xxx879")],
    ['F#', chordStringToFrets("xxx676")]
]);

export const exampleChords = Array.from(chordLibraryGuitar.keys());

// TODO: generate major and minor for all keys.
// TODO: then add other chord types: 5, 7, add9, sus etc.
// TODO: map from guitar to piano? Remove duplicate intervals enough?
export const chordLibraryPiano = new Map<string, Chroma[]>([
    ['C', [Chroma.C, Chroma.E, Chroma.G]]
]);