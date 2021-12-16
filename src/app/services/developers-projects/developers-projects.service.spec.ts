import { TestBed } from '@angular/core/testing';

import { DevelopersProjectsService } from './developers-projects.service';

describe('DevelopersProjectsService', () => {
  let service: DevelopersProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelopersProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
