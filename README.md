# guitar-navigation

Draw dots on the fretboard to help with finding your way around.

## How to start the app

```
npm start
```

(See `README-CRA.md` for original readme from create-react-app.)

## TODO

* Combine fretboard and keyboard in single component.
* Exercise generator:
    * Intro page with description of exercise.
    * Loop forever: generate random next exercise.
    * Add animation (inputs?) to exercise description.
* Animate sequence of frames: see GuitarFretboardAnimation.tsx
    * Frame can be chord or individual note.
    * Start with fixed time interval between frames.
    * Then change to say milliseconds elapsed.
    * ASCII tab as alternative input format.
    * Use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
    * Adapt from [Fender Play blog post](https://medium.com/fender-engineering/near-realtime-animations-with-synchronized-audio-in-javascript-6d845afcf1c5)
    * Engine to convert simple inputs to more fully-featured animations e.g.:
        * Could show next chord ahead of time in grey.
        * For scales, arpeggios could show all notes in advance and highlight current one.
        * Input BPM, convert to milliseconds interval. (Test how reliable timing is as function of interval.)
        * How to parse rhythms? What formats out there?
        * Refactor to require only diff from previous frame? (React will do this?)
    * Given component A for single frame and interface for props, make generic component to animate A over time.
* Make a standalone script to prototype and debug changes.
    * `nodemon`: see e.g. mermaid diagram compiler script.
* Static render of all notes on neck with names as labels.
* Semantic input e.g. G chord: each note has string, fret, note name and scale degree.
* Converter to pass to render layer e.g. for scale might want to show all notes and highlight current.
* Text to speech to read out exercise instructions.
* UI controls for e.g. exercise speed (e.g. BPM at which to show scale animation).
* Interval labels as consts e.g. `PERFECT_FIFTH = "p5"`
* CSS: how to do styling from semantic properties e.g. scale degree?
* Scales: generate, do not hard-code.
* Metronome/click track (audio and visual).
* Use [tonal](https://www.npmjs.com/package/tonal) for music theory?
* Chord diagrams
* Fonts: choose appropriate font in each context.
* TAB
* Dark mode. Absolutely lowest priority! :D