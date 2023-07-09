import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaygroundsComponent } from './playgrounds/playgrounds.component';
import { PaymentComponent } from './payment/payment.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PlayerRecieveComponent } from './player-recieve/player-recieve.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { playerGuard } from './guards/player.guard';

const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    // lazy loading
    { path:'register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule)},
    { path:'playground', loadChildren: () => import('./playground/playground.module').then((m) => m.PlaygroundModule)},

    { path:'home', component: HomeComponent},
    { path:'playgrounds', component: PlaygroundsComponent},
    {path:'payment',component:PaymentComponent},
    {path:'favourite',component:FavouriteComponent},
    {path:'paymentform',component:PaymentFormComponent},
    {path:'recieve/:id',component:PlayerRecieveComponent},
    {path:'profile',component:PlayerProfileComponent , canActivate:[playerGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
