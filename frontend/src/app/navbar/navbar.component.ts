import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RegisterService } from '../services/register.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogin:boolean=false;
  isOwner:boolean=false
  isAdmin:boolean=false
  token!:any
  counter!:number;
  userID!:number;

  constructor (private cookieService: CookieService , private registerService:RegisterService , private favouriteService:FavouriteService){ }

  ngOnInit(): void {
    this.userID = JSON.parse(this.cookieService.get('userData') || '{}').user?.id
    if(JSON.parse(this.cookieService.get('userData') || '{}').user?.role){
      this.isLogin = true;
      if (JSON.parse(this.cookieService.get('userData') || '{}').user?.role === "owner") {
        this.isOwner=true;
      }
      if (JSON.parse(this.cookieService.get('userData') || '{}').user?.role === "admin") {
        this.isAdmin=true;
      }
    }
    this.token = (JSON.parse(this.cookieService.get('userData') || '{}').access_token);
    this.favouriteService.getFavourite(this.userID).subscribe(res=>{
      this.favouriteService.setCounter(res.length);
      this.favouriteService.counterVal.subscribe(res=>this.counter=res);
    })
  }

  logout(){
    this.cookieService.delete('userData');
    window.location.reload();
  }
}
