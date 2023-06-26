import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Playground } from 'src/app/interfaces/playground';
import { Signup } from 'src/app/interfaces/signup';
import { PlaygroundService } from 'src/app/services/playground.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  oldPic!:any;

  playground: Playground = {} as Playground;

  constructor(private http: HttpClient , private router:Router, private playgroundService: PlaygroundService, private registerService :RegisterService){}

  selectedFile: File | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  addPlayground:FormGroup = new FormGroup({
    'name' :new FormControl(null , [Validators.required]),
    'location' :new FormControl(null , [Validators.required]),
    'description' :new FormControl(null , [Validators.required]),
    'price' :new FormControl(null , [Validators.required]),
    'size' :new FormControl(null , [Validators.required]),
    'type' :new FormControl(null , [Validators.required]),
    'image' :new FormControl(null),
    'user_id' :new FormControl(1 , [Validators.required]),

  })

  add() {
    if (this.addPlayground.valid &&  this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.addPlayground.get('name')!.value);
      formData.append('description', this.addPlayground.get('description')!.value);
      formData.append('image', this.selectedFile);
      formData.append('price', this.addPlayground.get('price')!.value);
      formData.append('size', this.addPlayground.get('size')!.value);
      formData.append('type', this.addPlayground.get('type')!.value);
      formData.append('location', this.addPlayground.get('location')!.value);
      formData.append('user_id', this.addPlayground.get('user_id')!.value);

    this.playgroundService.create(formData).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  this.router.navigate(['home/'])
}
}