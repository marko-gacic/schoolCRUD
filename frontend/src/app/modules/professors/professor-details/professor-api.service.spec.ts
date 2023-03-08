import { TestBed } from '@angular/core/testing';

import { ProfessorApiService } from './professor-api.service';

describe('ProfessorApiService', () => {
  let service: ProfessorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
