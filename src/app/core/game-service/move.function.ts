import { MovementFrameArray, Tile } from '@app/shared/models/game-models';
import { EMPTY_TILE, GAME_COLS, GAME_ROWS } from './_consts';

type TileIteration = {
  iArray: number[];
  jArray: number[];
  getX: (i: any, j: any) => any;
  getY: (i: any, j: any) => any;
};

export function move(ox: number, oy: number, tiles: Tile[]) {
  if (ox !== 0 && oy !== 0) {
    throw new Error('Two non-zero arguments are not supported.');
  }

  let ti = getIterators(ox, oy);

  let diffArray = createMovementFrame(ti, oy, ox, tiles);

  let anyTileMoved = updateTiles(ti, diffArray, tiles);

  return anyTileMoved;
}

function updateTiles(ti: TileIteration, diffArray: MovementFrameArray, tiles: number[]) {
    let anyTileMoved = false;

    for (let i of ti.iArray) {
        for (let j of ti.jArray) {
            let x = ti.getX(i, j);
            let y = ti.getY(i, j);

            const displacement = diffArray[getIndex(y, x)!];
            const tile = tiles[getIndex(y, x)!];
            if (tile !== EMPTY_TILE &&
                !(displacement[0] === 0 && displacement[1] === 0)) {
                tiles[getIndex(y + displacement[1], x + displacement[0])!] = tile;
                tiles[getIndex(y, x)!] = EMPTY_TILE;
                anyTileMoved = true;
            }
        }
    }
    return anyTileMoved;
}

// Creates iterator struct that dictates how should tiles be read, from left to right, or from top to bottom
function getIterators(ox: number, oy: number): TileIteration {
  const xArray = iteratorArray(4, ox > 0);
  const yArray = iteratorArray(4, oy > 0);

  // Check wheter iteration should go left-right direction (*horizontal*ly) or up-down
  const horizontal: boolean = ox !== 0;

  // horizontally: x - outer loop, y - inner loop
  // vertically: y - outer loop, x - inner loop
  let iArray, jArray;
  if (horizontal) {
    iArray = xArray;
    jArray = yArray;
  } else {
    iArray = yArray;
    jArray = xArray;
  }

  const takeOuter = (i: any, _: any) => i;
  const takeInner = (_: any, j: any) => j;

  const getX = horizontal ? takeOuter : takeInner;
  const getY = horizontal ? takeInner : takeOuter;

  return { iArray, jArray, getX, getY };
}

// Creates a movement frame Array
function createMovementFrame(
  ti: TileIteration,
  oy: number,
  ox: number,
  tiles: number[]
): MovementFrameArray {
  let diffArray: MovementFrameArray = Array(16).fill([0, 0]);
  for (let i of ti.iArray) {
    for (let j of ti.jArray) {
      let x = ti.getX(i, j);
      let y = ti.getY(i, j);

      // Neighbour - element closest in the move direction. Ex. element just above when all elements move up
      const neighbourIndex = getIndex(y + oy, x + ox);

      const isNeighbourOccupied =
        neighbourIndex !== undefined && tiles[neighbourIndex] !== EMPTY_TILE;
      const diffNeighbour =
        neighbourIndex !== undefined ? diffArray[neighbourIndex] : undefined;

      if (diffNeighbour !== undefined) {
        // If element of this iteration isn't on the edge
        if (isNeighbourOccupied) {
          diffArray[getIndex(y, x)!] = [diffNeighbour[0], diffNeighbour[1]];
        } else {
          diffArray[getIndex(y, x)!] = [
            diffNeighbour[0] + ox,
            diffNeighbour[1] + oy,
          ];
        }
      }
    }
  }

  return diffArray;
}

function getIndex(y: number, x: number): number | undefined {
  if (y < 0 || y >= GAME_ROWS || x < 0 || x >= GAME_COLS) {
    return undefined;
  }

  return GAME_COLS * y + x;
}

function iteratorArray(length: number, reversed: boolean) {
  if (reversed) {
    return Array.from({ length: length }, (_, i) => length - i - 1);
  }

  return [...Array(length).keys()];
}
