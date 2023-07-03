import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playground } from 'src/app/interfaces/playground';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-top-rated-playgrounds',
  templateUrl: './top-rated-playgrounds.component.html',
  styleUrls: ['./top-rated-playgrounds.component.css']
})
export class TopRatedPlaygroundsComponent implements OnInit {
  topRatedPlaygrounds!: any[];
  @Input() playground !: Playground

  constructor(private playgroundService: PlaygroundService, private router:Router) {}

  ngOnInit(): void {
    this.getTopRatedPlaygrounds();
    this.topRatedPlaygrounds.splice(3);
  }

  getTopRatedPlaygrounds(): void {
    this.playgroundService.getTopRatedPlaygrounds()
      .subscribe(playgrounds => this.topRatedPlaygrounds = playgrounds);
  }

  redirectToDetails(id: number){
    this.router.navigate(['playground/details/',id])
  }
}
