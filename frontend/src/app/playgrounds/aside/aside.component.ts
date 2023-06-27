import { Component ,EventEmitter,Output , OnInit } from '@angular/core';
import { FilterPlayGroundsService } from 'src/app/services/filter-play-grounds.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit{

  @Output() emitFromChild = new EventEmitter();

  playGrounds:any[]=[];

  constructor(private filterService:FilterPlayGroundsService){}

  ngOnInit(): void {
    this.filterService.filter().subscribe(data=>{
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
    this.filterService.tennis = this.tennis;
    this.filterService.paddle = this.paddle;
    this.filterService.football = this.football;
    this.filterService.p50 = this.p50;
    this.filterService.p100 = this.p100;
    this.filterService.p200 = this.p200;
    this.filterService.p201 = this.p201;
    this.filterService.cairo = this.cairo;
    this.filterService.mansoura = this.mansoura;

    this.filterService.filter().subscribe(data=>{
      this.playGrounds = data
      this.emitFromChild.emit(this.playGrounds);
    })
  }

}
