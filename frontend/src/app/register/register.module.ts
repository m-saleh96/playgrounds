import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RegisterService } from '../services/register.service';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { ResetPasswordService } from '../services/reset-password.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CheckEmailComponent } from './check-email/check-email.component';



// routes for register module
const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'signup', component :SignupComponent},
  {path:'forgetpassword', component :ForgetPasswordComponent},
  {path:'checkemail', component :CheckEmailComponent},
  {path:'resetpassword', component :ResetPasswordComponent},
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    CheckEmailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes) // routes for register module
  ],
  providers: [RegisterService , ResetPasswordService] // Inject RegisterService to register module
})
export class RegisterModule { }
