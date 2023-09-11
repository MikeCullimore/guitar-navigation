// TODO: guitar practice component that just displays instructions on a loop.

import './App.css';
// import { chordLibraryGuitar, fretsToMarkers } from './chords';
// import Fretboard from './Fretboard';
// import GuitarFretboard from './GuitarFretboard';
// import GuitarFretboardAnimation from './GuitarFretboardAnimation';
// import Keyboard from './Keyboard';
import LayoutPlayground from './LayoutPlayground';
// import StateTransitionComponent from './StateTransitionComponent';

function App() {
  return (
    // <Fretboard numStrings={6} numFrets={22} markers={fretsToMarkers(chordLibraryGuitar.get('F#'))}/>
    // <GuitarFretboard markers={fretsToMarkers(chordLibraryGuitar.get('Badd9'))}/>
    // <StateTransitionComponent/>
    // <GuitarFretboardAnimation chords={['E6', 'F', 'Badd9', 'F#']}/>
    // <Keyboard numOctaves={2}/>
    <LayoutPlayground/>
  );
}

export default App;
