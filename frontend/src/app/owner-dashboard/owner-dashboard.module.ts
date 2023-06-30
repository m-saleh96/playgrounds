import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerDashboardComponent } from './owner-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AllPlaygroundsComponent } from './all-playgrounds/all-playgrounds.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [

  { path:'allplaygrounds', component: AllPlaygroundsComponent},
  { path:'add', component : AddComponent}
];


@NgModule({
  declarations: [
    OwnerDashboardComponent,
    AllPlaygroundsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ]
})
export class OwnerDashboardModule { }
