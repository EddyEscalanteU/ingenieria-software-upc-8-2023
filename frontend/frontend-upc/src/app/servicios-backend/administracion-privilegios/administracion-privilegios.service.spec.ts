import { TestBed } from '@angular/core/testing';

import { AdministracionPrivilegiosService } from './administracion-privilegios.service';

describe('AdministracionPrivilegiosService', () => {
  let service: AdministracionPrivilegiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministracionPrivilegiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
