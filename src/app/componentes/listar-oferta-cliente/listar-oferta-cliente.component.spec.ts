import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOfertaClienteComponent } from './listar-oferta-cliente.component';

describe('ListarOfertaClienteComponent', () => {
  let component: ListarOfertaClienteComponent;
  let fixture: ComponentFixture<ListarOfertaClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarOfertaClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOfertaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
