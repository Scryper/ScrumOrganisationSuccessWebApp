import { TestBed } from '@angular/core/testing';

import { DevelopersTechnologiesService } from './developers-technologies.service';

describe('DevelopersTechnologiesService', () => {
  let service: DevelopersTechnologiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelopersTechnologiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
