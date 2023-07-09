import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeModule } from './home/home.module';
import { RegisterModule } from './register/register.module';
import { PlaygroundModule } from './playground/playground.module';
import { PlaygroundsModule } from './playgrounds/playgrounds.module';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { OwnerModule } from './owner/owner.module';
import { PaymentComponent } from './payment/payment.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayerRecieveComponent } from './player-recieve/player-recieve.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaymentComponent,
    FavouriteComponent,
    PaymentFormComponent,
    PlayerRecieveComponent,
    PlayerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    RegisterModule,
    PlaygroundModule,
    PlaygroundsModule,
    DashboardModule,
    ReactiveFormsModule,
    OwnerModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
