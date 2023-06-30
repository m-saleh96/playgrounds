import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-playgrounds',
  templateUrl: './all-playgrounds.component.html',
  styleUrls: ['./all-playgrounds.component.css']
})
export class AllPlaygroundsComponent {
  // Go to adding playground page


  constructor(private router:Router) { }

  addplayground(){
    this.router.navigate(['all-playgrounds/add'])
  }

}
