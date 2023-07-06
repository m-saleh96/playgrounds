import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundService } from '../services/playground.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaygroundComponent } from './playground.component';
import { ComplainComponent } from './complain/complain.component';

// routes for playground module
const routes: Routes = [
  {path:'complain', component: ComplainComponent },
  {path:'details/:id', component : DetailsComponent},
  {path:'card', component : CardComponent},
]
@NgModule({
  declarations: [
    PlaygroundComponent,
    CardComponent,
    DetailsComponent,
    ComplainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes) //routes for register module

  ],
  providers: [PlaygroundService] // Inject RegisterService to register module

})
export class PlaygroundModule { }
