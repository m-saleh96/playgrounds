import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundsComponent } from './playgrounds/playgrounds.component';
import { PaymentComponent } from './payment/payment.component';
import { FavouriteComponent } from './favourite/favourite.component';

const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    // lazy loading
    { path:'register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule)},
    { path:'playground', loadChildren: () => import('./playground/playground.module').then((m) => m.PlaygroundModule)},

    { path:'home', component: HomeComponent},
    { path:'playgrounds', component: PlaygroundsComponent},
    {path:'payment',component:PaymentComponent},
    {path:'favourite',component:FavouriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
