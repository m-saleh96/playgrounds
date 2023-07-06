import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
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
  errorMessage!:string;
  location:any[]=[];
  cities:any[]=[];
  city:any[]=[];
  govern!:any;
  governID!:number;
  constructor(private playGroundService:PlaygroundService , private categoryService:CategoryService , private cookieService:CookieService ,
  private http:HttpClient , private router:Router){
    this.owner = JSON.parse(this.cookieService.get('userData') || '{}')
  }

  ngOnInit(){
    this.playGroundService.ownerField(this.owner.user.id , this.owner.access_token).subscribe((res:any)=>this.fields=res);
    this.categoryService.getAllCategory().subscribe((res:any)=>this.category=res);
    this.http.get('assets/egypt/governorates.json').subscribe((data:any)=>this.location=data);
    this.http.get('assets/egypt/cities.json').subscribe((data:any)=>this.cities = data);
  }




  selectedFile: File | null = null;
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    selectedSubImgFiles: any | null = null;
    onSubSelected(event: any) {
      this.selectedSubImgFiles = event.target.files;
      if (this.selectedSubImgFiles) {
        for (let i = 0; i < this.selectedSubImgFiles.length; i++) {
          const file = this.selectedSubImgFiles[i];
          console.log(file);
        }
      }
    }
    

    addField:FormGroup = new FormGroup({
      'name' :new FormControl(null , [Validators.required]),
      'description' :new FormControl(null , [Validators.required ]),
      'size' :new FormControl(null , [Validators.required ]),
      'price' :new FormControl(null , [Validators.required ]),
      'type' :new FormControl(null , [Validators.required ]),
      'location' :new FormControl(null , [Validators.required ]),
      'city' :new FormControl(null , [Validators.required ]),
      'street' :new FormControl(null , [Validators.required ]),
      'image' :new FormControl(null),
      'subimage' :new FormControl(null),
    })



  add()
    {
      if (this.activeAddbutton) {
        if (this.addField.valid && this.selectedFile && this.selectedSubImgFiles) {
          const formData = new FormData();
          formData.append('name', this.addField.get('name')!.value);
          formData.append('description', this.addField.get('description')!.value);
          formData.append('size', this.addField.get('size')!.value);
          formData.append('price', this.addField.get('price')!.value);
          formData.append('type', this.addField.get('type')!.value);
          formData.append('location', this.addField.get('location')!.value);
          formData.append('city', this.addField.get('city')!.value);
          formData.append('street', this.addField.get('street')!.value);
          formData.append('user_id', this.owner.user.id);
          formData.append('image', this.selectedFile);
          if (this.selectedSubImgFiles) {
            for (let i = 0; i < this.selectedSubImgFiles.length; i++) {
              const file = this.selectedSubImgFiles[i];
              formData.append('subimage[]', file);
            }
          this.playGroundService.create(formData , this.owner.access_token).subscribe((data:any)=>{
            if (data) {
              this.activeForm = false;
              this.activeAddbutton = false;
              window.location.reload();
            }
          })
        } else{
          this.errorMessage = "Please fill all the required fields";
          this.flag = true;
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
          formData.append('city', this.addField.get('city')!.value);
          formData.append('street', this.addField.get('street')!.value);
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
          })
        }
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
      this.govern = field.location;
      this.location.forEach(elem=>{
        if(elem.governorate_name_en == this.govern){
          this.governID = elem.id;
        }
      })

      this.city = this.cities.filter(elem=>elem.governorate_id == this.governID);
      this.oldPic = field.image;
      this.addField.patchValue({
        'name': field.name,
        'description':field.description,
        'size':field.size,
        'price':field.price,
        'type':field.type,
        'location':field.location,
        'city':field.city,
        'street':field.street,
        'user_id':field.user_id,
      });
    }
  }

  filter(e:any){
    let govern = e.target.value;
    this.location.forEach(elem=>{
      if(elem.governorate_name_en == govern){
        this.governID = elem.id;
      }
    })
    this.city = this.cities.filter(elem=>elem.governorate_id == this.governID);
  }

addsubImg(){
  this.displaySubImg=true
}

recieve(id:number){
  this.router.navigate(['/owner/recieve',id])
}

}
