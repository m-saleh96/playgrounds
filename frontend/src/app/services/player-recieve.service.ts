import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerRecieveService {

  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  recieve(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservation`, data )
  }

  playerRecieve(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservation/${id}` )
  }


}
