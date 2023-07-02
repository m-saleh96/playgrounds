import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  // const part from api
  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  listAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/review`)
  }

  // listByPlaygroundId(id: any,  token: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get(`${this.apiUrl}/review/playground/${id}`,  { headers })
  // }

  listByPlaygroundId(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/review/playground/${id}`)
  }
  create(body: object,  token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/review`, body,  { headers });
  }

  deleteReview(id: number,  token: string): Observable<any>  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
      return this.http.delete<any>(`${this.apiUrl}/review/${id}`, { headers })
    }

    editReview(id: number, body:Object,  token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
        return this.http.post<any>(`${this.apiUrl}/review/${id}`,body, { headers });
      }
}
