import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators} from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private registerService:RegisterService , private router:Router){}
  errorMessage:any='';
  flag:boolean =false;
  loginForm:FormGroup = new FormGroup({
    'email':new FormControl(null , [Validators.email , Validators.required]),
    'password':new FormControl(null , [Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
      this.registerService.login(loginForm.value).subscribe((data)=>{
        if (data) {
          console.log(data);
        }
        else{
          this.flag = true;
          this.errorMessage = data;
        }
      },
      (error) => {
        if (error.status === 401 && error.error.error === 'Unauthorized') {
          this.errorMessage = 'invalid email or password';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.flag = true;
      }
      )
    }else{
      this.flag = true;
    }
  }
}
