import { Injectable } from '@angular/core';
import { MovementFrameArray, Tile } from '@app/shared/models/game-models';
import { Subject } from 'rxjs';
import * as _ from 'underscore';
import { move } from './move.function';
import { EMPTY_TILE, EMPTY_TILES, GAME_COLS, GAME_ROWS } from './_consts';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  // Current state of the tiles
  public tiles: Tile[] = EMPTY_TILES.slice();
  public get movementFrame$() {
    return this.movementFrameSubject.asObservable();
  }

  private movementFrameSubject = new Subject<MovementFrameArray>();

  constructor() {}

  public newGame() {
    this.tiles = EMPTY_TILES.slice();
    this.popNewTile();
  }

  public moveUp() {
    if (this.move(0, -1)) {
      // If anything has moved
      
      // Add new tile
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

  private move(ox: number, oy: number) {
    return move(ox, oy, this.tiles);
  }

  // Returns whether there was a space left for a new tile to be popped in.
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
