import { Component } from '@angular/core';


@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.css']
})
export class PlaygroundsComponent{
  playGrounds:any[]=[];
  reciveFromChild(data:any){
    this.playGrounds=data
  }
}
