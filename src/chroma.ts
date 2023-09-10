// TODO: want to capture order. String enum right choice over numeric?
export enum Chroma {
    C = "C",
    CSharp = "C#",
    D = "D",
    DSharp = "D#",
    E = "E",
    F = "F",
    FSharp = "F#",
    G = "G",
    GSharp = "G#",
    A = "A",
    ASharp = "A#",
    B = "B"
}

export const ALL_CHROMAS = Object.values(Chroma);

const blackPianoKeys: Chroma[] = [
    Chroma.CSharp,
    Chroma.DSharp,
    Chroma.FSharp,
    Chroma.GSharp,
    Chroma.ASharp
];

export const isBlackKey = (chroma: Chroma): Boolean => {
    return blackPianoKeys.includes(chroma);
}
