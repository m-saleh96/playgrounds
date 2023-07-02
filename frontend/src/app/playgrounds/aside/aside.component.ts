import { Component ,EventEmitter,Output , OnInit, Input, OnChanges } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FilterPlayGroundsService } from 'src/app/services/filter-play-grounds.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit , OnChanges{

  @Output() emitFromChild = new EventEmitter<any>();
  @Input()  page!:number;


  playGrounds:any[]=[];
  categories:any[]=[];
  lastPage!:number;
  type:any[]=[];
  cairo!:boolean;
  mansoura!:boolean;
  price_to:number=1000;
  price_from:number=1;

  result!:number;

  constructor(private filterService:FilterPlayGroundsService , private categoryService:CategoryService){}

  ngOnInit(): void {
    this.filterPlaygrounds();
    this.categoryService.getAllCategory().subscribe((data:any)=>this.categories=data)
  }


  ngOnChanges(): void {
      this.filterPlaygrounds();
  }


  filterPlaygrounds(): void {
    this.filterService.filter(this.page).subscribe((data:any) => {
      this.playGrounds = data.data;
      this.filterService.lastPage = data.last_page;
      this.lastPage = data.last_page;
      const value = [this.playGrounds , this.lastPage]
      this.emitFromChild.emit(value);
    });
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

  filter(event: any){
    if (event.target.type==="checkbox") {
      const type = event.target.name;
      if (event.target.checked) {
        this.type.push(type)
      } else {
        let index = this.type.indexOf(type);
        if (index > -1) {
          this.type.splice(index, 1);
        }
      }
    }

    this.filterService.type = this.type;
    this.filterService.price_to = this.price_to;
    this.filterService.price_from = this.price_from;
    this.filterService.cairo = this.cairo;
    this.filterService.mansoura = this.mansoura;

    this.filterPlaygrounds();
    this.filterService.filter(this.page).subscribe(data=>{
      this.filterService.setPage(1);
      this.result = data.total;
    })
  }

}
