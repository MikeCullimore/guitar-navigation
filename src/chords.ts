// TODO: fingering suggestions?
// TODO: function to get note names from string/fret given guitar tuning.
// TODO: need richer type for barre chords?

import { NoteMarker } from "./GuitarFretboard";

type Fret = number | null;
type Chord = {
    name: string;
    frets: Fret[];
};

// TODO: add note name, scale degree.
export const chordToMarkers = (chord: Chord): NoteMarker[] => {
    return chord.frets.flatMap((fret: Fret, index) => {
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

// TODO: just convert the chord string, handle name elsewhere (global chord library as Map?).
const parseChordString = (chordName: string, chordString: string): Chord => {
    const frets = Array.from(chordString).map(char => {
        return char === "x" ? null : Number(char)
    });
    const chord: Chord = {
        name: chordName,
        frets
    };
    return chord;
}

// You Only Live Once: The Strokes
// TODO: add chorus chords from notebook when syntax finalised.
export const E6 = parseChordString("E6", "xxx999");
export const F = parseChordString("F", "xxx997");
export const Badd9 = parseChordString("Badd9", "xxx879");
export const Fsharp = parseChordString("Fsharp", "xxx676");