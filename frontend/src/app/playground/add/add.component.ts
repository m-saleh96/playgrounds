import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Playground } from 'src/app/interfaces/playground';
import { PlaygroundService } from 'src/app/services/playground.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  // playgrounds !:Playground[];
  playground: Playground = {} as Playground;

  constructor(private http: HttpClient , private playgroundService: PlaygroundService, private registerService :RegisterService){}



  onSubmit() {
    // handle form submission here (e.g. send POST request to backend)
    console.log(this.playground);
  }
}
