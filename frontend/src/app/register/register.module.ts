import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { RegisterService } from '../services/register.service';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';


// routes for register module
const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'signup', component :SignupComponent}
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes) // routes for register module
  ],
  providers: [RegisterService] // Inject RegisterService to register module
})
export class RegisterModule { }
