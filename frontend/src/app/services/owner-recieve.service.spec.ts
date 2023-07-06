import { TestBed } from '@angular/core/testing';

import { OwnerRecieveService } from './owner-recieve.service';

describe('OwnerRecieveService', () => {
  let service: OwnerRecieveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerRecieveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
