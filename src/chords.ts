// TODO: fingering suggestions?
// TODO: function to get note names from string/fret given guitar tuning.
// TODO: need richer type for barre chords? Or use hyphens?

import { NoteMarker } from "./Fretboard";
import { Chroma } from "./musicTheory";

type Fret = number | null;

// TODO: add note name, scale degree.
export const fretsToMarkers = (frets: Fret[] | undefined): NoteMarker[] => {
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
            return []; // TODO: also need to cast as NoteMarker?
        }
    });
}

const numStrings = 6; // TODO: pass as arg.
const parseChordString = (chordString: string): Fret[] => {
    if (chordString.length !== numStrings) {
        throw new Error(`Invalid chord string ${chordString}, expected ${numStrings} characters.`);
    }
    return Array.from(chordString).map(char => {
        return char === "x" ? null : Number(char)
    });
}

// TODO: change key to enum for typing?
// TODO: array of voicings for given chord name.
export const chordLibraryGuitar = new Map<string, Fret[]>([
    ['E6', parseChordString("xxx999")],
    ['F', parseChordString("xxx997")],
    ['Badd9', parseChordString("xxx879")],
    ['F#', parseChordString("xxx676")]
]);

export const exampleChords = Array.from(chordLibraryGuitar.keys());

// TODO: generate major and minor for all keys.
// TODO: then add other chord types: 5, 7, add9, sus etc.
// TODO: map from guitar to piano? Remove duplicate intervals enough?
export const chordLibraryPiano = new Map<string, Chroma[]>([
    ['C', [Chroma.C, Chroma.E, Chroma.G]]
]);