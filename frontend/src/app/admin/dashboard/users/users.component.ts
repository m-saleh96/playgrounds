import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: any[];
  accessToken!: string;

  constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }

  ngOnInit() {
    this.accessToken = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
    this.getUsres();

  }

  getUsres() {
    this.playgroundService.displayUsers(this.accessToken).subscribe((res: any) => {
      console.log(res);
      this.users = res;
    });
  }

  deleteUser(id: number) {
    // delete user
    this.playgroundService.deleteUsers(id, this.accessToken).subscribe((res) => {
    console.log(res);

    // reload users list
    this.playgroundService.displayUsers(this.accessToken).subscribe((res: any) => this.users = res);
    });
  }
}
