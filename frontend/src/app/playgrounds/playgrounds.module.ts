import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { PlaygroundsComponent } from './playgrounds.component';
import { FieldDetailsComponent } from './field-details/field-details.component';




@NgModule({
  declarations: [
    PlaygroundsComponent,
    FieldComponent,
    FieldDetailsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class PlaygroundsModule { }
