// TODO: fingering suggestions?
// TODO: function to get note names from string/fret given guitar tuning.
// TODO: need richer type for barre chords?

import { NoteMarker } from "./Fretboard";

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

const parseChordString = (chordString: string): Fret[] => {
    return Array.from(chordString).map(char => {
        return char === "x" ? null : Number(char)
    });
}

// TODO: array of voicings for given chord name.
// TODO: equivalent chord library for piano.
export const chordLibraryGuitar = new Map<string, Fret[]>([
    ['E6', parseChordString("xxx999")],
    ['F', parseChordString("xxx997")],
    ['Badd9', parseChordString("xxx879")],
    ['F#', parseChordString("xxx676")]
]);