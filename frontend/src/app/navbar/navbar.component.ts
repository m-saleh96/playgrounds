import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogin:boolean=false;

  constructor (private cookieService: CookieService){
    if(JSON.parse(this.cookieService.get('userData') || '{}').user?.role){
      this.isLogin = true;
    }
  }

  ngOnInit(): void {

  }

  logout(){
    this.cookieService.delete('userData');
    this.isLogin=false;
  }
}
