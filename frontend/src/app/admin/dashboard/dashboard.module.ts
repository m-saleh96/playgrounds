import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path:'users', component: UsersComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    AdminPanelComponent,
    WelcomeComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
