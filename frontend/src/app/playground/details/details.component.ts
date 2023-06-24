import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playground } from 'src/app/interfaces/playground';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  userId!: number;

  playgrounds !:Playground[];

  constructor(private http: HttpClient , private playgroundService: PlaygroundService, private route: ActivatedRoute){}


  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'))
console.log(this.userId);

    this.playgroundService.listById(this.userId).subscribe((res: any) =>{ this.playgrounds = [res]
  console.log(this.playgrounds);
    });
  }
}
