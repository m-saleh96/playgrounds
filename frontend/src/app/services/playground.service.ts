import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Playground } from '../interfaces/playground';

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

  getById(id: any): Observable <Playground> {
    return this.http.get<Playground>(`${this.apiUrl}/playground/${id}`)
  }


  listPending(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
  })
    return this.http.get(`${this.apiUrl}/playground/pending`, { headers })
}


  ownerField(id: any , token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.get(`${this.apiUrl}/playground/owner/${id}` , {headers} )

  }

  create(formData: any , token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.post(`${this.apiUrl}/playground`, formData , {headers} )
  }

  update(id:number , formData:any ,token:any): Observable<any>{
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.post(`${this.apiUrl}/playground/${id}` , formData , { headers } )
  }

  delete(id: any , token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.delete(`${this.apiUrl}/playground/${id}` ,{ headers } )
  }

  updateStatus(id: number, status: string, token: string) {
    const headers = new HttpHeaders({
      'Authorization' : `Bearer ${token}`
  })
    return this.http.put(`${this.apiUrl}/playground/changeStatus/${id}`,{status}, { headers });
  }




}
