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
  recieve2:any[]=[];
  myForm: FormGroup;
  flag:boolean=false;
  errorMessage!:string;
  playGroundId!:number;
  token!:any;
  timeSlots: any[] = [];
  editTimeSlots: any[] = [];
  day!:any;
  activeForm:boolean=false;
  tableData:boolean=true;
  uniqueDays:any[]=[];
  editDay!:any;



  activeAddButton:boolean = false;
  activeEditButton:boolean = false;

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
    this.ownerRecieve.getTime(this.playGroundId).subscribe(res=>{
      this.recieve=res
      console.log(res);

      this.uniqueDays = [...new Set(this.recieve.map(item => item.day))].filter((value, index, self) => self.indexOf(value) === index);

      this.editDay = this.uniqueDays[0]

      this.recieve.forEach(elm=>{
        if (elm.day==this.editDay) {
          this.recieve2.push(elm)
        }
      })

      this.timeSlots = this.recieve2.map(({ id, start_time, end_time }) => ({ id, start: start_time, end: end_time }));
      console.log(this.timeSlots);

    },
    (error) => {
      if (error.status === 404 && error.error.message === 'No time slots for this playground') {
        this.activeAddButton = true;
        this.activeForm = true;
        this.tableData = false;
        this.flag = true;
        this.errorMessage = "No time added please add day and time"
      }
    }
    );
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
    console.log(this.timeSlots);
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
    console.log(this.timeSlots);
  }





  submitForm(): void {

    if (this.activeAddButton) {
      const data = { playground_id: this.playGroundId, day: this.day, time: this.timeSlots };
      if (this.timeSlots.length == 0) {
        this.flag = true;
        this.errorMessage = "please add at least one time"
      } else {
        this.ownerRecieve.addSlot(data , this.token).subscribe(res=>{
          if (res) {
            window.location.reload();
          }
        },
        (error) => {
          if (error.status === 400 && error.error.day[0] === 'The day has already been taken.') {
            this.flag=true;
            this.errorMessage = error.error.day;
          }
        }
        )
      }
    } else if (this.activeEditButton){
      const data = { playground_id: this.playGroundId, day: this.editDay, time: this.timeSlots , _method: "put" };
      const slotID = this.recieve[0].slot_id

      this.ownerRecieve.updateSlot(slotID,data,this.token).subscribe(res=>{
        if (res) {
          window.location.reload();
        }
      },
      (error) => {
        if (error) {

        }
      }
      )

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


  resetform(){
    this.timeSlots = [];
    this.day = this.myForm.controls['day'].value;
  }


  deleteTime(id:number){
    console.log(id);

    this.ownerRecieve.deletTime(id).subscribe(res=>{
      console.log(res);

      // if (!res) {
      //   window.location.reload();
      // }
    })
  }

  filter(e:any){
    this.editDay = e.target.value;
    this.recieve2 =[];
    this.recieve.forEach(elm=>{
      if (elm.day==this.editDay) {
        this.recieve2.push(elm)
      }
    })

    this.timeSlots = this.recieve2.map(({ id, start_time, end_time }) => ({ id, start: start_time, end: end_time }));


  }

  addform(){
    this.timeSlots = [];
    this.activeAddButton = true;
    this.activeEditButton = false;
    this.activeForm = true;
    this.tableData = false;

  }

  convertTo24Hour(timeString:any) {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }

  edit(){
    this.timeSlots = this.recieve2.map(({ id, start_time, end_time }) => ({ id, start: start_time, end: end_time }));
    this.activeForm = true
    this.activeEditButton = true;
    this.tableData = false;

    this.myForm.patchValue({
      'day':this.editDay
    })
    console.log(this.timeSlots);
  }

  deleteSlot(i:any){
    this.timeSlots.splice(i,1)
  }

  slotID!:number;
  addTimeBtn:boolean=true;
  editTimeBtn:boolean=false;

  upToEdit(i:any){
    this.addTimeBtn=false;
    this.editTimeBtn=true;
    const convertedStartTime = this.convertTo24Hour(this.timeSlots[i].start);
    const convertedEndTime = this.convertTo24Hour(this.timeSlots[i].end);
    this.slotID = this.timeSlots[i].id;
    this.myForm.patchValue({
      'startTime':convertedStartTime,
      'endTime':convertedEndTime,
    })

  }

  editTime(){
    console.log(this.slotID);
    this.timeSlots.map(elm=>{
      if (elm.id == this.slotID) {
        elm.start = this.formatTime(this.myForm.controls['startTime'].value);
        elm.end = this.formatTime(this.myForm.controls['endTime'].value);
      }
    })
    this.addTimeBtn=true;
    this.editTimeBtn=false;
    console.log(this.timeSlots);
  }

  close(){
    this.activeForm=false;
    this.tableData=true;
    this.activeAddButton= false;
    this.activeEditButton= false;
    this.addTimeBtn=true;
    this.editTimeBtn=false;
    this.timeSlots = this.recieve2.map(({ id, start_time, end_time }) => ({ id, start: start_time, end: end_time }));
  }

}
