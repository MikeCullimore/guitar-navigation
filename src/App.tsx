// TODO: layout containers for string label, fretboard and keyboard.

import './App.css';
// import { chordLibraryGuitar, fretsToMarkers } from './chords';
// import Fretboard from './Fretboard';
// import GuitarFretboard from './GuitarFretboard';
// import GuitarFretboardAnimation from './GuitarFretboardAnimation';
import Keyboard, { getKeyboardProps } from './Keyboard';
// import StateTransitionComponent from './StateTransitionComponent';

function App() {
  return (
    // <Fretboard numStrings={6} numFrets={22} markers={fretsToMarkers(chordLibraryGuitar.get('F#'))}/>
    // <GuitarFretboard markers={fretsToMarkers(chordLibraryGuitar.get('Badd9'))}/>
    // <StateTransitionComponent/>
    // <GuitarFretboardAnimation chords={['E6', 'F', 'Badd9', 'F#']}/>
    <Keyboard {...getKeyboardProps(1)}/>
  );
}

export default App;
