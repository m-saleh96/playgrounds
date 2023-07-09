import { Component, OnInit } from '@angular/core';
import { OwnerRecieveService } from '../services/owner-recieve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PlayerRecieveService } from '../services/player-recieve.service';

@Component({
  selector: 'app-player-recieve',
  templateUrl: './player-recieve.component.html',
  styleUrls: ['./player-recieve.component.css']
})
export class PlayerRecieveComponent implements OnInit {
  recieve:any[]=[];
  recieve2:any[]=[];
  uniqueDays:any[]=[];
  selectedDay:any[]=[]
  playGroundId!:number
  timeSlots: any[] = [];
  errorMessage!:any;
  userID!:any;

  constructor(private ownerRecieve:OwnerRecieveService , private route:ActivatedRoute , private cookieService:CookieService ,
              private playerService:PlayerRecieveService , private router:Router){}

  ngOnInit(): void {
    this.userID = JSON.parse(this.cookieService.get('userData') || '{}').user.id;
    this.route.params.subscribe(params=>{
      this.playGroundId =params['id'];
    })
    this.getAllTime();

  }

  getAllTime(){
    this.ownerRecieve.getTime(this.playGroundId).subscribe(res=>{
      this.recieve=res
      console.log(res);

      this.uniqueDays = [...new Set(this.recieve.map(item => item.day))].filter((value, index, self) => self.indexOf(value) === index);

      this.selectedDay = this.uniqueDays[0]

      this.recieve.forEach(elm=>{
        if (elm.day==this.selectedDay) {
          this.recieve2.push(elm)
        }
      })

      this.timeSlots = this.recieve2.map(({ id , day, start_time, end_time }) => ({ id , day, start_time, end_time }));
      console.log(this.timeSlots);

    },
    (error) => {
      if (error.status === 404 && error.error.message === 'No time slots for this playground') {

        this.errorMessage = "No time added please add day and time"
      }
    }
    );
  }

  filter(e:any){
    if (e.target.name == "day") {
      this.selectedDay = e.target.value;
      this.recieve2 =[];
      this.recieve.forEach(elm=>{
        if (elm.day==this.selectedDay) {
          this.recieve2.push(elm)
        }
      })

      this.timeSlots = this.recieve2.map(({id ,  day, start_time, end_time }) => ({id ,  day, start_time, end_time }));
    }


    if(e.target.type=="submit"){
      const data = this.timeSlots.filter(elm=>elm.id == e.target.value)
      data[0].playground_id= this.playGroundId
      data[0].user_id= this.userID
      console.log(data[0]);
      this.playerService.recieve(data[0]).subscribe(res=>{
        if (res) {
          this.router.navigate(['paymentform'])
        }
      })
    }



  }

}
