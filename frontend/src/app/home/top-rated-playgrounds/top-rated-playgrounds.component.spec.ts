import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedPlaygroundsComponent } from './top-rated-playgrounds.component';

describe('TopRatedPlaygroundsComponent', () => {
  let component: TopRatedPlaygroundsComponent;
  let fixture: ComponentFixture<TopRatedPlaygroundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopRatedPlaygroundsComponent]
    });
    fixture = TestBed.createComponent(TopRatedPlaygroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
