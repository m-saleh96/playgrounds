import { Component } from '@angular/core';
import { FilterPlayGroundsService } from '../services/filter-play-grounds.service';


@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.css']
})
export class PlaygroundsComponent{
  playGrounds:any[]=[];
  page:number =1;
  constructor(private filterService:FilterPlayGroundsService) {}

  reciveFromChild(data:any){
    this.playGrounds=data
  }



nextPage(){
    this.page ++
    if (this.playGrounds.length == 0) {
      this.page --
    }
}
prevPage(){
    if((this.page>1)){
      this.page --
    }
}

}
