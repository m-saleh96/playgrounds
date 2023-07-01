import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FilterPlayGroundsService {

  // const part from api
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  cairo!:boolean;
  mansoura!:boolean;
  price_to:number = 1000;
  price_from:number = 0;

  type:any[]=[];

  filter(): Observable<any> {

    let url = `${this.apiUrl}/playground/search?price_from=${this.price_from}&price_to=${this.price_to}&`;

    this.type.forEach(elm=>{
      url += `type[]=${elm}&`
    })

    if (this.cairo) {
      url += 'location[]=cairo&'
    }
    if (this.mansoura) {
      url += 'location[]=mansoura&'
    }

    return this.http.get(url)
  }

}
