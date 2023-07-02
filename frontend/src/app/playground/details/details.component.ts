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
    //get playground id from parameters
    this.playgroundId = Number(this.route.snapshot.paramMap.get('id'))

    //get playground details and save it in interface to display it on loading page
    this.playgroundService.listById(this.playgroundId).subscribe((res: any) => {this.playgrounds = [res]});

    //get reviews  and save it in interface to display it on loading page
    this.reviewService.listById(this.playgroundId).subscribe((res: any) => {this.reviews = res});

  }

  // Go to adding playground page
  addplayground(){
    this.router.navigate(['playground/add/'])
   }

// Open small form to add review (if you are login) if not go to login page
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
    }
  }

// on click add it will save all information in DB and display it as review
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
            (response) => {console.log('Response: ', response);setTimeout(() => {location.reload();}, 1); // Reload page after 2 seconds
          },
            (error) => {console.log('Error: ', error);}
          )
          this.toDisplay=false

      // window.location.reload();

  }
 
  
// Delete review
delete(id: number){
  const token = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
  
   this.reviewService.deleteReview(id, token).subscribe(
    (response) => {console.log('Data deleted successfully ');setTimeout(() => {location.reload();}, 1);},
        error => console.error('Error deleting data', error)
  )
 
}
}
