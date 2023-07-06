import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComplainsComponent } from './list-complains.component';

describe('ListComplainsComponent', () => {
  let component: ListComplainsComponent;
  let fixture: ComponentFixture<ListComplainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComplainsComponent]
    });
    fixture = TestBed.createComponent(ListComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
