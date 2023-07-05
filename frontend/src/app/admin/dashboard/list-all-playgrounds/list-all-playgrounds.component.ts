import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Playground } from 'src/app/interfaces/playground';
import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/services/playground.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-all-playgrounds',
  templateUrl: './list-all-playgrounds.component.html',
  styleUrls: ['./list-all-playgrounds.component.css']
})
export class ListAllPlaygroundsComponent implements OnInit{

  playgrounds!: Playground []
  accessToken!: string;
  faCheck = faCheck;


  constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.accessToken = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
    this.playgroundService.listPending(this.accessToken).subscribe((res: any) => this.playgrounds = res);
  }

  acceptPlayground(id: number) {
      // playground status updated
    this.playgroundService.updateStatusAccept(id, 'done', this.accessToken).subscribe((res) => {
      console.log(res);

      // reload playgrounds list
      this.playgroundService.listPending(this.accessToken).subscribe((res: any) => this.playgrounds = res);
    });
  }

  rejectPlayground(id: number) {
    // playground status updated
    this.playgroundService.updateStatusRejected(id, 'rejected', this.accessToken).subscribe((res) => {
    console.log(res);

    // reload playgrounds list
    this.playgroundService.listPending(this.accessToken).subscribe((res: any) => this.playgrounds = res);
    });
  }



}
