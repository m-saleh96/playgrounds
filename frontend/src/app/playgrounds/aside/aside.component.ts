import { Component ,EventEmitter,Output , ViewChild , ElementRef, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit{

  @Output() emitFromChild = new EventEmitter();

  playGrounds:any[]=[];

  constructor(private playGroundService:PlaygroundService){}

  ngOnInit(): void {
    this.playGroundService.filter().subscribe(data=>{
      this.playGrounds = data;
      this.emitFromChild.emit(this.playGrounds);
    })
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
      this.emitFromChild.emit(this.playGrounds);
    })
  }

}
