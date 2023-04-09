import './App.css';
import { G, chordToMarkers } from './chords';
import GuitarFretboard from './GuitarFretboard';

function App() {
  return (
    <GuitarFretboard markers={chordToMarkers(G)}/>
  );
}

export default App;
