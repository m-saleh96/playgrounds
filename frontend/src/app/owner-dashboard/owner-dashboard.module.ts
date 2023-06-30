import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerDashboardComponent } from './owner-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AllPlaygroundsComponent } from './all-playgrounds/all-playgrounds.component';
import { AddComponent } from './add/add.component';
import { OwnerWelcomeComponent } from './owner-welcome/owner-welcome.component';
import { OwnerPanelComponent } from './owner-panel/owner-panel.component';


const routes: Routes = [
  { path:'ownerpanel', component: OwnerPanelComponent},
  { path:'ownerwelcome', component: OwnerWelcomeComponent},
  { path:'allplaygrounds', component: AllPlaygroundsComponent},
  { path:'add', component : AddComponent}
];


@NgModule({
  declarations: [
    OwnerDashboardComponent,
    OwnerPanelComponent,
    OwnerWelcomeComponent,
    AllPlaygroundsComponent,
    AddComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ]
})
export class OwnerDashboardModule { }
