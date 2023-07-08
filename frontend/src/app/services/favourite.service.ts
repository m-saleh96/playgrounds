import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private apiUrl : string = environment.apiUrl

  constructor(private http: HttpClient) { }


  getFavourite(id:any): Observable<any>  {
    return this.http.get(`${this.apiUrl}/favorites?user_id=${id}`);
  }

  addToFavourite(id:any , data:any): Observable<any>  {
    return this.http.post(`${this.apiUrl}/${id}/favorite` , data);
  }

  deleteFavourite(data:any): Observable<any>  {
    return this.http.delete(`${this.apiUrl}/favorite?user_id=${data.user_id}&playground_id=${data.playground_id}`);
  }

  private counter = new BehaviorSubject(0);
  counterVal = this.counter.asObservable();

  setCounter(newCounterVal:number){
    this.counter.next(newCounterVal);
  }


}
