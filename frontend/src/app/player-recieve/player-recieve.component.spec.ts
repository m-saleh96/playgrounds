import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRecieveComponent } from './player-recieve.component';

describe('PlayerRecieveComponent', () => {
  let component: PlayerRecieveComponent;
  let fixture: ComponentFixture<PlayerRecieveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerRecieveComponent]
    });
    fixture = TestBed.createComponent(PlayerRecieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
