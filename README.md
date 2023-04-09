# guitar-navigation

Draw dots on the fretboard to help with finding your way around.

## TODO

* Semantic input e.g. G chord: each note has string, fret, note name and scale degree.
* Inputs are array of dots with common styling. Handle semantics elsewhere.
* Animate (input is array of arrays of positions ... also with timings?).
* Common base component for fretboard, call with # strings, # frets for guitars, bass, ukelele.
* Link to exercise generator: scales, arpeggios etc.
* How to drive state?
* Typing to capture other inputs e.g. notes, scales.
* Converter to pass to render layer e.g. for scale might want to show all notes and highlight current.
* Type to input to render layer is *not" chord or note etc. but markers with semantic properties e.g. labels.
* Does this need React? Vanilla SVG enough?
* Animate! Adapt from [Fender Play blog post](https://medium.com/fender-engineering/near-realtime-animations-with-synchronized-audio-in-javascript-6d845afcf1c5)
    * Use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) 
* Separate components for marker, fretboard (separate board, frets, strings, inlays) and container (has xy lookups).
