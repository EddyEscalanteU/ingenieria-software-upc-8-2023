import { TestBed } from '@angular/core/testing';

import { AsignacionRolesService } from './asignacion-roles.service';

describe('AsignacionRolesService', () => {
  let service: AsignacionRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
