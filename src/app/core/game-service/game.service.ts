import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import { create } from 'underscore';

const EMPTY_TILES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// ROWS and COLS are just for code clarity only. Code logic is not sure to depend on those values
const GAME_ROWS = 4;
const GAME_COLS = 4;

type Tile = number;
const EMPTY_TILE = 0;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public tiles: Tile[] = EMPTY_TILES;

  constructor() {}

  public newGame() {
    this.tiles = EMPTY_TILES;
    this.popNewTile();
  }

  // Paramters:
  // ox: [-1, 0 ,1]
  // oy: [-1, 0, 1]
  // return value: any tile moved
  private move(ox: number, oy: number): boolean {
    // Vector array, element at (x, y) is a displacement vector pointing where a tile should be moved
    // 0 - tile cannot be moved
    // 1 - tile will be moved one tile, if one exist
    // 2 - tile will be moved two tiles, if one exist
    let diffArray = Array<[number, number]>(16).fill([0, 0]);
    let anyTileMoved = false;

    if (ox !== 0 && oy !== 0) {
      throw new Error('Two non-zero arguments are not supported.');
    }

    const xArray = this.iteratorArray(4, ox > 0);
    const yArray = this.iteratorArray(4, oy > 0);

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

    for (let i of iArray) {
      for (let j of jArray) {
        let x = getX(i, j);
        let y = getY(i, j);

        // Neighbour - element closest in the move direction. Ex. element just above when all elements move up
        const neighbourIndex = this.getIndex(y + oy, x + ox);

        const isNeighbourOccupied =
          neighbourIndex !== undefined && this.tiles[neighbourIndex] !== EMPTY_TILE;
        const diffNeighbour =
          neighbourIndex !== undefined ? diffArray[neighbourIndex] : undefined;

        if (diffNeighbour !== undefined) {
          // If element of this iteration isn't on the edge

          if (isNeighbourOccupied) {
            diffArray[this.getIndex(y, x)!] = [diffNeighbour[0], diffNeighbour[1]];
          } else {
            diffArray[this.getIndex(y, x)!] = [
              diffNeighbour[0] + ox,
              diffNeighbour[1] + oy,
            ];
          }
        }
      }
    }

    for (let i of iArray) {
      for (let j of jArray) {
        let x = getX(i, j);
        let y = getY(i, j);

        const displacement = diffArray[this.getIndex(y, x)!];
        const tile = this.tiles[this.getIndex(y, x)!];
        if (tile !== EMPTY_TILE && !(displacement[0] === 0 && displacement[1] === 0)) {
          this.tiles[this.getIndex(y + displacement[1], x + displacement[0])!] = tile;
          this.tiles[this.getIndex(y, x)!] = EMPTY_TILE;
          anyTileMoved = true;
        }
      }
    }

    return anyTileMoved;
  }

  public moveUp() {
    if (this.move(0, -1)) {
      this.popNewTile();
    }
  }

  public moveDown() {
    if (this.move(0, 1)) {
      this.popNewTile();
    }
  }

  public moveLeft() {
    if (this.move(-1, 0)) {
      this.popNewTile();
    }
  }

  public moveRight() {
    if (this.move(1, 0)) {
      this.popNewTile();
    }
  }

  // Returns whether or not tile could be popped
  private popNewTile(): boolean {
    let nonZeroElementIndexes: number[] = [];
    for (let [i, _] of this.tiles.entries()) {
      if (this.tiles[i] === 0) {
        nonZeroElementIndexes.push(i);
      }
    }

    if (nonZeroElementIndexes.length === 0) {
      return false;
    }

    this.createNewTile(_.sample(nonZeroElementIndexes)!);
    return true;
  }

  private createNewTile(index: number) {
    if (this.tiles[index] !== 0) {
      throw new Error('Tile of index ' + index + ' is occupied.');
    }

    this.tiles[index] = Math.random() > 0.5 ? 4 : 2;
  }

  private getIndex(y: number, x: number): number | undefined {
    if (y < 0 || y >= GAME_ROWS || x < 0 || x >= GAME_COLS) {
      return undefined;
    }

    return GAME_COLS * y + x;
  }

  private iteratorArray(length: number, reversed: boolean) {
    if (reversed) {
      return Array.from({ length: length }, (_, i) => length - i - 1);
    }

    return [...Array(length).keys()];
  }
}
