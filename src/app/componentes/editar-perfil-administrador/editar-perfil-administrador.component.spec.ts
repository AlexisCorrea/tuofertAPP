import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPerfilAdministradorComponent } from './editar-perfil-administrador.component';

describe('EditarPerfilAdministradorComponent', () => {
  let component: EditarPerfilAdministradorComponent;
  let fixture: ComponentFixture<EditarPerfilAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPerfilAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPerfilAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
