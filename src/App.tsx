import './App.css';
import { G } from './chords';
import GuitarFretboard from './GuitarFretboard';

function App() {
  return (
    <GuitarFretboard positions={G}/>
  );
}

export default App;
