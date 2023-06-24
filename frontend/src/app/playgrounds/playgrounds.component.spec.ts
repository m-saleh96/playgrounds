import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundsComponent } from './playgrounds.component';

describe('PlaygroundsComponent', () => {
  let component: PlaygroundsComponent;
  let fixture: ComponentFixture<PlaygroundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaygroundsComponent]
    });
    fixture = TestBed.createComponent(PlaygroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
