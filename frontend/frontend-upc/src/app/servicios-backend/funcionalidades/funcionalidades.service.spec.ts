import { TestBed } from '@angular/core/testing';

import { FuncionalidadService } from './funcionalidades.service';

describe('FuncionalidadesService', () => {
  let service: FuncionalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
