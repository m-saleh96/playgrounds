import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { RouterModule, Routes } from '@angular/router';
import { OwnerFieldsComponent } from './owner-fields/owner-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnerGuard } from '../guards/owner.guard';
import { RecievesComponent } from './recieves/recieves.component';




  const routes: Routes=[
  { path:'owner',
    component:OwnerComponent,
    canActivate:[OwnerGuard],
    children:[
      {path:'' , redirectTo:'fields' , pathMatch:'full'},
      {
        path:"fields",
        component:OwnerFieldsComponent
      },
      {
        path:"recieve/:id",
        component:RecievesComponent
      }
    ]
  },

  ]

@NgModule({
  declarations: [
    OwnerComponent,
    OwnerFieldsComponent,
    RecievesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[OwnerGuard]
})
export class OwnerModule { }
