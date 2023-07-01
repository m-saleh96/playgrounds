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


  constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res);
  }


  acceptPlayground(id: number) {
    this.playgroundService.update(id, { status: 'done' }).subscribe(() => {
    });
  }

}
