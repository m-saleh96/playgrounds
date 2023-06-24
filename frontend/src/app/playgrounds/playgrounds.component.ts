import { Component } from '@angular/core';

@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.css']
})
export class PlaygroundsComponent {

  showTypeContent: boolean = true;
  showPriceContent: boolean = false;
  showReviewsContent: boolean = false;
  showLocationContent: boolean = false;

  toggleContent(section: string): void {
    if (section === 'type') {
      this.showTypeContent = !this.showTypeContent;
    } else if (section === 'price') {
      this.showPriceContent = !this.showPriceContent;
    } else if (section === 'reviews') {
      this.showReviewsContent = !this.showReviewsContent;
    } else if (section === 'location') {
      this.showLocationContent = !this.showLocationContent;
    }
  }
}
