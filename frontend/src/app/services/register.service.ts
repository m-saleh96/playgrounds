import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signup } from '../interfaces/signup';
import { Login } from '../interfaces/login';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RegisterService{

  // const part from api
  private apiUrl : string = environment.apiUrl

  constructor(private http:HttpClient) { }

  signUp(registerFormValue:Observable<Signup>):Observable<Signup>
  {
    return this.http.post(`${this.apiUrl}/register` , registerFormValue)
  }

  login(registerFormValue:Login):Observable<Login>
  {
    return this.http.post(`${this.apiUrl}/login` , registerFormValue)
  }

}