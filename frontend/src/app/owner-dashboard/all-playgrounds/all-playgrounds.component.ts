import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-playgrounds',
  templateUrl: './all-playgrounds.component.html',
  styleUrls: ['./all-playgrounds.component.css']
})
export class AllPlaygroundsComponent {


  constructor(private router:Router) { }

  // Go to adding playground page
  addplayground(){
    this.router.navigate(['../add'])
  }

}
