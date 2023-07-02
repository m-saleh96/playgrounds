import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundsComponent } from './playgrounds/playgrounds.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WelcomeComponent } from './admin/dashboard/welcome/welcome.component';
import { UsersComponent } from './admin/dashboard/users/users.component';
import { ListAllCategoriesComponent } from './admin/dashboard/list-all-categories/list-all-categories.component';
import { ListAllPlaygroundsComponent } from './admin/dashboard/list-all-playgrounds/list-all-playgrounds.component';

const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    // lazy loading
    { path:'register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule)},
    { path:'playground', loadChildren: () => import('./playground/playground.module').then((m) => m.PlaygroundModule)},

    { path:'home', component: HomeComponent},
    { path:'playgrounds', component: PlaygroundsComponent},

    {
      path: 'admin',
      component:DashboardComponent,
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
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
