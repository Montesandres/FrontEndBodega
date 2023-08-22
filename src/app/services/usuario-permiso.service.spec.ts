import { TestBed } from '@angular/core/testing';

import { UsuarioPermisoService } from './usuario-permiso.service';

describe('UsuarioPermisoService', () => {
  let service: UsuarioPermisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioPermisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
