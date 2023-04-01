import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardColisionComponent } from './dashboard-colision.component';

describe('DashboardColisionComponent', () => {
  let component: DashboardColisionComponent;
  let fixture: ComponentFixture<DashboardColisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardColisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardColisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
