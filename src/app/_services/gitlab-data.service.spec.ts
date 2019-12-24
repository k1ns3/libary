import { TestBed } from '@angular/core/testing';

import { GitlabDataService } from './gitlab-data.service';

describe('GitlabDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitlabDataService = TestBed.get(GitlabDataService);
    expect(service).toBeTruthy();
  });
});
