import { HttpClient } from '@angular/common/http';
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
  location:any[]=[];
  cities:any[]=[];
  city:any[]=[];
  govern!:any;
  governID!:number;
  price_to:number=1000;
  price_from:number=1;
  currentRating: number = 0;
  result!:number;


  constructor(private filterService:FilterPlayGroundsService , private categoryService:CategoryService ,private http : HttpClient){}

  ngOnInit(): void {
    this.filterPlaygrounds();
    this.categoryService.getAllCategory().subscribe((data:any)=>this.categories=data);
    this.http.get('assets/egypt/governorates.json').subscribe((data:any)=>this.location=data);
    this.http.get('assets/egypt/cities.json').subscribe((data:any)=>this.cities = data);
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

  resetFilter():void{
    this.filterService.filter(this.page).subscribe(data=>{
      this.filterService.setPage(1);
      this.result = data.total;
    })
  }


  // control open and close aside section
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


  filter(event: any):void{
    //filter with type
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

    // filter with location
    if (event.target.name == "location") {
      let govern = event.target.value;
      this.location.forEach(elem=>{
        if(elem.governorate_name_en == govern){
          this.governID = elem.id;
        }
      })

      this.city = this.cities.filter(elem=>elem.governorate_id == this.governID);
      const selectedCity = this.city.find(city => city.governorate_id === this.governID);
      this.filterService.city = selectedCity.city_name_en;
    }

    if (event.target.name == "city") {
      this.filterService.city = event.target.value;
    }

    // filter with price and keep send array of type
    this.filterService.type = this.type;
    this.filterService.price_to = this.price_to;
    this.filterService.price_from = this.price_from;

    this.filterPlaygrounds();
    this.resetFilter();
  }

  // rating filter
  setRating(rating: number): void {
    this.currentRating = rating;
    this.filterService.rating = rating;
    this.filterPlaygrounds();
    this.resetFilter();
  }

}
