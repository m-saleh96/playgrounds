import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Playground } from 'src/app/interfaces/playground';

@Component({
  selector: 'app-top-rated-card-playgrounds',
  templateUrl: './top-rated-card-playgrounds.component.html',
  styleUrls: ['./top-rated-card-playgrounds.component.css']
})
export class TopRatedCardPlaygroundsComponent {
  @Input() playground !: Playground

  constructor(private router:Router){}


  redirectToDetails(id: number){
    this.router.navigate(['playground/details/',id])
  }
    isExpanded = false; // define and initialize isExpanded property

}
