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

  categories!: Categories [] 
  constructor(private categoryService: CategoryService,  private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

this.getAllCategories()
  }

getAllCategories(){
  this.categoryService.getAllCategory().subscribe((res: any) => this.categories = res);
}
delete(id: number){
  const token = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
  
   this.categoryService.deleteCategory(id, token).subscribe(
    result => console.log('Data deleted successfully'),
    error => console.error('Error deleting data', error)
  )
//    (response) => {console.log('Data deleted successfully ');setTimeout(() => {location.reload();}, 1);}, // Reload page after 2 seconds
window.location.reload();

}
}