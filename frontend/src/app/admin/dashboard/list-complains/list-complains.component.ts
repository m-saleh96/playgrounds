import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComplainService } from 'src/app/services/complain.service';
import { CookieService } from 'ngx-cookie-service';
import { Complain } from 'src/app/interfaces/complain';

@Component({
  selector: 'app-list-complains',
  templateUrl: './list-complains.component.html',
  styleUrls: ['./list-complains.component.css']
})
export class ListComplainsComponent {
  token: string = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
  complains !: Complain[];

  constructor(private http: HttpClient, private complainService: ComplainService, private cookieService: CookieService){}

  ngOnInit(): void {
   
    //get complains and save it in interface to display it on loading page
  this.complainService.listComplains(this.token).subscribe((res: any) => {
      this.complains = res;   
      console.log(res);
      
    });

   
  }
}
