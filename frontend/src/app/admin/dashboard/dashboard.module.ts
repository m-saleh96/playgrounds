import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ListAllCategoriesComponent } from './list-all-categories/list-all-categories.component';
import { CategoryService } from 'src/app/services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAllPlaygroundsComponent } from './list-all-playgrounds/list-all-playgrounds.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { OwnersComponent } from './owners/owners.component';
import { ListComplainsComponent } from './list-complains/list-complains.component';
import { ComplainService } from 'src/app/services/complain.service';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path:'users', component: UsersComponent },
  { path:'owners', component: OwnersComponent },
  { path: 'admin', component: DashboardComponent,
    canActivate: [AdminGuard],
    children:[
    {
      path: 'welcome',
      component:WelcomeComponent
    },
    {
      path: 'users',
      component:UsersComponent
    },
    {
      path: 'owners',
      component:OwnersComponent
    },
    {
      path: 'adminplaygrounds',
      component:ListAllPlaygroundsComponent
    },
    {
      path: 'category',
      component:ListAllCategoriesComponent
    },
    {
      path: 'listComplains',
      component:ListComplainsComponent
    },

  ]},
]

@NgModule({
  declarations: [
    DashboardComponent,
    AdminPanelComponent,
    WelcomeComponent,
    UsersComponent,
    ListAllCategoriesComponent,
    ListAllPlaygroundsComponent,
    OwnersComponent,
    ListComplainsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [CategoryService,AdminGuard, ComplainService ] // Inject RegisterService to register module

})
export class DashboardModule { }
