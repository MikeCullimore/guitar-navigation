// TODO: SVG fretboard.
// TODO: dot at each fret position.
// TODO: animate (input is array of arrays of positions ,,, also with timings?).

interface FretboardProps {
    positions: Position[]
}

export interface Position {
    string: number;
    fret: number;
}

const GuitarFretboard: React.FC<FretboardProps> = (props: FretboardProps) => {
    return (
        <ol>
            {props.positions.map((position, i) => <li key={i}>{`string: ${position.string}, fret: ${position.fret}`}</li>)}
        </ol>
    );
}

export default GuitarFretboard;