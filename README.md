# guitar-navigation

Draw dots on the fretboard to help with finding your way around.

## How to start the app

```
npm start
```

(See `README-CRA.md`)

## TODO

* Animate sequence of frames.
    * Frame can be chord or individual note.
    * Start with fixed time interval between frames.
    * Then change to say milliseconds elapsed.
    * Combine StateTransitionComponent with GuitarFretboard.
* Make a standalone script to prototype and debug changes.
* Use [tonal](https://www.npmjs.com/package/tonal) for music theory?
* Static render of all notes on neck with names as labels.
    * Function to return note name given string and fret (and tuning!).
* Semantic input e.g. G chord: each note has string, fret, note name and scale degree.
* Inputs are array of dots with common styling. Handle semantics elsewhere.
* Common base component for fretboard, call with # strings, # frets for guitars, bass, ukelele.
* Link to exercise generator: scales, arpeggios etc.
* How to drive state?
* Typing to capture other inputs e.g. notes, scales.
* Converter to pass to render layer e.g. for scale might want to show all notes and highlight current.
* Type to input to render layer is *not" chord or note etc. but markers with semantic properties e.g. labels.
* Does this need React? Vanilla SVG enough?
* Animate! Adapt from [Fender Play blog post](https://medium.com/fender-engineering/near-realtime-animations-with-synchronized-audio-in-javascript-6d845afcf1c5)
    * Use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
    * Prototype with `setInterval` and accept inaccurate timing?
* Separate components for marker, fretboard (separate board, frets, strings, inlays) and container (has xy lookups).
* Interval labels as consts e.g. `PERFECT_FIFTH = "p5"`
* CSS: how to do styling from semantic properties e.g. scale degree?
* Scales: generate, do not hard-code.
* Metronome/click track (audio and visual).
* Exercise generator for minor pentatonic scale.