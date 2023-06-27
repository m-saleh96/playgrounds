import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {
  // const part from api
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  listAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/playground`)
  }

  listById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/playground/${id}`)
  }

  create(registerFormValue: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/playground`, registerFormValue)
  }



  delete($id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/playground`, $id)
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

  filter(): Observable<any> {
    let url = `${this.apiUrl}/playground/search?`;
    if (this.tennis) {
      url += 'type=tennis&'
    }
    if (this.paddle) {
      url += 'type=paddle&'
    }
    if (this.football) {
      url += 'type=football&'
    }
    if (this.p50) {
      url += 'price_below=50&'
    }
    if (this.p100) {
      url += 'price_from=50&price_to=100&'
    }
    if (this.p200) {
      url += 'price_from=100&price_to=200&'
    }
    if (this.p201) {
      url += 'price_above=200&'
    }
    if (this.cairo) {
      url += 'location=cairo&'
    }
    if (this.mansoura) {
      url += 'location=mansoura&'
    }

    return this.http.get(url)
  }

}
