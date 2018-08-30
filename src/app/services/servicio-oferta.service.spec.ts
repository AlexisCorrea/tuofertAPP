import { TestBed, inject } from '@angular/core/testing';

import { ServicioOfertaService } from './servicio-oferta.service';

describe('ServicioOfertaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioOfertaService]
    });
  });

  it('should be created', inject([ServicioOfertaService], (service: ServicioOfertaService) => {
    expect(service).toBeTruthy();
  }));
});
