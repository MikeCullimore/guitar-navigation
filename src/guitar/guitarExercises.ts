// TODO: add exercise: one chord, all positions along the neck.
// TODO: add exercise: variations of a given chord (dominant, diminished etc.).
// See https://virtualpiano.vercel.app/
// Source code: https://github.com/sophiekoonin/virtualpiano
// TODO: add exercise: chord, arpeggio, chord. Rick Beato: https://www.youtube.com/live/19jF6ZwJm-A?si=AoA5QKwu2aZ8qF_W
// TODO: add exercise: play pitch audio, find it on fretboard. (Extend to melody.)
// TODO: add exercise: all chords in given key.
// TODO: add exercise: intervals, like https://www.fretjam.com/guitar-intervals-fretboard.html
// TODO: add exercise: E minor pentatonic, all positions.
// TODO: add exercise: twelve bar blues.
// TODO: add exercise: common chord progressions e.g. C G Am F. See https://www.fretjam.com/three-chord-guitar.html
// TODO: power chords (just specify root positions).

import { FretboardPosition, NoteMarker } from "./Fretboard";
import { FrameData, GuitarFretboardAnimationProps } from "./GuitarFretboardAnimation";
import { getGuitarPositionLookups, standardGuitarTuning } from "./guitarTuning";
import { ALL_CHROMAS, Chroma } from "../musicTheory";

const NUM_FRETS = 22; // Strat

export const getRandomGuitarExercise = (): string => {
    // TODO: rather than select at random each time, randomise the list then select each once?
    // (But then no longer stateless. Handle in component?)
    const exerciseFunction = getRandomElementFromArray(allExerciseFunctions);
    return exerciseFunction();
}

export interface GuitarExercise extends GuitarFretboardAnimationProps {
    description: string;
}

// TODO: similar functions to convert positions to frame data, e.g.:
// 1) Just show marker for current note
// 2) Show current note in one colour, next one in another (say grey) for melodies, leads.
// 3) As (2) but for chords.
// TODO: accommodate full styling options for markers, using their existing types.
// TODO: decouple label generation?
const showAllNotesHighlightCurrent = (positions: FretboardPosition[], currentNoteColour: string, otherNotesColour: string): FrameData[] => {
    const allMarkers: NoteMarker[] = positions.map(position => {
        return {
            fillColour: otherNotesColour,
            ...position
        }
    });
    return positions.map(position => {
        const marker: NoteMarker = {
            fillColour: currentNoteColour,
            ...position
        };
        return {
            label: `Fret ${position.fret}`, // TODO: string name also?
            markers: [...allMarkers, marker]
        }
    });
}

// TODO: include enharmonic equivalents e.g. C# and Db should both be among options.
export const playRandomChromaAllPositions = (): GuitarExercise => {
    const chroma = getRandomChroma();
    const guitarPositionLookups = getGuitarPositionLookups(standardGuitarTuning, NUM_FRETS);
    const positions = guitarPositionLookups.getAllPositionsForChroma(chroma);
    const positionsLooped = [...positions.reverse(), ...positions];
    const frames = showAllNotesHighlightCurrent(positionsLooped, "blue", "lightskyblue");
    return {
        description: `Play every ${chroma}`,
        frames
    };
}

export const identifyNotesOnLowEStringInlayFrets = (): GuitarExercise => {
    // const frets = getArrayZeroToLengthMinusOne(NUM_FRETS + 1);
    const frets = [3, 5, 7, 9, 12, 15, 17, 19, 21]; // Narrow down to just frets with inlays (below octave!).
    const string = 6;
    const positions: FretboardPosition[] = frets.map(fret => {
        return {
            string,
            fret
        }
    });
    return identifyNotes(positions);
}

export const identifyNotes = (positions: FretboardPosition[]): GuitarExercise => {
    const randomisedPositions = randomiseArrayOrder(positions);
    // TODO: store this somewhere and re-use it.
    const guitarPositionLookups = getGuitarPositionLookups(standardGuitarTuning, NUM_FRETS);
    const frames: FrameData[] = randomisedPositions.map(position => {
        const note = guitarPositionLookups.getNoteForPosition(position);
        const marker: NoteMarker = {
            fillColour: "blue",
            ...position
        };
        return [
            {
                label: "",
                markers: [marker],
                durationMilliseconds: 2000,
            },
            {
                label: note.chroma,
                markers: [marker],
                durationMilliseconds: 500,
            }
        ]
    }).reduce((accumulator, currentValue) => [...accumulator, ...currentValue], []);
    return {
        description: `Identify this note`,
        frames
    }
}

