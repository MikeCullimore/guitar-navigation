import './App.css';
import { chordLibraryGuitar, fretsToMarkers } from './chords';
// import Fretboard from './Fretboard';
import GuitarFretboard from './GuitarFretboard';
// import StateTransitionComponent from './StateTransitionComponent';

// TODO: show chord name (if rendering a chord).
function App() {
  return (
    // <Fretboard numStrings={6} numFrets={22} markers={fretsToMarkers(chordLibraryGuitar.get('F#'))}/>
    <GuitarFretboard markers={fretsToMarkers(chordLibraryGuitar.get('Badd9'))}/>
    // <StateTransitionComponent/>
  );
}

export default App;
