import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSuperAdministradorComponent } from './panel-super-administrador.component';

describe('PanelSuperAdministradorComponent', () => {
  let component: PanelSuperAdministradorComponent;
  let fixture: ComponentFixture<PanelSuperAdministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSuperAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSuperAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
