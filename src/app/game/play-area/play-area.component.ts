import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GameService } from '@app/core/game-service/game.service';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent implements OnInit {
  constructor(public gameService: GameService) { }

  get tiles() {
    return this.gameService.tiles;
  }

  ngOnInit(): void {
    this.gameService.newGame();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'w':
        this.gameService.moveUp();
      break;
      case 's':
        this.gameService.moveDown();
      break;
      case 'd':
        this.gameService.moveRight();
      break;
      case 'a':
        this.gameService.moveLeft();
      break;
    }
  }
}
