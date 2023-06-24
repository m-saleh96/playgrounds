import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundService } from '../services/playground.service';

// routes for playground module
const routes: Routes = [
  {path:'list', component: ListComponent },
  {path:'details/:id', component : DetailsComponent},
  {path:'card', component : CardComponent}

]
@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // routes for register module

  ],
  providers: [PlaygroundService] // Inject RegisterService to register module

})
export class PlaygroundModule { }
