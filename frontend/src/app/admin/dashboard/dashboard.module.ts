import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AllPlaygroundsComponent } from './all-playgrounds/all-playgrounds.component';
import { AddComponent } from './all-playgrounds/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path:'users', component: UsersComponent },
  { path:'allplaygrounds', component: AllPlaygroundsComponent},
  { path:'add', component : AddComponent}
];

@NgModule({
  declarations: [
    DashboardComponent,
    AdminPanelComponent,
    WelcomeComponent,
    UsersComponent,
    AllPlaygroundsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
