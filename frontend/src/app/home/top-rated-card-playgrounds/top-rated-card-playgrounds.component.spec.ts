import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedCardPlaygroundsComponent } from './top-rated-card-playgrounds.component';

describe('TopRatedCardPlaygroundsComponent', () => {
  let component: TopRatedCardPlaygroundsComponent;
  let fixture: ComponentFixture<TopRatedCardPlaygroundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopRatedCardPlaygroundsComponent]
    });
    fixture = TestBed.createComponent(TopRatedCardPlaygroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
