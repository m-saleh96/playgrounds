import { HttpClient, HttpResponse ,HttpHeaders} from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playground } from 'src/app/interfaces/playground';
import { Review } from 'src/app/interfaces/review';
import { PlaygroundService } from 'src/app/services/playground.service';
import { ReviewService } from 'src/app/services/review.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  playgroundId!: number;
  isLogin:boolean=false;
  toDisplay = false;
  rating: any;
  review: any;
  errorMessage:any='';
  user_id: number=0;

  playgrounds !: Playground[];
  reviews !: Review[];
  
  // @Input() todos: any[] = [];
  @Output() setTasks = new EventEmitter();

  constructor(private http: HttpClient, private playgroundService: PlaygroundService, private reviewService: ReviewService, private route: ActivatedRoute, private router:Router, private cookieService: CookieService) { }


  ngOnInit(): void {
    this.playgroundId = Number(this.route.snapshot.paramMap.get('id'))
    console.log(this.playgroundId);

    this.playgroundService.listById(this.playgroundId).subscribe((res: any) => {this.playgrounds = [res]});

    this.reviewService.listById(this.playgroundId).subscribe((res: any) => {this.reviews = res});

  }

  addplayground(){
    this.router.navigate(['playground/add/'])
   }




  checklogin(){
      if(JSON.parse(this.cookieService.get('userData') || '{}').user?.id >=1){
        this.user_id=Number(JSON.parse(this.cookieService.get('userData') || '{}').user?.id)
          // console.log(JSON.parse(this.cookieService.get('userData') || '{}').access_token);

        this.toDisplay=true
        this.isLogin = true;
      }else{
           this.toDisplay=false
           alert("please login")
           this.router.navigate(['login/'])
          // this.errorMessage = 'please login first';
    }
  }


postReview(){
      const data: { review: string, rating: number, user_id: number, playground_id:number } = {
           review:String( this.review),
           rating:Number( this.rating),
           user_id: this.user_id,
           playground_id:this.playgroundId
         };

      const token = JSON.parse(this.cookieService.get('userData') || '{}').access_token;

      console.log(data);

      this.reviewService.create(data, token).subscribe(
            (response) => {console.log('Response: ', response);},
            (error) => {console.log('Error: ', error);}
          )

      // window.location.reload();

  }
  
}
