import { TestBed } from '@angular/core/testing';

import { PermissionGuard } from './permisoauth.guard';

describe('PermisoauthGuard', () => {
  let guard: PermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
