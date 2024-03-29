import GuitarFretboardAnimation from "./GuitarFretboardAnimation";
import { getRandomGuitarExercise, identifyNotesOnLowEStringInlayFrets, playRandomChromaAllPositions } from "./guitarExercises";
import { getGuitarPositionLookups, getFretToNoteLookupForString, standardGuitarTuning } from "./guitarTuning";
import { Chroma, Note, noteToString } from "../musicTheory";
import { youOnlyLiveOnce } from "./guitarSongs";

// TODO: make this a unit test.
const debugGetChromaToPositionsLookupForGuitar = () => {
    const numFrets = 22;
    const guitarPositionLookups = getGuitarPositionLookups(standardGuitarTuning, numFrets);
    const chroma = Chroma.E;
    const positions = guitarPositionLookups.getAllPositionsForChroma(chroma);
    const positionsString = positions.map(position => `(${position.string}, ${position.fret})`).join(', ');
    console.log(`Positions for chroma ${chroma}: ${positionsString}`);
}

// TODO: make this a unit test.
const debugGetFretToNoteLookupForString = () => {
    const openE: Note = {
        chroma: Chroma.E,
        octave: 2
    }
    const numFrets = 22;
    const getNoteAtFret = getFretToNoteLookupForString(openE, numFrets);
    const note = getNoteAtFret(0); // Should be open string.
    const note2 = getNoteAtFret(14);
    console.log(`note = ${noteToString(note)}`);
    console.log(`note2 = ${noteToString(note2)}`);
}

const GuitarPractise: React.FC<{}> = () => {
    // debugGetChromaToPositionsLookupForGuitar();
    // debugGetFretToNoteLookupForString();

    // const exercise = playRandomChromaAllPositions();
    // const exercise = youOnlyLiveOnce;
    const exercise = identifyNotesOnLowEStringInlayFrets();
    
    return (
        // <div className="guitarExercise">{getRandomGuitarExercise()}</div>
        // TODO: use label (or make optional on interface).
        // TODO: enable cycling through exercises (on a timer?).
        // TODO: styling for exercise description (centred, top).
        <div>
            <div>{exercise.description}</div>
            <GuitarFretboardAnimation frames={exercise.frames}/>
        </div>
    );
}

export default GuitarPractise;