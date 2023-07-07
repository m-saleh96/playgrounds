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
    this.getOwners();

  }


  getOwners() {
    this.playgroundService.displayOwners(this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.owners = res;
    });
  }

  deleteOwner(id: number) {
    // delete owner
    this.playgroundService.deleteOwners(id, this.accessToken).subscribe((res) => {
    console.log(res);

    // reload owners list
    this.playgroundService.displayOwners(this.accessToken).subscribe((res: any) => this.owners = res);
    });
  }
}
