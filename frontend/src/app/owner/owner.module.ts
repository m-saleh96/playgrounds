import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { RouterModule, Routes } from '@angular/router';
import { OwnerFieldsComponent } from './owner-fields/owner-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


  const routes: Routes=[
  { path:'owner',
    component:OwnerComponent,
    children:[]
  },
  ]

@NgModule({
  declarations: [
    OwnerComponent,
    OwnerFieldsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OwnerModule { }
