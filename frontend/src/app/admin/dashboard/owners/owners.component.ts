import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent {
  owners!: any[];
  accessToken!: string;

  constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }


  ngOnInit() {
    this.accessToken = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
    this.getOwners(4);

  }


  getOwners(id: number) {
    this.playgroundService.displayOwners(id, this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.owners = res;
    });
  }
}
