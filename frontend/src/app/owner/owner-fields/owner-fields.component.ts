import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from 'src/app/services/category.service';
import { PlaygroundService } from 'src/app/services/playground.service';

@Component({
  selector: 'app-owner-fields',
  templateUrl: './owner-fields.component.html',
  styleUrls: ['./owner-fields.component.css']
})
export class OwnerFieldsComponent implements OnInit{
  owner!:any;
  fields:any[]=[];
  category!:any[];
  flag:boolean=false;
  activeForm:boolean=false;
  activeAddbutton:boolean = false;
  activeupdatebutton:boolean = false;
  fieldID!:number;
  oldPic!:any;

  constructor(private playGroundService:PlaygroundService , private categoryService:CategoryService , private cookieService:CookieService){
    this.owner = JSON.parse(this.cookieService.get('userData') || '{}')
  }

  ngOnInit(){
    this.playGroundService.ownerField(this.owner.user.id , this.owner.access_token).subscribe((res:any)=>this.fields=res);
    this.categoryService.getAllCategory().subscribe((res:any)=>this.category=res);
  }

  selectedFile: File | null = null;
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    addField:FormGroup = new FormGroup({
      'name' :new FormControl(null , [Validators.required]),
      'description' :new FormControl(null , [Validators.required ]),
      'size' :new FormControl(null , [Validators.required ]),
      'price' :new FormControl(null , [Validators.required ]),
      'type' :new FormControl(null , [Validators.required ]),
      'location' :new FormControl(null , [Validators.required ]),
      'image' :new FormControl(null),
    })



  add()
    {
      if (this.activeAddbutton) {
        if (this.addField.valid && this.selectedFile) {
          const formData = new FormData();
          formData.append('name', this.addField.get('name')!.value);
          formData.append('description', this.addField.get('description')!.value);
          formData.append('size', this.addField.get('size')!.value);
          formData.append('price', this.addField.get('price')!.value);
          formData.append('type', this.addField.get('type')!.value);
          formData.append('location', this.addField.get('location')!.value);
          formData.append('user_id', this.owner.user.id);
          formData.append('image', this.selectedFile);
          this.playGroundService.create(formData , this.owner.access_token).subscribe((data:any)=>{
            if (data) {
              this.activeForm = false;
              this.activeAddbutton = false;
              window.location.reload();
            }
            else{
              this.flag = true;
            }})
        }

      } else if(this.activeupdatebutton){
        if (this.addField.valid ) {
          const formData = new FormData();
          formData.append('name', this.addField.get('name')!.value);
          formData.append('description', this.addField.get('description')!.value);
          formData.append('size', this.addField.get('size')!.value);
          formData.append('price', this.addField.get('price')!.value);
          formData.append('type', this.addField.get('type')!.value);
          formData.append('location', this.addField.get('location')!.value);
          formData.append('user_id', this.owner.user.id);
          formData.append('_method', 'put');
          if(this.selectedFile){
          formData.append('image', this.selectedFile);
          }else{
            formData.append('image', this.oldPic);
          }

          this.playGroundService.update(this.fieldID ,formData , this.owner.access_token).subscribe((data:any)=>{
          if (data) {
            this.activeForm = false;
            this.activeupdatebutton = false;
            window.location.reload();
          }
          else{
            this.flag = true;
          }})
        }
      }
    }



  deleteField(id: number) {
    this.fields = this.fields.filter((elem:any)=>(elem.id)!=id)
    this.playGroundService.delete(id , this.owner.access_token).subscribe((res:any) => {
      if (res) {
        window.location.reload();
      }
    });
  }

  addform(){
    if (this.activeForm) {
      this.activeForm = false;
    } else{
      this.activeForm = true;
    }
    this.activeAddbutton = true;
    this.activeupdatebutton = false;
  }
  updateform(id:number){
    window.scroll(0,0);
    this.fieldID=id;
    this.activeForm = true;
    this.activeupdatebutton = true;
    this.activeAddbutton = false;
    const field = this.fields.find((elem: any) => elem.id === id);
    if (field) {
      this.oldPic = field.image;
      this.addField.patchValue({
        'name': field.name,
        'description':field.description,
        'size':field.size,
        'price':field.price,
        'type':field.type,
        'location':field.location,
        'user_id':field.user_id,
      });
    }
  }
}
