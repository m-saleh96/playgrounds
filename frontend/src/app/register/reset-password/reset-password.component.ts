import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  DATA:any

  constructor(private authService:ResetPasswordService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'password':new FormControl(null , [Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
      this.authService.resetPassword(loginForm.value).subscribe((data)=>{
        if (data.message == "reset passwore  done") {
          this.router.navigate(['/login'])
        }
      })
    }

  }
}
