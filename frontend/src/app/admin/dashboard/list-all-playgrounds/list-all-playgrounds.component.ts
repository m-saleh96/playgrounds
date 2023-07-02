// import { Playground } from 'src/app/interfaces/playground';
// import { Component } from '@angular/core';
// import { PlaygroundService } from 'src/app/services/playground.service';
// import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-list-all-playgrounds',
//   templateUrl: './list-all-playgrounds.component.html',
//   styleUrls: ['./list-all-playgrounds.component.css']
// })
// export class ListAllPlaygroundsComponent {

//   playgrounds!: Playground []


//   constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }

//   ngOnInit(): void {
//     this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res);
//   }



//   acceptPlayground(id: number) {
//     this.playgroundService.update(id, 'done').subscribe(() => {
//     });
//   }

// }
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
  // userRole!: string;

  constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.accessToken = this.cookieService.get('userData').access_token;
    this.accessToken = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
    this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res);

    // get the user role from the access token
    const jwtData = this.accessToken.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    // this.userRole = decodedJwtData.role;
  }

  acceptPlayground(id: number) {
    console.log(this.accessToken);

    // console.log(this.userRole);

    // if (this.userRole !== 'admin') {
    //   console.log('You are not authorized to accept this playground');
    //   return;
    // }

    this.playgroundService.update(id, 'done', this.accessToken).subscribe(() => {
      // playground status updated
      // reload playgrounds list
      this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res);
    });
  }

}
