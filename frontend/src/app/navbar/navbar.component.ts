import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogin:boolean=false;
  isOwner:boolean=false
  constructor (private cookieService: CookieService){ }

  ngOnInit(): void {
    if(JSON.parse(this.cookieService.get('userData') || '{}').user?.role){
      this.isLogin = true;
      if (JSON.parse(this.cookieService.get('userData') || '{}').user?.role === "owner") {
        this.isOwner=true;
      }
    }
  }

  logout(){
    this.cookieService.delete('userData');
    window.location.reload();
  }
}
