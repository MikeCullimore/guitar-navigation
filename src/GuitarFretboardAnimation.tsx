import React, { useState, useEffect, useRef } from 'react';
import { chordLibraryGuitar, fretsToMarkers } from './chords';
import GuitarFretboard from './GuitarFretboard';

type FrameRef = number | null;

interface GuitarFretboardAnimationProps {
    chords: string[];
}

// TODO: show chord name as well.
// TODO: parse chord names to note markers in advance, pass as props.
// TODO: support variable time interval between chord changes.
const GuitarFretboardAnimation: React.FC<GuitarFretboardAnimationProps> = (props: GuitarFretboardAnimationProps) => {
  const states = props.chords;
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  const animationFrameIdRef = useRef<FrameRef>(null);
  const startTimeRef = useRef<FrameRef>(null);

  const scheduleTransition = () => {
    const nextStateIndex = (currentStateIndex + 1) % states.length;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsedTime = timestamp - startTimeRef.current!;

      // TODO: interval as prop also.
      if (elapsedTime >= 2000) {
        setCurrentStateIndex(nextStateIndex);
        startTimeRef.current = null;
        scheduleTransition();
      } else {
        animationFrameIdRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    scheduleTransition();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [currentStateIndex]);

  const currentChordName = states[currentStateIndex];
  const markers = fretsToMarkers(chordLibraryGuitar.get(currentChordName))

  return <GuitarFretboard markers={markers}/>;
}

export default GuitarFretboardAnimation;