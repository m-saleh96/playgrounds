import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CardListComponent } from './cards/card-list/card-list.component';
import { CardComponent } from './cards/card/card.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CardListComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class HomeModule { }
