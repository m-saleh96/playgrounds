import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string = environment.apiUrl
  constructor(private http:HttpClient) { }

  submitPayment(cardNumber: string, expirationDate: string, cvv: string) {
    const payload = { cardNumber, expirationDate, cvv };
    return this.http.post(`${this.apiUrl}/payment`, payload )
  }
  getPaymentDetails(){
    // const body =  {amount:100,user_id:1}
    return this.http.get('http://127.0.0.1:8000/api/payment');
  }
}
