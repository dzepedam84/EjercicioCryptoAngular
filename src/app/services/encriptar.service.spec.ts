import { TestBed } from '@angular/core/testing';

import { EncriptarService } from './encriptar.service';

describe('EncriptarService', () => {
  let service: EncriptarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncriptarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
