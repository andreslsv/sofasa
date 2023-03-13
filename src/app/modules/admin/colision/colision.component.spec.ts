import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisionComponent } from './colision.component';

describe('ColisionComponent', () => {
  let component: ColisionComponent;
  let fixture: ComponentFixture<ColisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
