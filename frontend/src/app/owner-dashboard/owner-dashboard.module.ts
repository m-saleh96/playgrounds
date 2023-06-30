import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerDashboardComponent } from './owner-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AllPlaygroundsComponent } from './all-playgrounds/all-playgrounds.component';
import { AddComponent } from './add/add.component';
import { OwnerWelcomeComponent } from './owner-welcome/owner-welcome.component';


const routes: Routes = [
  { path:'ownerpanel', component: OwnerDashboardComponent},
  { path:'ownerwelcome', component: OwnerWelcomeComponent},
  { path:'allplaygrounds', component: AllPlaygroundsComponent},
  { path:'add', component : AddComponent}
];


@NgModule({
  declarations: [
    OwnerDashboardComponent,
    OwnerDashboardComponent,
    AllPlaygroundsComponent,
    AddComponent,
    OwnerWelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ]
})
export class OwnerDashboardModule { }
