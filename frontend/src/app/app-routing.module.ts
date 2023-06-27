import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundsComponent } from './playgrounds/playgrounds.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';

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
      ]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
