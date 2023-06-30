import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPanelComponent } from './owner-panel.component';

describe('OwnerPanelComponent', () => {
  let component: OwnerPanelComponent;
  let fixture: ComponentFixture<OwnerPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerPanelComponent]
    });
    fixture = TestBed.createComponent(OwnerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
