import { TestBed, inject } from '@angular/core/testing';

import { ServicioNegocioService } from './servicio-negocio.service';

describe('ServicioNegocioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioNegocioService]
    });
  });

  it('should be created', inject([ServicioNegocioService], (service: ServicioNegocioService) => {
    expect(service).toBeTruthy();
  }));
});
