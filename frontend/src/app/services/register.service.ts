import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class RegisterService{

  // const part from api
  private apiUrl : string = environment.apiUrl

  constructor(private http:HttpClient) { }

  signUp(registerFormValue:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/register` , registerFormValue)
  }

  login(registerFormValue:any):Observable<any>
  {
    return this.http.post(`${this.apiUrl}/login` , registerFormValue)
  }

}
