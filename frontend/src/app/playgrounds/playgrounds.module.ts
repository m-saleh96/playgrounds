import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { PlaygroundsComponent } from './playgrounds.component';
import { FormsModule } from '@angular/forms';
import { AsideComponent } from './aside/aside.component';
import { FilterPlayGroundsService } from '../services/filter-play-grounds.service';




@NgModule({
  declarations: [
    PlaygroundsComponent,
    FieldComponent,
    AsideComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [FilterPlayGroundsService]
})
export class PlaygroundsModule { }
