import { Component, OnInit } from '@angular/core';
import { FilterPlayGroundsService } from '../services/filter-play-grounds.service';


@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.css']
})
export class PlaygroundsComponent implements OnInit{
  playGrounds:any[]=[];
  page:number =1;
  lastPage!:number;
  constructor(private filterService:FilterPlayGroundsService) {}


  reciveFromChild(data:any){
    this.playGrounds=data[0]
    this.lastPage=data[1]
  }

  ngOnInit(): void {
    this.filterService.pag.subscribe(data=>{
      this.page =data;
    })
  }

nextPage(){
    if (this.filterService.lastPage > this.page) {
      this.page ++
    }
}
prevPage(){
    if((this.page>1)){
      this.page --
    }
}

}
