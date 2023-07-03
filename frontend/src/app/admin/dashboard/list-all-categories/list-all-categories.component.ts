import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/interfaces/categories';
import { CategoryService } from 'src/app/services/category.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-list-all-categories',
  templateUrl: './list-all-categories.component.html',
  styleUrls: ['./list-all-categories.component.css']
})
export class ListAllCategoriesComponent {
  toDisplayAdd: boolean = false;
  toedit: boolean = false;
  categoryName!: any;
  categoryNameEdit!: any;
  categoryId: number = 0;
  errorMessage!: string;

  categories!: Categories[]
  constructor(private categoryService: CategoryService, private router: Router, private cookieService: CookieService) { }
  ngOnInit(): void {

    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryService.getAllCategory().subscribe((res: any) => this.categories = res);
  }
  delete(id: number) {
    const token = JSON.parse(this.cookieService.get('userData') || '{}').access_token;

    this.categoryService.deleteCategory(id, token).subscribe(
      (res) => { console.log('Data deleted successfully ' + res); setTimeout(() => { location.reload(); }, 1); },
      error => alert(error)//console.error('Error deleting data', error)
    )

  }


  // openAddForm
  openAddForm() {
    this.toDisplayAdd = true
  }

  // add category
  postCategory() {
    console.log(this.categoryName);
    const token = JSON.parse(this.cookieService.get('userData') || '{}').access_token;

    this.categoryService.addCategory({ name: this.categoryName }, token).subscribe((res) => {
      console.log(res);
      setTimeout(() => { location.reload(); }, 1)
    },
      (error) => console.log(error)
    )

    this.toDisplayAdd = false;
  }

  // open edit form
  edit(id: number) {
    this.categoryId = id;
    this.toedit = true;

  }
  //editCategory
  editCategory() {
    const token = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
    console.log(this.categoryId);
    console.log(this.categoryNameEdit);


    this.categoryService.editCategory(this.categoryId, { name: this.categoryNameEdit, _method: "put" }, token).subscribe((res) => {
      console.log(res);
      setTimeout(() => { location.reload(); }, 1);
    }
    )
    this.toedit = false

  }

  validationCreate() {
    const unique = !this.categories.some(obj => obj.name === this.categoryName);
    //console.log(unique);
    //console.log(this.categoryName.length);

    if (!unique) {
      this.errorMessage = "not unique category"
    }
    else if (this.categoryName.length <= 3) {
      this.errorMessage = "too short category name"
    }
    else {
      this.postCategory();
    }
  }

  validationEdit() {
    const unique = !this.categories.some(obj => obj.name === this.categoryNameEdit);
    //console.log(unique);
    //console.log(this.categoryName.length);

    if (!unique) {
      this.errorMessage = "not unique category"
    }
    else if (this.categoryNameEdit.length <= 3) {
      this.errorMessage = "too short category name"
    }
    else {
      this.editCategory();
    }
  }
}
