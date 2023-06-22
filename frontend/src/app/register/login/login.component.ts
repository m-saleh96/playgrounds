import { Component } from '@angular/core';
import { FormGroup , FormControl , Validators} from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage:any='';
  flag:boolean =false;

  constructor(private registerService:RegisterService , private router:Router , private cookieService: CookieService){
    if(JSON.parse(this.cookieService.get('userData') || '{}').user?.role){
      this.router.navigate(['/home']);
    }
  }

  loginForm:FormGroup = new FormGroup({
    'email':new FormControl(null , [Validators.email , Validators.required]),
    'password':new FormControl(null , [Validators.required])
  });

  getLoginInfo(loginForm:any)
  {
    if(loginForm.valid == true){
      this.registerService.login(loginForm.value).subscribe((data:any)=>{
        if (data) {
        this.cookieService.set('userData', JSON.stringify(data) , data.expires_in ,'Strict');
        window.location.reload();
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
