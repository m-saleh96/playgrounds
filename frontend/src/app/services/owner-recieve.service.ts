import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerRecieveService {

  // const part from api
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  addSlot(formData: any , token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.post(`${this.apiUrl}/timeslot`, formData , {headers} )
  }

  getTime(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/timeslot/${id}`)
  }

  deletTime(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/timeslot/${id}`)
  }



}
