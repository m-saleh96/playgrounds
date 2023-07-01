import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FilterPlayGroundsService {

  // const part from api
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }
  tennis!: boolean;
  paddle!:boolean;
  football!:boolean;
  cairo!:boolean;
  mansoura!:boolean;
  price_to:number = 1000;
  price_from:number = 0;

  filter(): Observable<any> {
    let url = `${this.apiUrl}/playground/search?price_from=${this.price_from}&price_to=${this.price_to}&`;
    if (this.tennis) {
      url += 'type[]=tennis&'
    }
    if (this.paddle) {
      url += 'type[]=paddle&'
    }
    if (this.football) {
      url += 'type[]=football&'
    }
    if (this.cairo) {
      url += 'location[]=cairo&'
    }
    if (this.mansoura) {
      url += 'location[]=mansoura&'
    }
    console.log(url);

    return this.http.get(url)
  }

}
