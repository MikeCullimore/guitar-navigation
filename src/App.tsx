import './App.css';
import { openG } from './chords';
import GuitarFretboard from './GuitarFretboard';

function App() {
  return (
    <GuitarFretboard positions={openG}/>
  );
}

export default App;
