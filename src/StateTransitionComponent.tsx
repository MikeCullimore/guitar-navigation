import React, { useState, useEffect, useRef } from 'react';

type FrameRef = number | null;

// TODO: combine with GuitarFretboard to animate sequence of notes/chords!
const StateTransitionComponent = () => {
  const states = ['E6', 'F', 'Badd9', 'F#'];
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

  const currentState = states[currentStateIndex];

  return (
    <div>
      <h1>{currentState}</h1>
    </div>
  );
};

export default StateTransitionComponent;
