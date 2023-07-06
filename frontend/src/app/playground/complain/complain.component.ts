import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComplainService } from 'src/app/services/complain.service';
import { CookieService } from 'ngx-cookie-service';
import { PlaygroundService } from 'src/app/services/playground.service';
import { Playground } from 'src/app/interfaces/playground';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent {
  error!:string;
  user_id: number = Number(JSON.parse(this.cookieService.get('userData') || '{}').user?.id);
  token: string = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
  complaintMessage!:string;
  playground_id!:number;
  playgrounds !: Playground[];

  constructor(private http: HttpClient, private complainService: ComplainService, private router: Router, private cookieService: CookieService, private playgroundService: PlaygroundService){}

  ngOnInit(): void {

    this.playgroundService.listAll().subscribe((res: any) => {
      this.playgrounds = res.data;   
console.log(this.playgrounds);

    });

  }

  postComplians(){
    if (JSON.parse(this.cookieService.get('userData') || '{}').user?.role=="player") {
      console.log( Number(this.playground_id));
      console.log("user"+this.user_id);
      console.log(this.complaintMessage);
      
      const data: { complaintMessage: string, playgroundId: number, userId: number } = {
        complaintMessage: String(this.complaintMessage),
        playgroundId: Number(this.playground_id),
        userId:Number( this.user_id),
      };
  
  this.complainService.createComplian(data,this.token).subscribe((res)=>console.log(res))
  
    }
    else{
      this.error="You are not allowed to send this complaint."
    }
    this.complaintMessage="";
    this.playground_id=0;
   // ;setTimeout(() => { location.reload(); }, 3);
  }
}
