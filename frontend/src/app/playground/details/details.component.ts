import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playground } from 'src/app/interfaces/playground';
import { Review } from 'src/app/interfaces/review';
import { PlaygroundService } from 'src/app/services/playground.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  playgroundId!: number;

  playgrounds !: Playground[];
  reviews !: Review[];

  constructor(private http: HttpClient, private playgroundService: PlaygroundService, private reviewService: ReviewService, private route: ActivatedRoute, private router:Router) { }


  ngOnInit(): void {
    this.playgroundId = Number(this.route.snapshot.paramMap.get('id'))
    console.log(this.playgroundId);

    this.playgroundService.listById(this.playgroundId).subscribe((res: any) => {
      this.playgrounds = [res]
      // console.log(this.playgrounds);
    });
    this.reviewService.listById(this.playgroundId).subscribe((res: any) => {
      this.reviews = res
      console.log(this.reviews);
    });

  }

  addplayground(){
    this.router.navigate(['playground/add/'])


  }
}
