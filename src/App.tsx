import './App.css';
import { Fsharp, chordToMarkers } from './chords';
import GuitarFretboard from './GuitarFretboard';

// TODO: show chord name (if rendering a chord).
function App() {
  return (
    <GuitarFretboard markers={chordToMarkers(Fsharp)}/>
  );
}

export default App;
