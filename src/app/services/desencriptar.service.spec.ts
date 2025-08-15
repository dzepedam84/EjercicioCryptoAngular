import { TestBed } from '@angular/core/testing';

import { DesencriptarService } from './desencriptar.service';

describe('DesencriptarService', () => {
  let service: DesencriptarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesencriptarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
