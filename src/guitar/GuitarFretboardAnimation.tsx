import React, { useState, useEffect, useRef } from 'react';
import { chordLibraryGuitar, exampleChords, fretsToMarkers } from '../chords';
import GuitarFretboard from './GuitarFretboard';
import { Markers } from './Fretboard';

type FrameRef = number | null;

export interface GuitarFretboardAnimationProps {
  frames: FrameData[];
}

export interface FrameData extends Markers {
  // millisecondsElapsed: number;
  label: string; // (Could be note name, chord name...)
}

// TODO: equivalent function for melodies/arrays of single notes (e.g. scales, arepeggios).
// TODO: use different colours for different fingerings/voicings.
export const chordToFrameData = (chordName: string): FrameData => {
  return {
    label: chordName,
    markers: fretsToMarkers(chordLibraryGuitar.get(chordName) ?? [])
  };
}

export const exampleFrames = exampleChords.map(chordName => chordToFrameData(chordName));

// TODO: support variable time interval between chord changes.
const GuitarFretboardAnimation: React.FC<GuitarFretboardAnimationProps> = (props: GuitarFretboardAnimationProps) => {
  const frames = props.frames;
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  const animationFrameIdRef = useRef<FrameRef>(null);
  const startTimeRef = useRef<FrameRef>(null);

  // TODO: interval as prop also.
  const intervalMilliseconds = 5000;

  const scheduleTransition = () => {
    const nextStateIndex = (currentStateIndex + 1) % frames.length;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const elapsedTime = timestamp - startTimeRef.current!;

      if (elapsedTime >= intervalMilliseconds) {
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
    // TODO: fix linter warning:
    // React Hook useEffect has a missing dependency: 'scheduleTransition'.
    // Either include it or remove the dependency array  react-hooks/exhaustive-deps
    scheduleTransition();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [currentStateIndex]);

  const currentFrame = frames[currentStateIndex];

  return (
    <div>
      <GuitarFretboard markers={currentFrame.markers}/>
      <div className="frameLabel">{currentFrame.label}</div>
    </div>
    );
}

export default GuitarFretboardAnimation;