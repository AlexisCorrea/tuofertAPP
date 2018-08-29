import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOfertaComponent } from './listar-oferta.component';

describe('ListarOfertaComponent', () => {
  let component: ListarOfertaComponent;
  let fixture: ComponentFixture<ListarOfertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarOfertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
