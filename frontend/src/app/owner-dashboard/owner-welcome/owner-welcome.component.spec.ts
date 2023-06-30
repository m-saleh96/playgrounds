import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerWelcomeComponent } from './owner-welcome.component';

describe('OwnerWelcomeComponent', () => {
  let component: OwnerWelcomeComponent;
  let fixture: ComponentFixture<OwnerWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerWelcomeComponent]
    });
    fixture = TestBed.createComponent(OwnerWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
