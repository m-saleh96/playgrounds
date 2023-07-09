import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ResetPasswordService {

  constructor(private http:HttpClient , private router:Router) { }

  otp!:any;
  email!:any;

  sendOtp(data:any){
    data.email = this.email
    return this.http.post('http://localhost:8000/api/cheeckcode' , data)
  }

  send_email(Email:any):Observable<any>
  {
    this.email = Email.email
    return this.http.post('http://localhost:8000/api/sendcode' , Email)
  }

  resetPassword(data:any):Observable<any>
  {
    data.email =this.email
    data.otp = this.otp
    return this.http.post('http://localhost:8000/api/resetpassword' , data)
  }

}
