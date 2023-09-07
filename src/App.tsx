import './App.css';
import { chordLibrary, fretsToMarkers } from './chords';
import GuitarFretboard from './GuitarFretboard';
// import StateTransitionComponent from './StateTransitionComponent';

// TODO: show chord name (if rendering a chord).
function App() {
  return (
    <GuitarFretboard markers={fretsToMarkers(chordLibrary.get('F#'))}/>
    // <StateTransitionComponent/>
  );
}

export default App;
