import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';
import { GameTileComponent } from './game-tile/game-tile.component';
import { PlayAreaComponent } from './play-area/play-area.component';
import { SharedModule } from '../shared/shared.module';
import { GameButtonsComponent } from './game-buttons/game-buttons.component';


@NgModule({
  declarations: [
    GameComponent,
    GameTileComponent,
    PlayAreaComponent,
    GameButtonsComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule
  ]
})
export class GameModule { }
