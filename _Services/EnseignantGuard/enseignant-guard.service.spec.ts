import { TestBed } from '@angular/core/testing';

import { EnseignantGuardService } from './enseignant-guard.service';

describe('EnseignantGuardService', () => {
  let service: EnseignantGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnseignantGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
