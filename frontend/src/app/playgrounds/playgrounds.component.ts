import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from '../services/playground.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.css']
})
export class PlaygroundsComponent implements OnInit{
  playGrounds:any[]=[];
  startDate: string='';
  constructor (private playGroundService:PlaygroundService){}

  ngOnInit(): void {
    this.playGroundService.listAll().subscribe(data=>this.playGrounds = data)
  }

  showTypeContent: boolean = true;
  showPriceContent: boolean = false;
  showReviewsContent: boolean = false;
  showLocationContent: boolean = false;

  toggleContent(section: string): void {
    if (section === 'type') {
      this.showTypeContent = !this.showTypeContent;
    } else if (section === 'price') {
      this.showPriceContent = !this.showPriceContent;
    } else if (section === 'reviews') {
      this.showReviewsContent = !this.showReviewsContent;
    } else if (section === 'location') {
      this.showLocationContent = !this.showLocationContent;
    }
  }


  tennis!: boolean;
  paddle!:boolean;
  football!:boolean;
  p50!:boolean;
  p100!:boolean;
  p200!:boolean;
  p201!:boolean;
  cairo!:boolean;
  mansoura!:boolean;

  filter(){
    this.playGroundService.tennis = this.tennis;
    this.playGroundService.paddle = this.paddle;
    this.playGroundService.football = this.football;
    this.playGroundService.p50 = this.p50;
    this.playGroundService.p100 = this.p100;
    this.playGroundService.p200 = this.p200;
    this.playGroundService.p201 = this.p201;
    this.playGroundService.cairo = this.cairo;
    this.playGroundService.mansoura = this.mansoura;


    this.playGroundService.filter().subscribe(data=>{
      this.playGrounds = data
      console.log(data);

    })

  }
}
