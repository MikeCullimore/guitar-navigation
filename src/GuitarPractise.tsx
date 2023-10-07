import { getRandomGuitarExercise } from "./guitarExercises";
import { getFretToNoteLookupForString } from "./guitarTuning";
import { Chroma, Note, noteToString } from "./musicTheory";

interface GuitarExerciseProps {}

const GuitarPractise: React.FC<GuitarExerciseProps> = (props: GuitarExerciseProps) => {
    // TODO: remove when debugging complete. (Set up to do this offline.)
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
    
    return (
        <div className="guitarExercise">{getRandomGuitarExercise()}</div>
    );
}

export default GuitarPractise;