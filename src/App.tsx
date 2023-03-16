import './App.css';
import GuitarFretboard, { Position } from './GuitarFretboard';

// TODO: generate from simpler representation (CSV?).
// TODO: pre-define cowboy chords, barre chords etc.
// TODO: mappings will depend on guitar tuning.
const positions: Position[] = [
  { string: 1, fret: 1},
  { string: 2, fret: 3},
];

function App() {
  return (
    <GuitarFretboard positions={positions}/>
  );
}

export default App;
