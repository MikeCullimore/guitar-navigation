import { Note } from "../musicTheory";

const defaultStroke = "lightgray";
const defaultStrokeWidth = 0.5;

const numberToPercentString = (number: Number): string => {
    return `${number}%`
}

// TODO: current state of which keys are pressed to be captured by map of note to KeyStyling.
// (If not in map, use defaults for black/white key.)
export interface KeyStyling {
    fill: string;
    stroke?: string;
    strokeWidth?: number;
}

export interface KeyBaseProps extends KeyStyling {
    width: number;
    height: number;
}

// TODO: add optional text label?
export interface KeyProps extends KeyBaseProps {
    note: Note;
    x: number;
}

const Key: React.FC<KeyProps> = (props: KeyProps) => {
    return (
        <rect
            x={numberToPercentString(props.x)}
            y="0"
            width={numberToPercentString(props.width)}
            height={numberToPercentString(props.height)}
            fill={props.fill}
            stroke={props.stroke ?? defaultStroke}
            strokeWidth={numberToPercentString(props.strokeWidth ?? defaultStrokeWidth)}
        />
    );
}

export default Key;