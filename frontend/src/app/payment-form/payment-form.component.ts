import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  cardNumber: string="";
  expirationDate!: string;
  cvv!: string;
  constructor(private paymentService: PaymentService) {}

  submitPayment() {
    this.paymentService.submitPayment(this.cardNumber, this.expirationDate, this.cvv)
      .subscribe(
        response => {
          // Handle successful payment response
          console.log('Payment successful:', response);
        },
        error => {
          // Handle payment error
          console.error('Payment error:', error);
        }
      );
  }
  
}
