import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
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
}
