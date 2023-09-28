import { getRandomGuitarExercise } from "./guitarExercises";

interface GuitarExerciseProps {}

const GuitarPractise: React.FC<GuitarExerciseProps> = (props: GuitarExerciseProps) => {
    return (
        <div className="guitarExercise">{getRandomGuitarExercise()}</div>
    );
}

export default GuitarPractise;