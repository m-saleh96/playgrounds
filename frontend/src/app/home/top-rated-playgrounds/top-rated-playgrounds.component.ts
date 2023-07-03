import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-top-rated-playgrounds',
  templateUrl: './top-rated-playgrounds.component.html',
  styleUrls: ['./top-rated-playgrounds.component.css']
})
export class TopRatedPlaygroundsComponent implements OnInit {
  topRatedPlaygrounds!: any[];

  constructor(private playgroundService: PlaygroundService) {}

  ngOnInit(): void {
    this.getTopRatedPlaygrounds();
  }

  getTopRatedPlaygrounds(): void {
    this.playgroundService.getTopRatedPlaygrounds()
      .subscribe(playgrounds => this.topRatedPlaygrounds = playgrounds);
  }
}
