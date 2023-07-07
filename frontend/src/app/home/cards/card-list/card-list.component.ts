import { Component } from '@angular/core';
import { Playground } from 'src/app/interfaces/playground';
import { PlaygroundService } from 'src/app/services/playground.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  playgrounds !:Playground[];

  constructor(private http: HttpClient , private playgroundService: PlaygroundService){}


  ngOnInit(): void {
    this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res.data);
  }
}
