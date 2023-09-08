// TODO: adapt keyboard dimensions from guitar-technique repo.
// TODO: lookup chroma -> vertices of key in normalised space [0, 100%]
// TODO: conversion to multiple octaves.
// TODO: allow any first and last key, not just whole octaves.

import { Chroma } from "./chroma";

export interface KeyboardProps {
    numOctaves: number;
}

interface Point {
    x: number;
    y: number;
}

type KeyVerticesLookup = Record<keyof typeof Chroma, Point[]>;

// TODO: keyboard dimensions as input. Return function: chroma -> vertices? Build up lookup, return value for given note key.
// TODO: return polygon directly?
const getKeyVertices = (chroma: Chroma): Point[] => {
    const keyVerticesLookup: KeyVerticesLookup = {
        C: [],
    }
    return [];
}

const Keyboard: React.FC<KeyboardProps> = (props: KeyboardProps) => {
    return (
        <div>
        <p>One day I'll be a keyboard spanning {props.numOctaves} octave(s).</p>
        <svg xmlns="http://www.w3.org/2000/svg">
            <line x1="0%" y1="0%" x2="100%" y2="100%" className="key-border"/>
        </svg>
        </div>
    );
}

export default Keyboard;