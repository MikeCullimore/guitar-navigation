// TODO: SVG fretboard.
// TODO: fit to screen (what are viewport units?)
// TODO: string thicknesses.
// TODO: dot at each fret position.
// TODO: animate (input is array of arrays of positions ,,, also with timings?).

const yValues = [10, 20, 30, 40, 50, 60];

interface FretboardProps {
    positions: Position[]
}

export interface Position {
    string: number;
    fret: number;
}

const GuitarFretboard: React.FC<FretboardProps> = (props: FretboardProps) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {yValues.map((yValue, i) => <line key={i} x1="5%" y1={`${yValue}%`} x2="95%" y2={`${yValue}%`} stroke="black" />)}
        </svg>
    );
}

export default GuitarFretboard;