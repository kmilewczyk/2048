import { Component, OnInit } from '@angular/core';
import { GameService } from '@app/core/game-service/game.service';

@Component({
  selector: 'app-game-buttons',
  templateUrl: './game-buttons.component.html',
  styleUrls: ['./game-buttons.component.scss']
})
export class GameButtonsComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  onNewGame(): void {
    this.gameService.moveUp();
  }
}
