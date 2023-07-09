import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PlayerRecieveService } from '../services/player-recieve.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit{

  recieve:any[]=[]
  userID!:number;

  constructor(private playerService:PlayerRecieveService , private route:ActivatedRoute , private cookieService:CookieService){}

  ngOnInit(): void {
    this.userID = JSON.parse(this.cookieService.get('userData') || '{}').user.id;
    this.playerService.playerRecieve(this.userID).subscribe(res=>this.recieve=res)
  }


  canelReservations(id: number) {
    // cancel reservation
    this.playerService.cancelReservation(id).subscribe((res) => {
      console.log(res);
      // reload reservation list
      this.playerService.playerRecieve(this.userID).subscribe(res => {
        this.recieve = res;
      });
    });
  }

}
