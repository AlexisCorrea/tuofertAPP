import { TestBed, inject } from '@angular/core/testing';

import { SesionesService } from './sesiones.service';

describe('SesionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SesionesService]
    });
  });

  it('should be created', inject([SesionesService], (service: SesionesService) => {
    expect(service).toBeTruthy();
  }));
});
