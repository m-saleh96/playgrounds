import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Playground } from 'src/app/interfaces/playground';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() playground !: Playground

  constructor(private router:Router){}

redirectToDetails(id: number){
    // console.log(id);
    this.router.navigate(['playground/details/',id])
  }
}
