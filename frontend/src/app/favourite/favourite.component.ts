import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit{

  playground:any[]=[];
  userID!:number
  counter:number = 0

  constructor(private favouriteService:FavouriteService , private router:Router , private cookieService:CookieService){}

  ngOnInit(){
    this.userID = JSON.parse(this.cookieService.get('userData') || '{}').user?.id;
    this.favouriteService.getFavourite(this.userID).subscribe(res=>{
      if (res.length == 0) {
        this.router.navigate(['playgrounds'])
      }
      res.map((elm:any)=>{
        elm["favorite"]=true;
      })
      this.favouriteService.setCounter(res.length)
      this.playground=res;
    })

  }


  redirectToDetails(id: number){
    this.router.navigate(['playground/details/',id])
  }

  favourite(id:any){
    console.log(this.userID);
    console.log(id);

    const data = {user_id:this.userID,playground_id:id}
    this.favouriteService.addToFavourite(id,data).subscribe(res=>{
      if (res.message == "Favorite added successfully.") {
        this.favouriteService.counterVal.subscribe(res=>this.counter=res)
        this.favouriteService.setCounter(++this.counter);
      }
    },
    (error)=>{
      if (error.status == 400 && error.error.message == "This playground is already a favorite.") {
        this.favouriteService.deleteFavourite(data).subscribe(res=>{
          this.favouriteService.counterVal.subscribe(res=>this.counter=res)
          this.favouriteService.setCounter(--this.counter);
          this.playground = this.playground.filter(elm=>elm.playground.id != id)
        })
      }
    }
    )
    }

}
