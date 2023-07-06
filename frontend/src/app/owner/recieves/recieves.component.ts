import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwnerRecieveService } from 'src/app/services/owner-recieve.service';

@Component({
  selector: 'app-recieves',
  templateUrl: './recieves.component.html',
  styleUrls: ['./recieves.component.css']
})
export class RecievesComponent implements OnInit {

  myForm: FormGroup;
  flag:boolean=false;
  errorMessage!:string;
  playGroundId!:number;
  token!:any;

  constructor(private fb: FormBuilder , private route:ActivatedRoute , private ownerRecieve:OwnerRecieveService , private cookieService:CookieService) {
    this.route.params.subscribe(param=>{
      this.playGroundId = param['id'];
    });

    this.myForm = this.fb.group({
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    }, { validators: this.timeComparisonValidator });
  }

  ngOnInit(): void {
    this.token = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
  }

  getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, '0');
    const day = `${currentDate.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  timeComparisonValidator(control: AbstractControl): { [key: string]: any } | null {
    const startTime = control.get('startTime')?.value;
    const endTime = control.get('endTime')?.value;
    if (startTime && endTime && startTime >= endTime) {
      return { invalidTimeRange: true };
    }
    return null;
  }

  submitForm(): void {
    if (this.myForm.valid) {
      this.flag=false;
      const playgroundId = this.playGroundId;
      const day = this.myForm.controls['day'].value;
      const startTime = this.myForm.controls['startTime'].value;
      const endTime = this.myForm.controls['endTime'].value;

      const formattedStartTime = this.formatTime(startTime);
      const formattedEndTime = this.formatTime(endTime);

      const time = [{ start: formattedStartTime, end: formattedEndTime }];
      const data = { playground_id: playgroundId, day: day, time: time };

      console.log(data);

      this.ownerRecieve.addSlot(data , this.token).subscribe(res=>{
        if (res) {
          window.location.reload();
        }
      })

    } else {
      this.errorMessage = "Please fill all the required fields"
      this.flag=true
    }
  }

  formatTime(timeString: string): string {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    return formattedTime;
  }
}
