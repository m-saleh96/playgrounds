import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  htmlContent: SafeHtml = ""; 
  constructor(private pay:PaymentService,private Sanitizer:DomSanitizer) { }

  showPayment(){
    this.pay.getPaymentDetails().subscribe((data:any)=>{
      // this.htmlContent = this.sanitizeHtml(data.html);   
      this.htmlContent = data.html;
      console.log(this.htmlContent);
    })
  }



  sanitizeHtml(html: string): SafeHtml {
    return this.Sanitizer.bypassSecurityTrustHtml(html);
  }
}
