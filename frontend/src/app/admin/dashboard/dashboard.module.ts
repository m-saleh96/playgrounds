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


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path:'users', component: UsersComponent },
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
      path: 'category',
      component:ListAllCategoriesComponent
    },
    {
      path: 'adminplaygrounds',
      component:ListAllPlaygroundsComponent
    }
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [CategoryService,AdminGuard ] // Inject RegisterService to register module

})
export class DashboardModule { }
