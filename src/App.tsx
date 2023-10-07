// TODO: layout containers for string label, fretboard and keyboard.

import './App.css';
// import { chordLibraryGuitar, fretsToMarkers } from './chords';
// import Fretboard from './Fretboard';
// import GuitarFretboard from './GuitarFretboard';
// import GuitarFretboardAnimation, { exampleFrames } from './GuitarFretboardAnimation';
import GuitarPractise from './GuitarPractise';
// import Keyboard from './Keyboard';
// import StateTransitionComponent from './StateTransitionComponent';

function App() {
  return (
    // <Fretboard numStrings={6} numFrets={22} markers={fretsToMarkers(chordLibraryGuitar.get('F#'))}/>
    // <GuitarFretboard markers={fretsToMarkers(chordLibraryGuitar.get('Badd9'))}/>
    // <StateTransitionComponent/>
    // <GuitarFretboardAnimation frames={exampleFrames}/>
    // <Keyboard numOctaves={2}/>
    <GuitarPractise/>
  );
}

export default App;
