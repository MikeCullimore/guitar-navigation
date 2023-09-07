import './App.css';
// import { Fsharp, chordToMarkers } from './chords';
// import GuitarFretboard from './GuitarFretboard';
import StateTransitionComponent from './StateTransitionComponent';

// TODO: show chord name (if rendering a chord).
function App() {
  return (
    // <GuitarFretboard markers={chordToMarkers(Fsharp)}/>
    <StateTransitionComponent/>
  );
}

export default App;
