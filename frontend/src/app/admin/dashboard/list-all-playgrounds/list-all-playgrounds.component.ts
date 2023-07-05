import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Playground } from 'src/app/interfaces/playground';
import { Component, OnInit } from '@angular/core';
import { PlaygroundService } from 'src/app/services/playground.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-all-playgrounds',
  templateUrl: './list-all-playgrounds.component.html',
  styleUrls: ['./list-all-playgrounds.component.css']
})
export class ListAllPlaygroundsComponent implements OnInit{

  playgrounds!: Playground []
  accessToken!: string;
  faCheck = faCheck;

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private playgroundService: PlaygroundService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.accessToken = JSON.parse(this.cookieService.get('userData') || '{}').access_token;
    this.playgroundService.listPending(this.accessToken, this.currentPage, this.pageSize).subscribe((res: any) => this.playgrounds = res);
  }

  acceptPlayground(id: number) {
      // playground status updated
    this.playgroundService.updateStatusAccept(id, 'done', this.accessToken).subscribe((res) => {
      console.log(res);

      // reload playgrounds list
      this.playgroundService.listPending(this.accessToken, this.currentPage, this.pageSize).subscribe((res: any) => this.playgrounds = res);

      // this.getPlaygrounds();
    });
  }

  rejectPlayground(id: number) {
    // playground status updated
    this.playgroundService.updateStatusRejected(id, 'rejected', this.accessToken).subscribe((res) => {
    console.log(res);

    // reload playgrounds list
    this.playgroundService.listPending(this.accessToken, this.currentPage, this.pageSize).subscribe((res: any) => this.playgrounds = res);

    });
  }


  getPlaygrounds(): void {
    // this.playgroundService.listPending(this.accessToken).subscribe((res: any) => this.playgrounds = res);
    this.playgroundService.listPending(this.accessToken, this.currentPage, this.pageSize).subscribe((res: any) => {
      this.playgrounds = res;
      this.totalPages = res.totalPages;
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    // this.getPlaygrounds();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // this.getPlaygrounds();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      // this.getPlaygrounds();
    }

}

get pages(): number[] {
  const pagesArray = [];
  for (let i = 1; i <= this.totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
}

}
