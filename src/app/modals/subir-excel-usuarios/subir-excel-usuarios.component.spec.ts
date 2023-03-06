import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirExcelUsuariosComponent } from './subir-excel-usuarios.component';

describe('SubirExcelUsuariosComponent', () => {
  let component: SubirExcelUsuariosComponent;
  let fixture: ComponentFixture<SubirExcelUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirExcelUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirExcelUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
