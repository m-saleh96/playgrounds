import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent {
  constructor(private authService:ResetPasswordService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'otp':new FormControl(null )
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
      this.authService.sendOtp(loginForm.value).subscribe((data:any)=>{
        if (data.message == "valid code") {
          this.authService.otp = loginForm.value.otp
          this.router.navigate(['/resetpassword'])
        } else {

        }
      },
      (error)=>{
        if (error.status == 400 && error.error.email[0] == "The email field is required.") {
          alert("invalid otp")
          this.router.navigate(['/forgetpassword'])
        }else{
          this.router.navigate(['/forgetpassword'])
        }

      }

      )
    }else{
      this.flag = true;
    }

  }
}
