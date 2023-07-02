import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllPlaygroundsComponent } from './list-all-playgrounds.component';

describe('ListAllPlaygroundsComponent', () => {
  let component: ListAllPlaygroundsComponent;
  let fixture: ComponentFixture<ListAllPlaygroundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllPlaygroundsComponent]
    });
    fixture = TestBed.createComponent(ListAllPlaygroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
