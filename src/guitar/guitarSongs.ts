import { chordStringToFrets, fretsToMarkers } from "../chords";
import { FrameData } from "./GuitarFretboardAnimation";
import { GuitarExercise } from "./guitarExercises";

// TODO: add more information: what key is this song in? Is this chord in the key?

// TODO: add other songs we've worked on:
// "Automatic Stop",
// "Californication",
// "Come As You Are",
// "Day Tripper",
// "Fly Away",
// "I Bet You Look Good on the Dance Floor",
// "Le Temps de L'Amour",
// "Seven Nation Army",
// "Sunshine of Your Love",

const chordStringsToFrames = (chordStrings: string[]): FrameData[] => {
    return chordStrings.map((chordString) => {
        const frets = chordStringToFrets(chordString);
        const markers = fretsToMarkers(frets);
        return {
            label: chordString, // TODO: infer chord name.
            markers
        }
    });
}

const convertGuitarSong = (description: string, chordStrings: string[]): GuitarExercise => {
    return {
        description,
        frames: chordStringsToFrames(chordStrings)
    }
}

export const youOnlyLiveOnce = convertGuitarSong("You Only Live Once (The Strokes)", ["xxx999", "xxx997", "xxx879", "xxx676"]);
