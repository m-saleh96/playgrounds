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
    'phone':new FormControl(null , [Validators.required]),
    'role':new FormControl(null , [Validators.required]),
    'password':new FormControl(null , [Validators.required])
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

      })
    } else{
      this.flag = true
    }

  }


}
