import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit{
@Input() playground!:any;
userID!:number
counter:number = 0
constructor(private router:Router , private cookieService:CookieService , private favouriteService:FavouriteService){}

ngOnInit(){
  this.userID = JSON.parse(this.cookieService.get('userData') || '{}').user?.id
  this.favouriteService.getFavourite(this.userID).subscribe(res=>{
    res.map((res:any)=>{
      if (this.playground.id == res['playground_id']) {
        this.playground['favorite']=true;
      }
    })
  })
}

redirectToDetails(id: number){
  this.router.navigate(['playground/details/',id])
}

goToRecieve(id:any){
  this.router.navigate(['recieve/',id])
}

favourite(id:any){
  const data = {user_id:this.userID,playground_id:id}
  if (this.userID) {
    this.favouriteService.addToFavourite(id,data).subscribe(res=>{
      if (res.message == "Favorite added successfully.") {
        this.favouriteService.counterVal.subscribe(res=>this.counter=res)
        this.favouriteService.setCounter(++this.counter);
        this.playground['favorite'] = true;

      }
    },
    (error)=>{
      if (error.status == 400 && error.error.message == "This playground is already a favorite.") {
        this.favouriteService.deleteFavourite(data).subscribe(res=>{
          console.log(res);
          this.favouriteService.counterVal.subscribe(res=>this.counter=res)
          this.favouriteService.setCounter(--this.counter);
          this.playground['favorite'] = false;
        })
      }
    }
    )
  } else {
    this.router.navigate(['login']);
  }

  }


}
