import { AfterContentInit, AfterViewInit, Input } from '@angular/core';
import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss'],
})
export class GameTileComponent implements OnInit {
  @ViewChild('tile') tileElement?: ElementRef;

  @Input() value: number = 0;

  get tileArea(): HTMLDivElement {
    return this.tileElement?.nativeElement as HTMLDivElement;
  }

  get tileText(): HTMLHeadingElement {
    return this.tileArea.querySelector('h1')!;
  }

  get valueLog(): number {
    return Math.floor(Math.log10(this.value));
  }

  constructor() {}

  ngOnInit(): void {}

  tileClass(value: number): string {
    if (value < 2) {
      return '';
    }

    const log = Math.floor(Math.log2(value));

    return [
      'tile-2',
      'tile-4',
      'tile-8',
      'tile-16',
      'tile-32',
      'tile-64',
      'tile-128',
      'tile-256',
      'tile-512',
      'tile-1024',
      'tile-2048',
      'tile-4096',
      'tile-8192',
      'tile-16384',
      'tile-32768',
      'tile-65536',
    ][log-1];
  }
}
