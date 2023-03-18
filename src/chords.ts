// TODO: fingering suggestions?
// TODO: pre-define cowboy chords, barre chords etc. (As string/fret tuples.)
// TODO: function to get note names from string/fret given guitar tuning. Wrapper/decorator?

export interface Position {
    string: number; // TODO: if string not present, interpret as not played.
    fret: number; // TODO: interpret 0 as open string?
}

export const C: Position[] = [
    // Low E string is not played.
    { string: 2, fret: 3},
    { string: 3, fret: 2},
    { string: 4, fret: 0}, // Play open G string.
    { string: 5, fret: 1},
    { string: 6, fret: 0},
];

export const G: Position[] = [
    { string: 1, fret: 3},
    { string: 2, fret: 2},
    { string: 3, fret: 0},
    { string: 4, fret: 0},
    { string: 5, fret: 0},
    { string: 6, fret: 3},
];