import { TestBed } from '@angular/core/testing';

import { EtudiantGuardService } from './etudiant-guard.service';

describe('EtudiantGuardService', () => {
  let service: EtudiantGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtudiantGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
