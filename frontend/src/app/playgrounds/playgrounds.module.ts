import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { PlaygroundsComponent } from './playgrounds.component';
import { FieldDetailsComponent } from './field-details/field-details.component';
import { FormsModule } from '@angular/forms';
import { AsideComponent } from './aside/aside.component';
import { FilterPlayGroundsService } from '../services/filter-play-grounds.service';




@NgModule({
  declarations: [
    PlaygroundsComponent,
    FieldComponent,
    FieldDetailsComponent,
    AsideComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [FilterPlayGroundsService]
})
export class PlaygroundsModule { }
