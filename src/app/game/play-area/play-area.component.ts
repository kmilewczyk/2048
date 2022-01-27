import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.scss']
})
export class PlayAreaComponent implements OnInit {
  @Input() tiles: number[] = [
    2, 4, 8, 16, 
    32, 64, 128, 256, 
    512, 1024, 2048, 4096, 
    8192, 16384, 32768, 65536,
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
