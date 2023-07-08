import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-third-part',
  templateUrl: './third-part.component.html',
  styleUrls: ['./third-part.component.css']
})
export class ThirdPartComponent {

  constructor(private router:Router){}


goToRegesterPage(){
    this.router.navigate(['signup'])
  }
 }
