import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CardListComponent } from './cards/card-list/card-list.component';
import { CardComponent } from './cards/card/card.component';
import { TopRatedPlaygroundsComponent } from './top-rated-playgrounds/top-rated-playgrounds.component';
import { TopRatedCardPlaygroundsComponent } from './top-rated-card-playgrounds/top-rated-card-playgrounds.component';
import { ThirdPartComponent } from './third-part/third-part.component';
import { FooterComponent } from './footer/footer.component';
import { LastFooterComponent } from './last-footer/last-footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CardListComponent,
    CardComponent,
    TopRatedPlaygroundsComponent,
    TopRatedCardPlaygroundsComponent,
    ThirdPartComponent,
    FooterComponent,
    LastFooterComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class HomeModule { }
