export enum Chroma {
    C,
    CSharp,
    D,
    DSharp,
    E,
    F,
    FSharp,
    G,
    GSharp,
    A,
    ASharp,
    B
}

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

export const isWhiteKey = (chroma: Chroma): Boolean => {
    return !isBlackKey(chroma);
}
