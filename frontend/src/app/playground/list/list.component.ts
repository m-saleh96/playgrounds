import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Playground } from 'src/app/interfaces/playground';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  playgrounds !:Playground[];

  constructor(private http: HttpClient , private playgroundService: PlaygroundService){}


  ngOnInit(): void {

    this.playgroundService.listAll().subscribe((res: any) => this.playgrounds = res);
  console.log(this.playgrounds);
  
  }
}
