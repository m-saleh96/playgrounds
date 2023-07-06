import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

createComplian(Data: any , token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization' : `Bearer ${token}`})
    return this.http.post(`${this.apiUrl}/complaints`, Data , {headers} )
  }


listComplains(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/complaints`,  { headers })
  }
}
