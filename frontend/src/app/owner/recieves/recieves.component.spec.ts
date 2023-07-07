import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievesComponent } from './recieves.component';

describe('RecievesComponent', () => {
  let component: RecievesComponent;
  let fixture: ComponentFixture<RecievesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecievesComponent]
    });
    fixture = TestBed.createComponent(RecievesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