// TODO: refactor exercises below to return animation frames, not only description.

const playRandomNoteAllPositions = (): string => {
    return `Play every ${getRandomNote()} on the neck`;
}

const playChromaticScaleOnRandomString = (): string => {
    return `Play a chromatic scale along the ${getRandomGuitarString()} string`;
}

const playRandomChord = (): string => {
    return `Play a ${getRandomChord()} chord`;
}

const playRandomSong = (): string => {
    return `Play ${getRandomSongName()}`;
}

const playAllArpeggiosInRandomKey = (): string => {
    return `Play all the arpeggios in the key of ${getRandomKey()}`;
}

const playRandomMajorScale = (): string => {
    return `Play a ${getRandomMajorKey()} scale`;
}

const playRandomMinorScale = (): string => {
    return `Play a ${getRandomMinorKey()} scale`;
}

const playRandomMajorPentatonicScale = (): string => {
    return `Play a ${getRandomMajorKey()} pentatonic scale`;
}

const playRandomMinorPentatonicScale = (): string => {
    return `Play a ${getRandomMinorKey()} pentatonic scale`;
}

const playQuasiChromaticScaleRandomFingering = (): string => {
    return `Play a quasi-chromatic scale with fingering ${randomiseArrayOrder([1, 2, 3, 4])}`;
}

// TODO: weight some exercises more than others?
const allExerciseFunctions = [
    playRandomNoteAllPositions,
    playChromaticScaleOnRandomString,
    playRandomChord,
    playRandomSong,
    playAllArpeggiosInRandomKey,
    playRandomMajorScale,
    playRandomMinorScale,
    playRandomMajorPentatonicScale,
    playRandomMinorPentatonicScale,
    playQuasiChromaticScaleRandomFingering
];

// TODO: alternative tunings.
// TODO: should this be an enum?
const guitarStringNames = ["low E", "A", "D", "G", "B", "high E"];

const getRandomGuitarString = (): string => {
    return getRandomElementFromArray(guitarStringNames);
}

// TODO: map these to Chroma enum.
const noteNames = ["A", "A#", "B♭", "B", "C", "C#", "D♭", "D", "D#", "E♭", "E", "F", "F#", "G♭", "G#"];

const getRandomNote = (): string => {
    return getRandomElementFromArray(noteNames);
}

const getRandomChroma = (): Chroma => {
    return getRandomElementFromArray(ALL_CHROMAS);
}

// TODO: add common chords (add to existing chord library).
const chordNames = ["Em", "C", "Am", "G"];

// TODO: replace this with something more structured e.g. common chord progression in random key.
const getRandomChord = (): string => {
    return getRandomElementFromArray(chordNames);
}

// TODO: define chords and/or melody (GuitarExercise interface).
const songNames = [
    "Automatic Stop",
    "Californication",
    "Come As You Are",
    "Day Tripper",
    "Fly Away",
    "I Bet You Look Good on the Dance Floor",
    "Le Temps de L'Amour",
    "Seven Nation Army",
    "Sunshine of Your Love",
    "When the Sun Goes Down",
    "You Only Live Once"
];

const getRandomSongName = (): string => {
    return getRandomElementFromArray(songNames);
}

// TODO: move to a shared file (music theory?).
const majorKeys = ["C", "G", "D", "A", "E", "B", "C♭", "G♭", "F#", "D♭", "C#", "A♭", "E♭", "B♭", "F"];
const minorKeys = ["a", "e", "b", "f#", "c#", "g#", "e♭", "d#", "b♭", "f", "c", "g", "d"];
const allKeys = [...majorKeys, ...minorKeys];

const getRandomKey = (): string => {
    return getRandomElementFromArray(allKeys);
}

const getRandomMajorKey = (): string => {
    return `${getRandomElementFromArray(majorKeys)} major`;
}

const getRandomMinorKey = (): string => {
    return `${getRandomElementFromArray(minorKeys)} minor`;
}

const getRandomElementFromArray = <T>(array: T[]): T => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const randomiseArrayOrder = <T>(array: T[]): T[] => {
    const shuffledArray = [...array]; // Create a copy of the original array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}