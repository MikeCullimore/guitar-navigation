// TODO: layout containers for string label, fretboard and keyboard.

import './App.css';
import GuitarPractise from './guitar/GuitarPractise';
// import Keyboard from './piano/Keyboard';
// import { chordLibraryGuitar, fretsToMarkers } from './chords';
// import Fretboard from './Fretboard';
// import GuitarFretboard from './GuitarFretboard';
// import GuitarFretboardAnimation, { exampleFrames } from './GuitarFretboardAnimation';
// import GuitarPractise from './guitar/GuitarPractise';
// import StateTransitionComponent from './StateTransitionComponent';

function App() {
  return (
    // <Keyboard numOctaves={2}/>
    // <Fretboard numStrings={6} numFrets={22} markers={fretsToMarkers(chordLibraryGuitar.get('F#'))}/>
    // <GuitarFretboard markers={fretsToMarkers(chordLibraryGuitar.get('Badd9'))}/>
    // <StateTransitionComponent/>
    // <GuitarFretboardAnimation frames={exampleFrames}/>
    <GuitarPractise/>
  );
}

export default App;
