import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor (private registerService:RegisterService , private router:Router){}

  ngOnInit(): void {
  }

  errorMessage:any='';
  flag:boolean = false;

  registerForm:FormGroup = new FormGroup({
    'name':new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    'email':new FormControl(null , [Validators.email , Validators.required]),
    'phone': new FormControl(null, [Validators.required, Validators.pattern('^01\\d{9}$')]),
    'role':new FormControl(null , [Validators.required]),
    'password':new FormControl(null , [Validators.required , Validators.minLength(8)])
  });


  getRegisterInfo(registerForm:any)
  {
    if(registerForm.valid == true){
      this.registerService.signUp(registerForm.value).subscribe((data)=>{
        if (data.message == 'User created successfully') {
          this.router.navigate(['/login'])
        }
        else {
          this.flag = true
        }
      },
      (error) => {
        if (error.status === 400 && error.error.email[0] === 'The email has already been taken.') {
          this.errorMessage = 'Email already exists. Please choose a different email.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.flag = true;
      }
      )
    } else{
      this.flag = true
    }

  }


}
