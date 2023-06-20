import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
