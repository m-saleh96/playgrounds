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
import { OwnerDashboardModule } from './owner-dashboard/owner-dashboard.module';
import { OwnerPanelComponent } from './owner-dashboard/owner-panel/owner-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OwnerPanelComponent,
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
    OwnerDashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
