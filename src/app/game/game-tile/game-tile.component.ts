import { AfterContentInit, AfterViewInit } from '@angular/core';
import { AfterContentChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss'],
})
export class GameTileComponent implements OnInit, AfterContentChecked, AfterViewInit {
  @ViewChild('tileValue') tileValueRef: any;

  get tileValue(): HTMLHeadingElement {
    return this.tileValueRef.nativeElement;
  }

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.adjustFont();
  }

  ngAfterContentChecked(): void {
  }

  private adjustFont() {
    let currentClass = this.tileValue.className;
    if (currentClass !== "") {
      this.tileValue.classList.remove(currentClass);
    }

    switch (this.tileValue.textContent?.length) {
      case 1:
        this.tileValue.classList.add('single-digit');
        break;
      case 2:
        this.tileValue.classList.add('double-digit');
        break;
      case 3:
        this.tileValue.classList.add('triple-digit');
        break;
    }
  }
}
