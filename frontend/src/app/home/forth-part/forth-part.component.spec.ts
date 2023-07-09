import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForthPartComponent } from './forth-part.component';

describe('ForthPartComponent', () => {
  let component: ForthPartComponent;
  let fixture: ComponentFixture<ForthPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForthPartComponent]
    });
    fixture = TestBed.createComponent(ForthPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
