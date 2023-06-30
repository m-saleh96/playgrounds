import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundsComponent } from './playgrounds/playgrounds.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WelcomeComponent } from './admin/dashboard/welcome/welcome.component';
import { UsersComponent } from './admin/dashboard/users/users.component';
import { AllPlaygroundsComponent } from './admin/dashboard/all-playgrounds/all-playgrounds.component';
import { AddComponent } from './admin/dashboard/all-playgrounds/add/add.component';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';

const routes: Routes = [
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
          path: 'allplaygrounds',
          component:AllPlaygroundsComponent
        },
        {
          path: 'add',
          component:AddComponent
        },
      ]
    },
    {
      path: "owner",
      component: OwnerDashboardComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
