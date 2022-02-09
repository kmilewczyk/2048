// Tile on the game board, like "2" or "2048"
export type Tile = number;

// Array which describes tile movement after a user input.
// Ex. [1, 0] means that tile moved once to the right
// Ex. [1, -2] means that tile moved once to the right and twice to the up
export type MovementFrameArray = Array<[number, number]>;