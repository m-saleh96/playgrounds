import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { data } from 'jquery';


@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit{
  price:number =12;
  errorMessage:any='';
  flag:boolean =false;

  constructor(private paymentService: PaymentService ) {}

  ngOnInit(): void {
    this.price = this.paymentService.price
  }

  form:FormGroup = new FormGroup({
    'cardNumber':new FormControl(null , [Validators.required, Validators.pattern(/^\d{16}$/)]),
    'expirationDate':new FormControl(null , [Validators.required]),
    'cvv':new FormControl(null , [Validators.required , Validators.pattern(/^\d{3}$/)]),
    'description':new FormControl(null , [Validators.required]),
  });

  submitPayment(form:any) {
    if (this.form.valid) {
      const data = {token : "tok_visa" , amount : this.price , description : this.form.value.description}
      this.paymentService.submitPayment(data).subscribe(res=>{
        console.log(res);

      })
    }else{
      this.flag = true;
    }



  }

}
