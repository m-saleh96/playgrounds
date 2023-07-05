import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FilterPlayGroundsService {

  // const part from api
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  private page = new BehaviorSubject(1);
  pag = this.page.asObservable();
  setPage(val:number){
    this.page.next(val)
  }

  cairo!:boolean;
  mansoura!:boolean;
  price_to:number = 1000;
  price_from:number = 0;
  type:any[]=[];
  lastPage!:number;
  city!:string;
  rating!:number;

  filter(page:number): Observable<any> {

    let url = `${this.apiUrl}/playground/search?page=${page}&items=4&price_from=${this.price_from}&price_to=${this.price_to}&`;

    this.type.forEach(elm=>{
      url += `type[]=${elm}&`
    })

    if (this.city) {
      url += `city[]=${this.city}&`
    }

    if (this.rating) {
      url += `rating=${this.rating}&`
    }


    return this.http.get(url)
  }

}
