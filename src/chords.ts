// TODO: fingering suggestions?
// TODO: function to get note names from string/fret given guitar tuning.
// TODO: need richer type for barre chords?

import { NoteMarker } from "./GuitarFretboard";

type Fret = number | null;
type Chord = Fret[];

export const C: Chord = [null, 3, 2, 0, 1, 0];
export const G: Chord = [3, 2, 0, 0, 0, 3];

export const chordToMarkers = (chord: Chord): NoteMarker[] => {
    return chord.flatMap((fret: Fret, index) => {
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