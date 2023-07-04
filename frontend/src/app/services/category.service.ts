import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {
  private apiUrl : string = environment.apiUrl

  constructor(private http: HttpClient) { }

getAllCategory(): Observable<any>  {
    return this.http.get(`${this.apiUrl}/category`);
  }


addCategory(body:Object, token: string): Observable<any>  {
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  });
       return this.http.post(`${this.apiUrl}/category`, body, { headers });
  }


getCategory(id:number, token: string): Observable<any>  {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.get(`${this.apiUrl}/category/${id}`, { headers });
  }

editCategory(id: number, body:Object,  token: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.post<any>(`${this.apiUrl}/category/${id}`,body, { headers });
  }

deleteCategory(id: number,  token: string): Observable<any>  {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
    return this.http.delete<any>(`${this.apiUrl}/category/${id}`, { headers })
  }

}

