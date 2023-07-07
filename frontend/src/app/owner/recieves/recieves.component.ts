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

  recieve:any[]=[];
  myForm: FormGroup;
  flag:boolean=false;
  errorMessage!:string;
  playGroundId!:number;
  token!:any;
  timeSlots: any[] = [];
  day!:any;
  activeForm:boolean=false;
  tableData:boolean=true;

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
    this.getAllTime();
  }

  getAllTime(){
    this.ownerRecieve.getTime(this.playGroundId).subscribe(res=>this.recieve=res);
  }

  addform(){
    if (this.activeForm) {
      this.activeForm = false;
    } else {
      this.activeForm = true;
    }
    if (this.tableData) {
      this.tableData = false;
    } else {
      this.tableData = true;
    }

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

  addTime(){
    if (this.myForm.valid) {
      this.flag=false;

      this.day = this.myForm.controls['day'].value;

      const startTime = this.myForm.controls['startTime'].value;
      const endTime = this.myForm.controls['endTime'].value;

      const formattedStartTime = this.formatTime(startTime);
      const formattedEndTime = this.formatTime(endTime);

      const time = { start: formattedStartTime, end: formattedEndTime };


      if (this.timeSlots.length==0) {
        this.timeSlots.push(time);
      } else if(formattedStartTime >= this.timeSlots[this.timeSlots.length - 1]['start'] && formattedStartTime < this.timeSlots[this.timeSlots.length - 1]['end']){
        this.flag = true;
        this.errorMessage = `You can't choose time from less than ${this.timeSlots[this.timeSlots.length - 1]['end']}.`;
      } else if(this.timeSlots[this.timeSlots.length - 1]['end'] <=formattedStartTime){
        this.timeSlots.push(time);
      } else if (this.timeSlots[this.timeSlots.length - 1]['end'] > formattedStartTime){
        this.flag = true;
        this.errorMessage = `You can't choose time from less than ${this.timeSlots[this.timeSlots.length - 1]['end']}.`;
      } else if(this.timeSlots[0]['start'] > formattedEndTime ){
        this.flag = true;
        this.errorMessage = `You can't choose time to more than ${this.timeSlots[0]['start']}.`;
      }

    } else {
      this.errorMessage = "Please fill all the required fields"
      this.flag=true
    }
  }

  submitForm(): void {
    const data = { playground_id: this.playGroundId, day: this.day, time: this.timeSlots };
    this.ownerRecieve.addSlot(data , this.token).subscribe(res=>{
      if (res) {
        window.location.reload();
      }
    })

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


  resetform(){
    this.timeSlots = [];
    this.day = this.myForm.controls['day'].value;
  }

  deleteSlot(i:any){
    this.timeSlots.splice(i,1)
  }

  deleteTime(id:number){
    this.ownerRecieve.deletTime(id).subscribe(res=>{
      if (!res) {
        window.location.reload();
      }
    })
  }
}
