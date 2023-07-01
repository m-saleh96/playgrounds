import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl : string = environment.apiUrl

  constructor(private http: HttpClient) { }

getAllCategory() {
    return this.http.get(`${this.apiUrl}/category`);
  }

getCategory(id:string) {
    return this.http.get(`${this.apiUrl}/category`+id);
  }

editCategory(id: string, body:Object){
    return this.http.put<any>(`${this.apiUrl}/category`+id,body);
  }

deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/category` + id)
  }

}
