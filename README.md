# guitar-navigation

Exercises to help improve your guitar skills (plural: see below!).

I have been trying to learn guitar for a few years and I can play a handful of fragments, but despite my teacher's best efforts (and they are an excellent teacher):

* I have no idea where notes are on the fretboard.
* I forget even the most essential chords.
* The only scale I know is minor pentatonic, first position.
* (...I could go on!)

"Playing guitar" is not one skill, but many! For example:

* Keeping rhythm.
* Finding notes
* Fingering chords (quickly!)
* Recognising chords.
* Achieving good tone.
* Playing back something you hear.
* Playing what you "hear" in your head (your mind's ear?).
* Recognising intervals.
* Improvising solos over a chord progression.
* Conveying emotion.
* (etc.)

## How to start the app

```bash
npm start
```

(See `README-CRA.md` for original readme from create-react-app.)

## How to deploy the app to GitHub pages

Build:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

## Useful links

* [fretjam.com](fretjam.com) is a fantastic site with many resources and structured lessons.
    * [3 chord progressions](https://www.fretjam.com/three-chord-guitar.html)

## TODO

* Configure Storybook, use it to design UI components. 
* Essential chords: see notebook.
* Text labels on note markers.
* Combine fretboard and keyboard in single component.
    * Reconcile SVG dimensions (currently one works, other doesn't).
* Exercise generator:
    * Intro page with description of exercise.
    * Loop forever: generate random next exercise.
    * Re-randomise each exercise when it loops round? (E.g. finding notes: randomise order of notes each time.)
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
* Optimise for desktop, tablet and phone
    * Responsive web design
    * CSS media queries
    * Use `vw` units (viewport width)
    * On small screens, show only fretboard; on larger ones, keyboard also.
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
* Minimise commented code: ripe for bugs!
* Organise styles (not all in `App.css`): [styled components](https://styled-components.com/)?

### TODO: exercises

* Identify each string (both ways: which string is this? And which string is e.g. A?).
* Find given note on given string (prioritise low E string and A: chord roots).
* Find given note on all strings.
* Power chords.
* One chord, all positions along the neck.
* Octave shapes (elaborate).
* Intervals: from given note, find e.g. major third.
    * https://www.fretjam.com/guitar-intervals-fretboard.html
* Scale on given string (many scales! Say note names out loud as you play).
    * Prioritise minor pentatonic, all positions.
* Chord, arpeggio, chord. Rick Beato: https://www.youtube.com/live/19jF6ZwJm-A?si=AoA5QKwu2aZ8qF_W
* Variations of a given chord (dominant, diminished etc.).
    * See https://virtualpiano.vercel.app/
    * Source code: https://github.com/sophiekoonin/virtualpiano
* Play pitch audio, find it on fretboard. (Extend to melody.)
* Play all chords in given key.
* Twelve bar blues.
* Common chord progressions e.g. C G Am F. See https://www.fretjam.com/three-chord-guitar.html
* Play simple melodies.
