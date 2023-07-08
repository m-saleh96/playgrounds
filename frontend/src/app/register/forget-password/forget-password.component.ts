import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private authService:ResetPasswordService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'email':new FormControl(null , [Validators.email , Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
      this.authService.send_email(loginForm.value).subscribe((data)=>{
        if (data.message == 'Email send successfully') {
          this.authService.email = loginForm.value.email;
        this.router.navigate(['/checkemail'])
      }
        else{
          this.flag = true;
          this.errorMessage = "this Email not found plz create new acount";
        }

      },(error)=>{
        console.log(error);
        if (error.status == 400 && error.error.email == "The selected email is invalid.") {
          this.flag = true;
          this.errorMessage = "The selected email is invalid.";
        } else {
          this.flag = true;
          this.errorMessage = "something wronge please try again";
        }
      }
      )
    }else{
      this.flag = true;
    }

  }
}
