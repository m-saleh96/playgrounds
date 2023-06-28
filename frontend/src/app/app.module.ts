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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { WelcomeComponent } from './admin/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    AdminPanelComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    RegisterModule,
    PlaygroundModule,
    PlaygroundsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
