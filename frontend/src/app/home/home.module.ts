import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CardListComponent } from './cards/card-list/card-list.component';
import { CardComponent } from './cards/card/card.component';
import { TopRatedPlaygroundsComponent } from './top-rated-playgrounds/top-rated-playgrounds.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CardListComponent,
    CardComponent,
    TopRatedPlaygroundsComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class HomeModule { }
