// TODO: return string message then animation (inputs). Will some be static images?
// TODO: add exercise: variations of a given chord (dominant, diminished etc.).
// TODO: add exercise: chord, arpeggio, chord. Rick Beato: https://www.youtube.com/live/19jF6ZwJm-A?si=AoA5QKwu2aZ8qF_W
// TODO: add exercise: play pitch audio, find it on fretboard.
// TODO: add exercise: given position, name the note (delay before showing it).

import { NoteMarker } from "./Fretboard";
import { FrameData, GuitarFretboardAnimationProps } from "./GuitarFretboardAnimation";
import { getChromaToPositionsLookupForGuitar, standardGuitarTuning } from "./guitarTuning";
import { ALL_CHROMAS, Chroma } from "./musicTheory";

const NUM_FRETS = 22; // Strat

export const getRandomGuitarExercise = (): string => {
    // TODO: rather than select at random each time, randomise the list then select each once?
    // (But then no longer stateless. Handle in component?)
    const exerciseFunction = getRandomElementFromArray(allExerciseFunctions);
    return exerciseFunction();
}

interface GuitarExercise extends GuitarFretboardAnimationProps {
    description: string;
}

export const playRandomChromaAllPositions = (): GuitarExercise => {
    const chroma = getRandomChroma();
    const getAllPositionsForChroma = getChromaToPositionsLookupForGuitar(standardGuitarTuning, NUM_FRETS);
    const positions = getAllPositionsForChroma(chroma);
    const allMarkers: NoteMarker[] = positions.map(position => {
        return {
            fillColour: "lightblue",
            ...position
        }});
    const frames: FrameData[] = positions.map(position => {
        const marker: NoteMarker = {
            fillColour: "blue",
            ...position
        };
        return {
            label: `Fret ${position.fret}`,
            markers: [...allMarkers, marker]
        }
    });
    return {
        description: `Play every ${chroma} on the neck`,
        frames: [...frames.reverse(), ...frames]
    };
}

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

// TODO: add common chords.
const chordNames = ["Em", "C", "Am", "G"];

// TODO: replace this with something more structured e.g. common chord progression in random key.
const getRandomChord = (): string => {
    return getRandomElementFromArray(chordNames);
}

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
    "When the Sun Goes Down"
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