import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {
@Input() playground!:any;

constructor(private router:Router){}

redirectToDetails(id: number){
  this.router.navigate(['playground/details/',id])
}
}
