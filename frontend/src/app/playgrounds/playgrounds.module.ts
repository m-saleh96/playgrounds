import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { PlaygroundsComponent } from './playgrounds.component';
import { FieldDetailsComponent } from './field-details/field-details.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    PlaygroundsComponent,
    FieldComponent,
    FieldDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PlaygroundsModule { }
