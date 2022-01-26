import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  elems = [
    '', '', '', '', '',
    '', '2', '', '', '',
    '', '', '', '16', '',
    '', '256', '', '', '',
    '', '', '2048', '2', '4',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
