import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }


  getPaymentDetails(){
    // const body =  {amount:100,user_id:1}
    return this.http.get('http://127.0.0.1:8000/api/payment');
  }
}
