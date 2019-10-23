import { TestBed } from '@angular/core/testing';

import { EmpleadoServiceService } from './empleado-service.service';

describe('EmpleadoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpleadoServiceService = TestBed.get(EmpleadoServiceService);
    expect(service).toBeTruthy();
  });
});
