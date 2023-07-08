import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFooterComponent } from './last-footer.component';

describe('LastFooterComponent', () => {
  let component: LastFooterComponent;
  let fixture: ComponentFixture<LastFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastFooterComponent]
    });
    fixture = TestBed.createComponent(LastFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
