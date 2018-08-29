import { TestBed, inject } from '@angular/core/testing';

import { ServicioPersonaService } from './servicio-persona.service';

describe('ServicioPersonaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioPersonaService]
    });
  });

  it('should be created', inject([ServicioPersonaService], (service: ServicioPersonaService) => {
    expect(service).toBeTruthy();
  }));
});
