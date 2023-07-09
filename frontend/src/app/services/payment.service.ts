import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  price!:number;
  private apiUrl: string = environment.apiUrl
  constructor(private http:HttpClient) { }

  submitPayment(data:any) {
    return this.http.post(`${this.apiUrl}/stripe`, data )
  }

  getPaymentDetails(){
    // const body =  {amount:100,user_id:1}
    return this.http.get('http://127.0.0.1:8000/api/payment');
  }


}
