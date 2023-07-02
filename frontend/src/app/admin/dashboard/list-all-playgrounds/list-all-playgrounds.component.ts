import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Playground } from 'src/app/interfaces/playground';
import { Component } from '@angular/core';
import { PlaygroundService } from 'src/app/services/playground.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-all-playgrounds',
  templateUrl: './list-all-playgrounds.component.html',
  styleUrls: ['./list-all-playgrounds.component.css']
})
export class ListAllPlaygroundsComponent {

  playgrounds!: Playground []
  accessToken!: string;
  statusUpdated = false;
  faCheck = faCheck;

  constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.accessToken = this.cookieService.get('userData').access_token;
    this.accessToken = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
    this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res);

  }

  acceptPlayground(id: number) {
      // playground status updated
    this.playgroundService.updateStatus(id, 'done', this.accessToken).subscribe((res) => {
      console.log(res);
      this.statusUpdated = true;

      // reload playgrounds list
      this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res);
    });
  }

}


