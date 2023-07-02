import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFieldsComponent } from './owner-fields.component';

describe('OwnerFieldsComponent', () => {
  let component: OwnerFieldsComponent;
  let fixture: ComponentFixture<OwnerFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerFieldsComponent]
    });
    fixture = TestBed.createComponent(OwnerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
