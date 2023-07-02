import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // update(id: number, status: string): Observable<any> {
  //   const data = { status: status };
  //   return this.http.put(`${this.apiUrl}/playground/${id}`, data);
  // }

  update(id: number, status: string, token: string) {
    console.log("token",token);
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.put(`${this.apiUrl}/playground/changeStatus/${id}`, { headers });
  }
}
